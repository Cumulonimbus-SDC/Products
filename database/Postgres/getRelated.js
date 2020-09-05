const pool = require('./pool.js');

module.exports.getRelated = (id) => {
  const start = Date.now();
  return pool.connect()
    .then(client => {
      return client.query(`SELECT related_id FROM related WHERE product_id = ${id}`)
      .then(result => {
        client.release();
        // console.log('Inside Related: ', Date.now() - start);
        const related = [];
        for (let entry of result.rows) {
          related.push(entry.related_id);
        }
        return related;
      })
      .catch(err => console.log(err));
    });
}
