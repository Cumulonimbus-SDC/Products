require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  // all valid client config options are also valid here
  // in addition here are the pool specific configuration parameters:
  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  connectionTimeoutMillis: 3000,
  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 3000,
  // maximum number of clients the pool should contain
  // by default this is set to 10.
  max: 10,
});


module.exports = pool;