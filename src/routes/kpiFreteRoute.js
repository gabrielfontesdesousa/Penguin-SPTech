var express = require('express');
var kpiFreteController = require("../controllers/kpiFretesController")
var router = express.Router();

router.post('/fretes', function (req, res){
    kpiFreteController.ExibirKpiFretes(req, res)
});
module.exports = router;
