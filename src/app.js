const express = require('express');
const { conectaNaDatabase } = require('./db/db.js');
const authRoutes = require('./routes/authRoutes');
const criarAdminMaster = require('./scripts/seed.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Bem-vindo ao Sistema de Estoque');
});

const startApp = async () => {
  const sequelize = await conectaNaDatabase();
  await sequelize.sync({ force: true });
  await criarAdminMaster();
};

app.use('/api/auth', authRoutes);

startApp();

module.exports = app;
