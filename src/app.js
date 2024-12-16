require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.js');
const { conectaNaDatabase } = require('./db/db.js');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const criarSeed= require('./scripts/seed.js');

const { Participante, Produto, Estoque, Usuario, MovimentacaoProduto } = require('./models/index.js');

const app = express();
app.use(express.json());
routes(app)
app.use('/', authRoutes);
app.use('/users', userRoutes);

const startApp = async () => {
  const sequelize = await conectaNaDatabase();
  await sequelize.sync({ force: true });
  console.log('Tabelas sincronizadas');

  await criarSeed();
};

startApp();

module.exports = app;
