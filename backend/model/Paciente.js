const { DataTypes } = require('sequelize');
const sequelize = require('../database/bd');

const Paciente = sequelize.define('Paciente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(8), 
    allowNull: false,
    unique: true
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Paciente;
