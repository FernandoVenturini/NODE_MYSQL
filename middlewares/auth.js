// Importando os modulos que serao utilizados:
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

// Converter a funcao em um modulo:
module.exports = {
    eAdmin: async function (req, res, next) {
        // return res.json({  messagem: 'Validar token' });
    
        // Recebendo o token:
        const authHeader = req.headers.authorization;
        const [ bearer, token ] = authHeader.split(' ');
    
        // Fazendo validacao do token:
        if(!token) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro! Necessario realilzar o login para acessar a pagina!"
            });
        };
    
        // Verificar o token:
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
            req.userId = decoded.id;
            return next();
        } catch (err) {
            return res.status (400).json ({
                erro: true,
                mensagem: "Erro! Necessario realilzar o login para acessar a pagina!"
            });
        }
    }
};