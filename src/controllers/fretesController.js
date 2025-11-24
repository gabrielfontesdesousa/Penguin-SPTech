var fretesModel = require('../models/fretesModel');
var freteValidation = require('../validations/freteValidation');
function InserirDadosFrete(req, res) {
  var cliente = req.body.clienteServer;
  var dtSaida = req.body.dtSaidaServer;
  var valor = req.body.valorServer;
  var pesoKG = req.body.pesoKGServer;
  var vlPedagio = req.body.vlPedagioServer;
  var qtdAjudante = req.body.qtdAjudanteServer;
  var fkUsuario = req.body.fkUsuarioServer;
  var fkCaminhao = req.body.fkCaminhaoServer;
  var statusFrete = req.body.statusFreteServer;
  var dtConclusao = req.body.dtConclusaoServer;
  fretesModel
    .InserirDadosFrete(
      cliente,
      dtSaida,
      valor,
      pesoKG,
      vlPedagio,
      qtdAjudante,
      fkCaminhao,
      fkUsuario,
      statusFrete,
      dtConclusao
    )
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}
function ConsultaDadosFretes(req, res) {
  var email = req.body.emailServer;
  fretesModel
    .ExibirDadosFretes(email)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      res.status(200).send(erro);
    });
}

function EditarDadosFretes(req, res) {
  var id = req.params.idFrete;
  var dados = req.body;
  fretesModel
    .EditarDadosFretes(id, dados)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}
module.exports = {
  InserirDadosFrete,
  ConsultaDadosFretes,
  EditarDadosFretes,
};
