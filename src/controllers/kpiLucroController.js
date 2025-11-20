var KpiLucroModel = require('../models/kpiLucroModel')

function ExibirLucroLiquido(req, res){
    var email = req.body.emailSessionServer
    if (!email) {
        return res.status(400).send("Email não enviado no body!");
    }
    KpiLucroModel.ObterLucroLiquido(email)
    .then(function (resultado){
        var totalFrete = resultado[0].TOTAL_FRETES
        var totalDespesas = resultado[0].TOTAL_DESPESAS
        var LucroLiquido =  totalFrete - totalDespesas
        res.status(200).json(LucroLiquido);
    })
    .catch(function (erro) {
        console.log("Erro na consulta:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    ExibirLucroLiquido
}

