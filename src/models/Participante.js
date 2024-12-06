const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Participante = sequelize.define('Participante', {
  id_participante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  anonimo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  contato: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'participantes',
  timestamps: false,
});

module.exports = Participante;
