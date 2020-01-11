const Sequelize = require('sequelize');
const sequelize = new Sequelize('metronome', 'student', 'student', {
  dialect: 'mysql'
});

var Tempo = sequelize.define('tempo', {
  piece: Sequelize.STRING,
  tempo: Sequelize.INTEGER
});

Tempo.sync();

module.exports.Tempo = Tempo;