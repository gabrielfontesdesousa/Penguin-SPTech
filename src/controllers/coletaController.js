var coletaModel = require('../models/coletaModel');
function InserirDadosColeta(req, res) {
var cliente = req.body.clienteServer;
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", cliente)
var distanciaKM = req.body.distanciaKMServer;
  var CEP = req.body.CEPServer;
  var estado = req.body.estadoServer;
  var bairro = req.body.bairroServer;
  var complemento = req.body.complementoServer;
  var numero = req.body.numeroServer;
  var fkFrete = req.body.fkFreteServer;
  var coletaValidation = require('../validations/coletaValidation');
  var erro = coletaValidation.ValidarColeta(req.body);
  if (erro) {
    res.send(`${erro}`).status(500);
  } else {
    coletaModel
      .InserirDadosColeta(CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete)
      .then(function (resposta) {
        console.log(resposta)
        res.status(200).send(resposta);
      })
      .catch(function (erro) {
        res.status(500).send(erro);
      });
  }
}

function ConsultarDadosColeta(req, res) {
  email = req.body.emailServer;
  coletaModel
    .consultarDadosColeta(email)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
}
function atualizarDadosColeta(req, res) {
  var idColeta = req.params.id;
  var dadosAtualizados = req.body;

  coletaModel
    .atualizarDadosColeta(idColeta, dadosAtualizados)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}
function RemoverColeta(req, res){
  var id = req.params.id

  coletaModel.DeletarDadosColeta(id)
  .then(function (resposta){
    res.status(200).send(resposta)
  })
  .catch(function(erro){
    res.status(500).send(erro)
  })
}
module.exports = {
  InserirDadosColeta,
  ConsultarDadosColeta,
  atualizarDadosColeta,
  RemoverColeta
};
