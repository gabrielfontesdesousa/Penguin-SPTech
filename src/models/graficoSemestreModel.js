var database = require('../database/config')

function ObterDadosGrafico(email){
    console.log(
        `ESTOU TENTANDO ENVIAR OS DADOS DO GRAFICO\n \n\t\t >> `
      );
      var instrucao = `
       SELECT *
        FROM VW_DADOS_BRUTOS_FATURAMENTO_SEMESTRE
        WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
      `;
      return database.executar(instrucao)
}
module.exports = {
    ObterDadosGrafico
}
