var express = require("express");
var kpiLucroController = require('../controllers/kpiLucroController')
var router = express.Router();

router.post('/lucro', function(req, res) {
    kpiLucroController.ExibirLucroLiquido(req, res)
});
module.exports = router
