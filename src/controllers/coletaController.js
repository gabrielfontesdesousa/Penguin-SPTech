var coletaModel = require('../models/coletaModel');
function InserirDadosColeta(req, res) {
  var CEP = req.body.CEPServer;
  var numero = req.body.numeroServer;
  var bairro = req.body.bairroServer;
  var estado = req.body.estadoServer;
  var cliente = req.body.clienteServer;
  var complemento = req.body.complementoServer;
  var distanciaKM = req.body.distanciaKMServer;
  var fkFrete = req.body.fkFreteServer;

  var coletaValidation = require('../validations/coletaValidation');
  var erro = coletaValidation.ValidarColeta(req.body);
  if (erro) {
    res.send(`${erro}`).status(500);
  } else {
    coletaModel
      .InserirDadosColeta(CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete)
      .then(function (resposta) {
        res.status(200).send(resposta);
      })
      .catch(function (erro) {
        res.status(500).send(erro);
      });
  }
}
module.exports = {
  InserirDadosColeta,
};
