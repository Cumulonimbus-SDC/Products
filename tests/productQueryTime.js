// require('dotenv').config();
const { getProductById } = require('../database/Postgres/getProductById.js');

const queryTime = (id) => {
  const start = Date.now();

  return getProductById(id)
    .then(product => {
      // console.log(product);
      return Date.now() - start;
    })
    .catch(err => console.log(err));
};

const queryFor1 = queryTime(1)
  .then(query => console.log('Query time for product 1: ', query, 'ms'));

// const queryFor300000 = queryTime(300000)
//   .then(query => console.log('Query time for product 300000: ', query, 'ms'));
