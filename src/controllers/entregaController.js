var entregaModel = require('../models/entregaModel');

function InserirDadosEntrega(req, res) {
  var CEP = req.body.CEPServer;
  var numero = req.body.numeroServer;
  var bairro = req.body.bairroServer;
  var estado = req.body.estadoServer;
  var cliente = req.body.clienteServer;
  var complemento = req.body.complementoServer;
  var destinatario = req.body.destinatarioServer;
  var distanciaKM = req.body.distanciaKMServer;
  var fkFrete = req.body.fkFreteServer;

  entregaModel
    .InserirDadosEntrega(
      CEP,
      numero,
      bairro,
      estado,
      cliente,
      complemento,
      destinatario,
      distanciaKM,
      fkFrete
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

function ConsultaDadosEntregas(req, res) {
  var email = req.body.emailServer;
  entregaModel
    .ExibirDadosEntregas(email)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
}

function EditarDadosEntrega(req, res) {
  var id = req.params.idEntrega;
  var dados = req.body;
  entregaModel
    .EditarDadosEntrega(id, dados)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

function DeletarDadosEntrega(req, res) {
  var id = req.params.idEntrega;

  entregaModel
    .DeletarDadosEntrega(id)
    .then(function (resposta) {
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

module.exports = {
  InserirDadosEntrega,
  ConsultaDadosEntregas,
  EditarDadosEntrega,
  DeletarDadosEntrega
};
