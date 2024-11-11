const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db/db.js');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_usuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_acesso: {
    type: DataTypes.ENUM('admin', 'admin_master'),
    allowNull: false,
  },
}, {
  //senha em texto simples será automaticamente substituída por uma versão criptografada
  hooks: {
    beforeCreate: async (usuario) => {
      console.log('Antes de criar usuário:', usuario.nome_usuario); 
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);
      console.log('Hash da senha gerado:', usuario.senha);
    },
  },
});

module.exports = Usuario;
