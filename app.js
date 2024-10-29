const express = require("express");

const app = express();

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
        nome: "Cesar",
        email:"cesar@celke.com.br"
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});