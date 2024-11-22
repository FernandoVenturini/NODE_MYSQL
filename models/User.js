const { Sequelize } = require('sequelize'); // Importando sequelize
const db = require('./db'); // Conexao com o banco de dados

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
    }
});

// Cria a tabela:
// User.sync();

// Verificar se ha alguma diferenca na tabela realizazda a alteracao:
//User.sync({ alter: true }); 

module.exports = User; // Exportando o modelo de usuario