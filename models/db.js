// Esse arquivo vai fazer a conexao com banco de dados:
// 1 - Importar o modulo sequelize:
const { Sequelize } = require('sequelize');

// Passando parametros separadamente:
const sequelize = new Sequelize('celke', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

// Para ter certeza de que a conexao foi feita com o banco de dados:
/*EXEMPLO 01:
sequelize.authenticate()
.then(function() {
    console.log('Conexao com o banco de dados realizada com sucesso!');
}).catch(function() {
    console.log('Erro ao conectar com o banco de dados!');
});
*/

// EXEMPLO 02:
try{
    sequelize.authenticate();
    console.log('Conexao com o banco de dados realizada com sucesso!');
}catch(error) {
    console.log('Erro ao conectar com o banco de dados:', error);
}

// Exportando essa conexao com o banco de dados:
module.exports = sequelize;