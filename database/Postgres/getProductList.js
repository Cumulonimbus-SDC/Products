const query = require('./pool.js');

module.exports.getProductList = (count = 5, page = 1) => {
  // get page by calculating
  // page 2 => prod 6 - 10
  // start > count * page-1, end <= page * count
  return query(`SELECT * FROM products WHERE product_id > ${count * (page - 1)} AND product_id <= ${count * page}`)
    .then(results => {
      // client.end();
      return results.rows;
    })
    .catch(err => console.log(err));
}