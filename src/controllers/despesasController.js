var despesasModel = require('../models/despesasModel');

function exibirDadosTabela(req, res) {
  email = req.body.emailServer;
  despesasModel
    .obterDadosDespesas(email)
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      res.send(erro).status(500);
    });
}

function exibirDadosMensaisTotais(req, res) {
  email = req.body.emailServer;
  despesasModel
    .obterDadosDespesasTipo(email)
    .then(function (resposta) {
      console.log(resposta);
      res.status(200).send(resposta);
    })
    .catch(function (erro) {
      res.send(erro).status(500);
    });
}
function InserirDadosDespesa(req, res) {
  var descricao = req.body.descricaoServer;
  var valor = req.body.valorServer;
  var categoria = req.body.categoriaServer;
  var dataDesp = req.body.dataDespServer;
  var email = req.body.emailServer;
  var despesaValidation = require('../validations/despesasValidation');
  var erro = despesaValidation.ValidarDespesa(req.body);

  if (erro) {
    res.status(500).send(`${erro}`);
  } else {
    despesasModel
      .InserirDadosDespesa(descricao, valor, categoria, dataDesp, email)
      .then(function (resposta) {
        console.log(resposta);
        res.status(200).send(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).send(erro);
      });
  }
}

function atualizarDadosDespesas(req, res) {
  var idDespesa = req.params.idServer;
  var DespesasAtualizado = req.body;
  var despesaValidation = require('../validations/despesasValidation');
  var erro = despesaValidation.ValidarDespesa(DespesasAtualizado);
  if (erro) {
    res.status(500).send(`${erro}`);
  } else {
    despesasModel
      .atualizarDadosDespesas(idDespesa, DespesasAtualizado)
      .then(function (resposta) {
        res.status(200).send(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).send(erro);
      });
  }
}

function DeletarDadosDespesa(req, res) {
  var id = req.params.idDespesa;

  despesasModel
    .DeletarDadosDespesa(id)
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
  DeletarDadosDespesa,
  atualizarDadosDespesas,
  InserirDadosDespesa,
};
