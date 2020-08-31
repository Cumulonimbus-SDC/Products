const pg = require('knex')({
  client: 'pg',
  connection: {
    host: "localhost",
    user: "postgres",
    password: "docker",
    database: "productsdb"
  }
});

module.exports.pg = pg;