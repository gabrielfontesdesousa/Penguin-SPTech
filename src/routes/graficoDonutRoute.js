var express = require('express');
var router = express();
var graficoDonutController = require('../controllers/graficoDonutController');
router.post('/donut', function (req, res) {
  graficoDonutController.ExibirGraficoDonut(req, res);
});
module.exports = router;
