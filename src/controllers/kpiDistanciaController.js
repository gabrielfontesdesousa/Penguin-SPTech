var kpiDistanciaModel = require('../models/kpiDistanciaModel');

function ExibirDistanciaTotal(req, res) {
  console.log('Estou tentando exibir distancia total');
  var email = req.body.emailServer;
  var ano = req.body.anoServer;
  var mes = req.body.mesServer;

  if (!email) {
    return res.status(400).send('Email não enviado no body!');
  }
    kpiDistanciaModel
    .ObterDistanciaTotal(email, mes, ano)
    .then(function (resposta) {
      res.status(200).json(resposta);
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
}
module.exports = {
  ExibirDistanciaTotal,
};
