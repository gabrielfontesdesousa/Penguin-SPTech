var express = require('express')
var router = express()
var entregaController = require('../controllers/entregaController')

router.post('/cadastrar', function(req, res){
    entregaController.InserirDadosEntrega(req, res)
})
module.exports = router
