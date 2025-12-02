var express = require('express');
var router = express();
var entregaController = require('../controllers/entregaController');

router.post('/cadastrar', function(req, res){
    entregaController.InserirDadosEntrega(req, res);
});

router.post('/consultar', function(req, res){
    entregaController.ConsultaDadosEntregas(req, res);
});

router.put('/editar/:idEntrega', function(req, res){
    entregaController.EditarDadosEntrega(req, res);
});

router.delete('/deletar/:idEntrega', function(req, res){
    entregaController.DeletarDadosEntrega(req, res);
});

module.exports = router;
