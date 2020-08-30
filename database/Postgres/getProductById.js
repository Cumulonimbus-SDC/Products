const client = require('./index.js');

module.exports.getProductById = (id) => {
  let product = {};
  return client.query(`SELECT * FROM products WHERE product_id = ${id}`)
    .then(result => product = result.rows[0])
    .then(prod => client.query(`SELECT * FROM features WHERE product_id = ${id}`))
    .then(feats => {
      const features = [];
      for (let feature of feats.rows) {
        features.push( {feature: feature.feature, value: feature.value } );
      }
      // add features to product object
      product.features = features;
      return product;
    })
    .catch(err => console.log(err));
}

// product_id INTEGER NULL DEFAULT NULL,
//   name VARCHAR NULL DEFAULT NULL,
//   slogan VARCHAR NULL DEFAULT NULL,
//   description VARCHAR NULL DEFAULT NULL,
//   category VARCHAR NULL DEFAULT NULL,
//   default_price INTEGER NULL DEFAULT NULL,