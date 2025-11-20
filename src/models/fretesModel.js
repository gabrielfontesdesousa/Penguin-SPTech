var database = require('../database/config')

function InserirDadosFrete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao){
    var instrucao = `
    INSERT INTO Frete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao)
    VALUES
    ('${cliente}','${dtSaida}',${valor},${pesoKG},${vlPedagio},${qtdAjudante},${fkCaminhao},${fkUsuario},'${statusFrete}','${dtConclusao}');

    `
    return database.executar(instrucao)
}

function ExibirDadosFretes(email){
     console.log(
        `ESTOU TENTANDO CONSULTAR DADOS FRETES\n \n\t\t >> `
      );
    var instrucao = `
     SELECT *
      FROM VW_FRETES
      WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    
    `
    return database.executar(instrucao)
}
module.exports = {
    InserirDadosFrete,
    ExibirDadosFretes
}
