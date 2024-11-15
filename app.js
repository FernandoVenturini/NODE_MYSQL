const express = require('express');
//const db = require('./models/db'); 
const Usuario = require('./models/Usuario');
const app = express();

app.use(express.json());

app.get("/usuarios", (req, res) => {
    return res.json({
        erro: false,
        nome: "Cesar",
        email:"cesar@celke.com.br"
    });
});

app.get("/usuario/:id", (req, res) => {
    const {id} = req.params;
    return res.json({
        erro: false,
        id,
        nome: "Fernando",
        email:"fernando@celke.com.br"
    });
});

app.post("/user", async (req, res) => {
    const { name, email } = req.body;

    await Usuario.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao cadastrar usuario!"
        });
    })

    return res.json({
        erro: false
    });
});

app.put("/usuario", (req, res) => {
    const { id, nome, email } = req.body;
    return res.json({
        erro: false,
        id,
        nome,
        email
    });
});

app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
    return res.json({
        erro: false,
        id,
        mensagem: "Usuario deletado com sucesso"
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});