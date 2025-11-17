var database = require('../database/config')

function ObterKpiManutencao(email){
    console.log(
        `ESTOU TENTANDO ENVIAR MANUTENCAO TOTAL REALIZADOS\n \n\t\t >>
        `
      );
    var instrucao = `
    SELECT *
	FROM VW_QUILOMETRAGEM_ATE_MANUTENCAO
	WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `;
    return database.executar(instrucao)
}
module.exports = {
    ObterKpiManutencao
}
