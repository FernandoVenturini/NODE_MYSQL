// Importando o express:
const express = require("express"); // Isso e uma funcao

// Incluindo Usuario.js aqui no app.js
const User = require("./models/User");

// Importando a conexao com o banco de dados:
//const db = require('./models/db');

// Incluindo criptografia:
const bcrypt = require("bcryptjs");

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
app.get("/user/:id", async (req, res) => {
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
app.post("/user", async (req, res) => {
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
app.put("/user", async (req,res) => {
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
app.put("/user-senha", async (req,res) => {
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
app.delete("/user/:id", async (req, res) => {
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
})

// Iniciando o servidor: em qual porta vai rodar o projeto
app.listen(8081, () =>  {
    console.log("Servidor iniciado na porta 8081");
});