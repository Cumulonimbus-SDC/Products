const query = require('./pool.js');

module.exports.getStyles = (id) => {
  return query(`SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id = ${id}`)
    .then(result => {
      // return result.rows;
      return Promise.all(result.rows.map((style) => {
        const newStyle = style;
        const queryStringSkus = `SELECT size, quantity FROM skus WHERE skus.style_id = ${style.style_id}`;
        const skus = query(queryStringSkus)
          .then(skus => {
            const newSkus = {};
            for (let sku of skus.rows) {
              newSkus[sku.size] = sku.quantity;
            }
            return newSkus;
          })
          .catch(err => console.log(err));

        const queryStringPhotos = `SELECT url, thumbnail_url FROM photos WHERE style_id = ${style.style_id}`;
        const photos = query(queryStringPhotos)
          .then(photos => {
            const newPhotos = [];
            // console.log(photos.rows);
            for (let stylePhotos of photos.rows) {
              newPhotos.push({
                url: stylePhotos.url,
                thumbnail_url: stylePhotos.thumbnail_url
              });
            }
            // console.log(newPhotos);
            return photos.rows;
          })
          .catch(err => console.log(err));

        return Promise.all([skus, photos])
          .then(result => {
            newStyle.skus = result[0];
            newStyle.photos = result[1];
            return newStyle;
          })
          .catch(err => console.log(err));
      }));
    })
    .then(result => ({product_id: id, results: result}))
    .catch(err => console.log(err));
}