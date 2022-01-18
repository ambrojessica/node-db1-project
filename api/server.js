const express = require("express");

const AccRouter = require('./accounts/accounts-router');

const server = express();


server.use(express.json());

server.use('/api/accounts', AccRouter);

server.get('/', (req, res) => {
  res.json({
    message: 'api is working'
  });
});

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
