const express = require('express');
const bodyParser = require('body-parser');
const { serverPort } = require('../config.env');
const router = require('./routes');
const client = require('../database/Postgres/index');

// call express
const server = express();

// deps to use on server
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Dockerized server, it now updates!!');
})

// include routes
server.use('/api', router)

server.listen(serverPort, () => console.log('listening on Port >>> ', serverPort));
