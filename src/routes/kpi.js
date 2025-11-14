var express = require("express");
var kpiController = require("../controllers/kpiController")
var router = express.Router();

router.post('/fretes', (req, res) => {
    kpiController.ExibirKpiFretes(req, res)
});

module.exports = router;
