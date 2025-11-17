var express = require('express')
var router = express()
var fretesController = require('../controllers/fretesController')
router.post('/cadastro', function(req, res){
    fretesController.InserirDadosFrete(req, res)
})
module.exports = router;
