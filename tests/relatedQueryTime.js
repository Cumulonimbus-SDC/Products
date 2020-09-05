// require('dotenv').config();
const { getRelated } = require('../database/Postgres/getRelated.js');

const queryTime = (id) => {
  const start = Date.now();

  return getRelated(id)
    .then(products => {
      console.log(products);
      return Date.now() - start;
    })
    .catch(err => console.log(err));
};

// const queryFor1 = queryTime(1)
//   .then(query => console.log('Related products for 1: ', query, 'ms'));

const queryFor300000 = queryTime(1000000)
  .then(query => console.log('Query time for product 300000: ', query, 'ms'));
