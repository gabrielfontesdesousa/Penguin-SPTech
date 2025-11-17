var database = require('../database/config')

function InserirDadosFrete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao){
    var instrucao = `
    INSERT INTO Frete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao)
    VALUES
    ('${cliente}','${dtSaida}',${valor},${pesoKG},${vlPedagio},${qtdAjudante},${fkCaminhao},${fkUsuario},'${statusFrete}','${dtConclusao}');

    `
    return database.executar(instrucao)
}
module.exports = {
    InserirDadosFrete
}
