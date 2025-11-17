var database = require('../database/config');
function ObterDadosGraficoDonut(email) {
  console.log(`ESTOU TENTANDO ENVIAR OS DADOS DO GRAFICO DE DONUT\n \n\t\t >> `);
  var instrucao = `
  SELECT *
	FROM VW_GRAFICO_DONUT
	WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');

`;
  return database.executar(instrucao);
}
module.exports = {
  ObterDadosGraficoDonut,
};
