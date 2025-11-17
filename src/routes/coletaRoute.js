var express = require('express')
var router = express();
var coletaController = require('../controllers/coletaController');

router.post('/cadastrar', function (req, res) {
    coletaController.InserirDadosColeta(req, res)
})
module.exports = router;
