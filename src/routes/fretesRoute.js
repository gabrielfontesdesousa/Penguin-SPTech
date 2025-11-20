var express = require('express')
var router = express()
var fretesController = require('../controllers/fretesController')
router.post('/cadastro', function(req, res){
    fretesController.InserirDadosFrete(req, res)
})
router.post('/consultar', function (req, res){
    fretesController.ConsultaDadosFretes(req, res)
})

module.exports = router;
