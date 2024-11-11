const express = require('express');
const { conectaNaDatabase } = require('./db/db.js');
const userRoutes = require('./routes/userRoutes.js');
const seedAdminMaster = require('./scripts/createMasterAdmin.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Bem-vindo à Certificadora - Back-end');
});

app.use('/api', userRoutes);

const startApp = async () => {
    await conectaNaDatabase();
    await seedAdminMaster();
};

startApp();

module.exports = app;