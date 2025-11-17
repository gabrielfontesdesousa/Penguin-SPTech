var express = require('express');
var router = express();
var kpiManutencaoController = require('../controllers/kpiManutencaoController');

router.post('/manutencao', function (req, res) {
    kpiManutencaoController.ExibirKpiManutencao(req, res);
});
module.exports = router
