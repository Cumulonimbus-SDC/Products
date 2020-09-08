const pool = require('../database/Postgres/pool.js');
// require('dotenv').config();

const start = Date.now();
// const product = pool.connect()
//   .then(client => {
//     return client.query('SELECT product_id, name, slogan, description, category, default_price FROM products WHERE product_id = 1000000')
//       .then(prod => {
//         client.release();
//         console.log('Query took', Date.now() - start, 'ms for product');
//         return prod;
//       })
//       .catch(err => {
//         client.release();
//         console.log(err)});
//   })
//   .catch(err => console.log(err));

const product = pool.query('SELECT product_id FROM products WHERE product_id = 1')
  .then(prod => {
    console.log('Query took', Date.now() - start, 'ms for product');
    console.log(prod.rows);
    return prod;
  })
  .catch(err => console.log(err));


// const {Client} = require('pg');
// const client = new Client();

// client.connect();
// client.query('SELECT product_id, name, slogan, description, category, default_price FROM products WHERE product_id = 1000000')
//   .then(result => {
//     console.log('Query took', Date.now() - start, 'ms for product');
//     // console.log(result.rows);
//   })
//   .catch(err => console.log(err))
//   .then(() => client.end());