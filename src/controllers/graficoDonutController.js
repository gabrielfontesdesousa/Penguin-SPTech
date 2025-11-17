var graficoDonutModel = require('../models/graficoDonutModel');

function ExibirGraficoDonut(req, res) {
    var email = req.body.emailServer
    console.log(email)
    graficoDonutModel.ObterDadosGraficoDonut(email)
    .then(function (resposta){
        res.status(200).send(resposta)
    }).catch(function (erro){
        res.status(500).send(erro)
    })
}
module.exports = {
  ExibirGraficoDonut
};
