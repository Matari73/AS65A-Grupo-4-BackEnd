const express = require('express');
const conectaNaDatabase = require('./db/db.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Bem-vindo à Certificadora - Back-end');
});

const startApp = async () => {
    await conectaNaDatabase();
};

startApp();

module.exports = app;