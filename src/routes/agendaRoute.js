var express = require('express')
var router = express()
var agendaController = require('../controllers/agendaController')
router.post('/agenda', function(req, res){
    agendaController.ExibirDadosAgenda(req, res)
})
module.exports = router
