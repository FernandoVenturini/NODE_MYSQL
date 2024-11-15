const Sequelize = require('sequelize'); // Importando a Biblioteca Sequelize;
const db = require('./db'); // Conectando Node.js com banco de dados MySQL

const Usuario = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Usuario.sync();

module.exports = Usuario;