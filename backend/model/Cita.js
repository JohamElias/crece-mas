const { DataTypes } = require('sequelize');
const sequelize = require('../database/bd');
const Paciente = require('./Paciente');

const Cita = sequelize.define('Cita', {
  fechaCita: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horaCita: {
    type: DataTypes.TIME,
    allowNull: false
  },
  sintomas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

// Definir relación entre Cita y Paciente
Cita.belongsTo(Paciente);

module.exports = Cita;
