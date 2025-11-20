var database = require('../database/config')

function ObterLucroLiquido(email){
    console.log("ESTOU TENTANDO ENVIAR O LUCRO LIQUIDO \n \n\t\t >>")
    var instrucao = `
       SELECT *
        FROM VW_LUCRO_LIQUIDO
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
module.exports = {
    ObterLucroLiquido
}
