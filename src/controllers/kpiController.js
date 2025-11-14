var kpiModel = require('../models/kpiModel');

function ExibirKpiFretes(req, res) {
    const email = req.body.email;
    console.log(email)
    if (!email) {
        return res.status(400).send("Email não enviado no body!");
    }

    console.log("Email recebido:", email);

    kpiModel.ObterFretesRealizados(email)
        .then(function (resultado) {
            console.log(`Fretes encontrados: ${resultado.length}`);
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    ExibirKpiFretes
};
