var express = require("express")
var router = express()
var despesasController = require('../controllers/despesasController')
router.post('/tabela', function(req, res){
    despesasController.exibirDadosTabela(req, res)
})
router.post('/tipo', function(req, res){
    despesasController.exibirDadosMensaisTotais(req, res)
})
router.post('/cadastrar', function(req, res){
    despesasController.InserirDadosDespesa(req, res);
});
router.put('/atualizar/:idServer', function(req, res){
     despesasController.atualizarDadosDespesas(req, res)
})

router.delete('/deletar/:idDespesa', function(req, res){
    despesasController.DeletarDadosDespesa(req, res);
});
module.exports = router
