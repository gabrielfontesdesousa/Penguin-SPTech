var express = require("express")
var router = express.Router();
var kpiController = require('../controllers/kpiController')

router.get('/kpi/fretes', function (req, res) {
    kpiController.ExibirKpiFretes()
})

module.exports = {
    router
}
