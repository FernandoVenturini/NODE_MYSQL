// Importando o express:
const express = require("express"); // Isso e uma funcao

// Importando a conexao com o banco de dados:
//const db = require('./models/db');

// Incluindo criptografia:
const bcrypt = require("bcryptjs");

// Incluindo biblioteca que gera e valida o token - JWT
const jwt = require('jsonwebtoken');

// Incluindo promisify:
const { promisify } = require('util');                    

// Incluindo Usuario.js aqui no app.js
const User = require("./models/User");

// Executando a funcao acima require(express):
const app = express();

// Informando que aceita os dados em JSON
app.use(express.json());

// Cria uma rota:
app.get("/users", async (req, res) => {
    //res.send("Hello, world!");

    await User.findAll({
        attributes: ['id', 'name', 'email', 'password'], // Retorna so esses atributos
        order: [['id', 'DESC']]}) // Mostra na ordem que voce quer (crescente ou decrescente)
    .then((users) => { // Verifica que ja existi o users
        return res.json({
            erro: false,
            users
        });
    }).catch(() => { // Se nao tiver o users, lanca esse erro
        return res.json({
            erro: true,
            mensagem: "Erro! Usuario nao encontrado!"
        });
    });
});

// Cria uma rota GET:
app.get("/user/:id", validarToken, validarToken, async (req, res) => {
    const { id } = req.params;
    // res.send("Olá, mundo!");

    //await User.findAll({ where: { id: id } })
    await User.findByPk(id)
    .then((user) => {
        return res.json({
            erro: false,
            user
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Usuario não encontrado!"
        });
    });
});

// Criando rota POST:
app.post("/user", validarToken, async (req, res) => {
    var dados = req.body;
    dados.password  = await bcrypt.hash(dados.password, 8);
    
    await User.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        });
        // res.status(200).json({ message: "Usuario cadastrado com sucesso!"})
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao cadastrar usuario!"
        });
        //res.status(400).json({ message: "Erro! Usuario nao cadastrado com sucesso!"})
    });
});

// Criando rota PUT:
app.put("/user", validarToken, async (req,res) => {
    const { id } = req.body;

    await User.update(req.body, { where: {id: id} })
    .then(() => {   
        return res.status(200).json({
            erro: false,
            mensagem: "Usuario editado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao editar usuario!"
        });
    });
});

// Criando a rota PUT com CRIPTOGRAFIA:
app.put("/user-senha", validarToken, async (req,res) => {
    const { id, password } = req.body;

    var senhaCrypt = await bcrypt.hash(password, 8);

    await User.update({ password: senhaCrypt }, { where: {id: id} })
    .then(() => {   
        return res.status(200).json({
            erro: false,
            mensagem: "Senha editada com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Senha nao editada com sucesso!"
        });
    });
});

// Criando rota DELETE:
app.delete("/user/:id", validarToken,async (req, res) => {
    const { id } = req.params;

    await User.destroy({ where: { id } })
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario deletado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao deletar usuario!"
        })
    })
    return res.json({
        erro: false,
        id
    });
});

// Validando o usuario e a senha com Node.js
app.post('/login', async (req, res) => {
    const user = await User.findOne({ 
        attributes: ['id', 'name', 'email', 'password'],
        where: {email: req.body.email} });

    if(user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Usuario nao encontrado!"
        });
    };

    if(!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Senha invalida!"
        });
    };

    // Implementando o token que gera e faz a validacao:
    //const token = jwt.sign({ id: user.id }, 'minha-chave-secreta');
    const token = jwt.sign({id: user.id}, '583a3549456251362c5a21314245576f', {
        expiresIn: '600', // 10 min
        expiresIn: '7d' // 7 dias
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

// Validando o token:
async function validarToken(req, res, next) {
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
    try{
        const decoded = await promisify(jwt.verify)(token, '583a3549456251362c5a21314245576f');
        req.userId = decoded.id;
        return next();
    }catch(err) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro! Necessario realilzar o login para acessar a pagina!"
        });
    };

    return res.json({  messagem: token});
    //return next();
};

// Iniciando o servidor: em qual porta vai rodar o projeto
app.listen(8081, () =>  {
    console.log("Servidor iniciado na porta 8081");
});