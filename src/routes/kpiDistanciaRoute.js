var express = require('express');
var kpiDistanciaController = require('../controllers/kpiDistanciaController');
var router = express.Router();

router.post('/distancia', function (req, res){
    kpiDistanciaController.ExibirDistanciaTotal(req, res)
});
module.exports = router;
