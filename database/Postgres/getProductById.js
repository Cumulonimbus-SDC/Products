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

// module.exports.getProductById = (id) => {
//   return pool.connect().then((client) => {
//     // const start = Date.now();
//     return client
//       .query(
//         `SELECT * FROM products INNER JOIN features ON products.product_id = features.product_id WHERE products.product_id = $1`,
//         [id]
//       )
//       .then(({ rows }) => {
//         client.release();
//         if (!rows.length) throw new Error('no rows');

//         // console.log(id, ' THis is in parallel for product', Date.now() - start, 'ms');
//         const { feature_id, feature, value, ...prod } = rows[0];

//         const features = [];
//         for (let row of rows) {
//           const { feature, value } = row;
//           features.push({ feature, value });
//         }

//         return { ...prod, features };
//       })
//       .catch((err) => {
//         client.release();
//         throw new Error('Error get data from server');
//       });
//   });
// };

// module.exports.getProductById = (id) => {
//   let resultProduct = {};
//   const product = pool.connect()
//     .then(client => {
//       // const start = Date.now();
//       return client.query(`SELECT * FROM products WHERE product_id = $1`, [id])
//         .then(result => {
//           client.release();
//           // console.log(id, ' THis is in parallel for product', Date.now() - start, 'ms');
//           resultProduct = result.rows[0];
//         })
//         .catch(err => {
//           console.log(err);
//           client.release();
//         });
//     });

//   const features = pool.connect()
//     .then(client => {
//       // const start = Date.now();
//       return client.query(`SELECT feature, value FROM features WHERE product_id = $1`, [id])
//         .then(feats => {
//           // const features = [];
//           // for (let feature of feats.rows) {
//           //   features.push( {feature: feature.feature, value: feature.value } );
//           // }
//           // add features to product object
//           client.release();
//           resultProduct.features = feats.rows;

//           // console.log(id, ' this is in features parallel ', Date.now() - start);
//         })
//         .catch(err => {
//           console.log(err);
//           client.release();
//         });
//     });

//   return Promise.all([product, features])
//     .then(() => resultProduct)
//     .catch(err => console.log(err));
// };

// product_id INTEGER NULL DEFAULT NULL,
//   name VARCHAR NULL DEFAULT NULL,
//   slogan VARCHAR NULL DEFAULT NULL,
//   description VARCHAR NULL DEFAULT NULL,
//   category VARCHAR NULL DEFAULT NULL,
//   default_price INTEGER NULL DEFAULT NULL,
