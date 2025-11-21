var despesasModel = require('../models/despesasModel')

function exibirDadosTabela(req, res){
    email = req.body.emailServer
    despesasModel.obterDadosDespesas(email)
    .then(function (resposta){
            res.status(200).send(resposta)
    }).catch(function (erro) {
        res.send(erro).status(500)
    })
}

function exibirDadosMensaisTotais(req, res) {
    email = req.body.emailServer
    despesasModel.obterDadosDespesasTipo(email)
    .then(function (resposta){
            res.status(200).send(resposta)
    }).catch(function (erro) {
        res.send(erro).status(500)
    })
}
// function atualizarDadosMensaisTotais(req, res){
//     var idDespesa = Number(req.params.id)
//     var DespesasAtualizado = req.body
//     despesasModel.
// }
module.exports = {
    exibirDadosTabela,
    exibirDadosMensaisTotais
}
