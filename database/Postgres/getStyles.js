const query = require('./pool.js');

module.exports.getStyles = (id) => {
  const styles = {};
  return query(`SELECT style_id, name, original_price, sale_price, default_style FROM styles WHERE product_id = ${id}`)
    .then(result => {
      // return result.rows;
      return Promise.all(result.rows.map((style) => {
        const newStyle = style;
        return query(`SELECT size, quantity FROM skus WHERE style_id = ${style.style_id}`)
          .then(result => {
            newStyle.skus = result.rows;
            return newStyle;
          })
          .catch(err => console.log(err));
      }));
    })
    .then(result => result)
    .catch(err => console.log(err));
}