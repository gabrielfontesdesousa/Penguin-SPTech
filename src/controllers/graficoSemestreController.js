var graficoSemestreModel = require('../models/graficoSemestreModel')

function ExibirGraficoSemestre(req, res){
    var email = req.body.emailServer;
    console.log(email)
    graficoSemestreModel.ObterDadosGrafico(email)
    .then(function (resposta){
        res.status(200).send(resposta)
    }).catch(function (erro){
        res.status(500).send(erro)
        console.log(erro)
    })
}
module.exports = {
    ExibirGraficoSemestre
}
