var kpiFretesModel = require('../models/kpiFreteModel');

function ExibirKpiFretes(req, res) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).send("Email não enviado no body!");
    }
    kpiFretesModel.ObterFretesRealizados(email)
        .then(function (resultado) {
            res.status(200)
            .json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    ExibirKpiFretes
};
