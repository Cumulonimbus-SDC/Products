const pool = require('./pool.js');

module.exports.getStyles = (id) => {
  return pool.connect().then((client) => {
    return client
      .query(
        `SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id = ${id}`
      )
      .then((result) => {
        client.release();
        // return an array of queries for all the skus and photos for each row
        return Promise.all(
          result.rows.map((style) => {
            const newStyle = style;
            const queryStringSkus = `SELECT size, quantity FROM skus WHERE skus.style_id = ${style.style_id}`;
            // query skus for current row
            const skus = pool.connect().then((client) => {
              return client
                .query(queryStringSkus)
                .then((skus) => {
                  const newSkus = {};
                  for (let sku of skus.rows) {
                    newSkus[sku.size] = sku.quantity;
                  }

                  client.release();
                  return newSkus;
                })
                .catch((err) => {
                  console.log(err);
                  client.release();
                  throw new Error(
                    `Error retrieving skus for product ${id} and style ${style.style_id}`
                  );
                });
            });

            // query photos for current row
            const queryStringPhotos = `SELECT url, thumbnail_url FROM photos WHERE style_id = ${style.style_id}`;
            const photos = pool.connect().then((client) => {
              return client
                .query(queryStringPhotos)
                .then((photos) => {
                  client.release();
                  return photos.rows;
                })
                .catch((err) => {
                  console.log(err);
                  client.release();
                  throw new Error(
                    `Error retrieving photos for product ${id} and style ${style.style_id}`
                  );
                });
            });

            // resolve queries for current skus and photos
            return Promise.all([skus, photos])
              .then((result) => {
                newStyle.skus = result[0];
                newStyle.photos = result[1];
                return newStyle;
              })
              .catch((err) => {
                console.log(err);
                throw new Error(err.message);
              });
          })
        );
      })
      .then((result) => ({ product_id: id, results: result }))
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  });
};
