// Importando o express:
const express = require("express"); // Isso e uma funcao

// Importando a conexao com o banco de dados:
const db = require('./models/db');

// Executando a funcao acima require(express):
const app = express();

// Informando que aceita os dados em JSON
app.use(express.json());

// Cria uma rota:
app.get("/usuarios",(req, res) => {
    //res.send("Hello, world!");
    return res.json({
        erro: false,
        nome: "Cesar",
        email: "cesar@celke.com"
    });
});

// Cria uma rota GET:
app.get("/usuario/:id", (req, res) => {
    const { id } = req.params;
    // res.send("Olá, mundo!");
    return res.json({
        erro: false,
        id,
        nome: "Fernando",
        email: "fernando@lvfcode.com"
    });
});

// Criando rota POST:
app.post("/usuario", (req, res) => {
    const { nome, email } = req.body;
    return res.json({
        erro: false,
        nome,
        email
    });
});

// Criando rota PUT:
app.put("/usuario", (req,res) => {
    const { id, nome, email } = req.body;
    return res.json({
        erro: false,
        id, 
        nome,
        email
    });
});

// Criando rota DELETE:
app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
    return res.json({
        erro: false,
        id
    });
})

// Iniciando o servidor: em qual porta vai rodar o projeto
app.listen(8081, () =>  {
    console.log("Servidor iniciado na porta 8081");
});