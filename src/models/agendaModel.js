var database = require('../database/config')

function ObterDadosAgenda(email){
    console.log(`ESTOU TENTANDO ENVIAR OS DADOS DA AGENDA\n \n\t\t >> `);
    var instrucao = `
        SELECT *
        FROM VW_AGENDA
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
module.exports = {
    ObterDadosAgenda
}
