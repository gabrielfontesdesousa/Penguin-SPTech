var entregaModel = require('../models/entregaModel')
function InserirDadosEntrega(req, res){
    var CEP = req.body.CEPServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var estado = req.body.estadoServer;
    var cliente = req.body.clienteServer;
    var complemento = req.body.complementoServer;
    var destinatario = req.body.destinatarioServer;
    var distanciaKM = req.body.distanciaKMServer;
    var fkFrete = req.body.fkFreteServer;
    entregaModel.InserirDadosEntrega(CEP, numero, bairro, estado, cliente, complemento, destinatario, distanciaKM, fkFrete)
    .then(function (resposta){
        res.send(resposta).status(200)
    }).catch(function (erro){
        res.send(erro).status(500)
    })
}
module.exports = {
    InserirDadosEntrega
}

