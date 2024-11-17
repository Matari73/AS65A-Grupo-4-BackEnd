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
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'participantes',
  timestamps: false,
});

module.exports = Participante;
