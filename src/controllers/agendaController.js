var agendaModel = require('../models/agendaModel')

function ExibirDadosAgenda(req, res){
    var email = req.body.emailServer
    agendaModel.ObterDadosAgenda(email)
    .then(function (resposta){
        res.send(resposta).status(200)
    }).catch(function (erro){
        res.status(500).send(erro)
    })
}

module.exports = {
    ExibirDadosAgenda
}
