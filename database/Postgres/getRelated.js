const query = require('./pool.js');

module.exports.getRelated = (id) => {
  return query(`SELECT related_id FROM related WHERE product_id = ${id}`)
    .then(result => {
      const related = [];
      for (let entry of result.rows) {
        related.push(entry.related_id);
      }
      return related;
    })
    .catch(err => console.log(err));
}
