const Sequelize = require('sequelize'); // Importando a Biblioteca Sequelize;

// Passing parameters separately (other dialects):
const sequelize = new Sequelize('celke', 'root', 'LAVINIA12', {
    host: 'localhost',
    dialect: 'mysql'
});

// Testando a conexao com o banco de dados:
sequelize.authenticate() // Se nao conseguir executar com sucesso
.then(function(){
    console.log('Error!!! Nao conectado com o banco de dados.');
}).catch(function(){ // Se conseguir executar com sucesso
    console.log('Conectado com sucesso.');
});

module.exports = sequelize;