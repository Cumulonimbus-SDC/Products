const pool = require('./pool.js');

module.exports.getProductById = (id) => {
  // const start = Date.now();
  return pool
    .query(
      `SELECT * FROM products INNER JOIN features ON products.product_id = features.product_id WHERE products.product_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (!rows.length) throw new Error('no rows');
      //
      // console.log(id, ' THis is in parallel for product', Date.now() - start, 'ms');
      const { feature_id, feature, value, ...prod } = rows[0];

      const features = [];
      for (let row of rows) {
        const { feature, value } = row;
        features.push({ feature, value });
      }

      // console.log('query time', Date.now() - start);
      return { ...prod, features };
    })
    .catch((err) => {
      throw new Error('Error get data from server');
    });
};
