// src/app.js
require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const { conectaNaDatabase } = require('./db/db.js');
const authRoutes = require('./routes/authRoutes');
const criarAdminMaster = require('./scripts/seed.js');

const { Beneficiario, Endereco, Doacao, Produto, Estoque, Usuario } = require('./models/index.js');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Certificadora');
});

const startApp = async () => {
  const sequelize = await conectaNaDatabase();
  await sequelize.sync({ force: true });
  console.log('Tabelas sincronizadas');
  
  await criarAdminMaster();
};

startApp();

module.exports = app;
