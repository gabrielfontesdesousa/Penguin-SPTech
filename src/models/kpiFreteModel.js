var database = require('../database/config');

function ObterFretesRealizados(emailUserSessao) {
  console.log(
    "ESTOU TENTANDO ENVIAR OS FRETES REALIZADOS\n \n\t\t >> "
  );
  var instrucaoSql = `
            SELECT TOTAL_FRETES_REALIZADOS
            FROM VW_KPI_TOTAL_FRETES_REALIZADOS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${emailUserSessao}');
         `;
  return database.executar(instrucaoSql);
}
module.exports = {
  ObterFretesRealizados,
};
