const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');
const Beneficiario = require('./Beneficiario.js');

const Distribuicao = sequelize.define('Distribuicao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: 'produtos',
      key: 'id',
    },
    allowNull: false,
  },
  beneficiario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Beneficiario,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'distribuicoes',
  timestamps: false,
});

module.exports = Distribuicao;