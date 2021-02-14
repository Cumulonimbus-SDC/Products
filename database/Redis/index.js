const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: 'cache',
});

client.on('error', (e) => console.log(e));

client.on('ready', () => console.log('Redis Client Connected...'));

// promisify client's get and set
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = { getAsync, setAsync };
