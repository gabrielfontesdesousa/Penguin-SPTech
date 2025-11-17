var express = require("express")
var router = express()
var graficoSemestreController = require('../controllers/graficoSemestreController')

router.post('/semestre', function (req, res){
    graficoSemestreController.ExibirGraficoSemestre(req, res)
});

module.exports = router
