var database = require('../database/config')

function obterDadosDespesas(email){
    var instrucao = `
            SELECT *
            FROM VW_DESPESAS_MENSAIS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
function obterDadosDespesasTipo(email){
    var instrucao = `
           SELECT *
            FROM VW_RESUMO_DESPESAS_MENSAIS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
module.exports = {
    obterDadosDespesas,
    obterDadosDespesasTipo
}
