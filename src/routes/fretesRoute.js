var express = require('express')
var router = express()
var fretesController = require('../controllers/fretesController')
router.post('/cadastrar', function(req, res){
    fretesController.InserirDadosFrete(req, res);
});
router.post('/consultar', function (req, res){
    fretesController.ConsultaDadosFretes(req, res)
})
router.put('/editar/:idFrete', function (req, res){
    fretesController.EditarDadosFretes(req, res)
})
router.delete('/deletar/:idFrete', function (req, res){
    fretesController.DeletarDadosFrete(req, res);
});
module.exports = router;
