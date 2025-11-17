var fretesModel = require('../models/fretesModel')
var freteValidation = require('../validations/freteValidation')
function InserirDadosFrete(req, res){
    var cliente = req.body.clienteServer;
    var dtSaida = req.body.dtSaidaServer;
    var valor = req.body.valorServer;
    var pesoKG = req.body.pesoKGServer;
    var vlPedagio= req.body.vlPedagioServer;
    var qtdAjudante= req.body.qtdAjudanteServer;
    var fkCaminhao= req.body.fkCaminhaoServer;
    var fkUsuario= req.body.fkUsuarioServer;
    var statusFrete = req.body.statusFreteServer;
    var dtConclusao= req.body.dtConclusaoServer;
    var erro = freteValidation(req.body)
    if (erro) {
        return res.status(400).send(erro);
    }
    fretesModel.InserirDadosFrete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao)
    .then(function (resposta){
        res.status(200).send(resposta)
    }).catch(function (erro){
        res.send(erro).status(500)
    })
}
module.exports = {
    InserirDadosFrete
}
