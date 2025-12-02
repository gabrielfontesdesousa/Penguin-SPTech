var express = require('express');
var router = express();
var coletaController = require('../controllers/coletaController');

router.post('/cadastrar', function (req, res) {
    coletaController.InserirDadosColeta(req, res)
})
router.post('/consultar', function (req, res) {
    coletaController.ConsultarDadosColeta(req, res)
})
router.put('/atualizar/:id', function (req, res) {
    coletaController.atualizarDadosColeta(req, res);
  });
  router.delete('deletar/:id', function (req, res){
    coletaController.
  })
module.exports = router;
