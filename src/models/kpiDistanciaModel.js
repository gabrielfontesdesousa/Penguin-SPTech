var database = require('../database/config')

function ObterDistanciaTotal(email, mes, ano){
    console.log(
        `ESTOU TENTANDO ENVIAR A DISTANCIA TOTAL REALIZADOS\n \n\t\t >> `
      );
    var instrucao = `
    SELECT *
        FROM VW_KPI_KM_TOTAL
        WHERE FK_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
module.exports = {
    ObterDistanciaTotal
}
