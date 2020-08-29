const { Client } = require('pg');
const client = new Client();

setTimeout(() => {
  client.connect()
    .then(() => { console.log('pg connected to postgres...') })
    .catch(err => console.log('error connecting to postgres...', err.stack) );
}, 20000);

module.exports = client;