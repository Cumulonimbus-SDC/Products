const { Pool } = require('pg');

const pool = new Pool();

// setTimeout(() => {
//   pool.connect()
//     .then(() => console.log('Connect with pool...'))
//     .catch(err => console.log(err.stack));
// }, 10000);

module.exports = (string) => pool.query(string);