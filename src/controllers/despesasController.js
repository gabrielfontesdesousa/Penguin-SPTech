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
 function atualizarDadosDespesas(req, res){
     var idDespesa = req.params.idServer
     var DespesasAtualizado = req.body
     despesasModel.atualizarDadosDespesas(idDespesa, DespesasAtualizado)
     .then(function (resposta) {
        res.status(200).send(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).send(erro);
      });
 }
module.exports = {
    exibirDadosTabela,
    exibirDadosMensaisTotais,
    atualizarDadosDespesas
}
