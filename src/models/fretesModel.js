var database = require('../database/config');

function InserirDadosFrete(
  cliente,
  dtSaida,
  valor,
  pesoKG,
  vlPedagio,
  qtdAjudante,
  fkCaminhao,
  fkUsuario,
  statusFrete,
  dtConclusao
) {
  var instrucao = `
    INSERT INTO Frete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete, dtConclusao)
    VALUES
    ('${cliente}','${dtSaida}',${valor},${pesoKG},${vlPedagio},${qtdAjudante},${fkCaminhao},${fkUsuario},'${statusFrete}','${dtConclusao}');

    `;
  return database.executar(instrucao);
}

function ExibirDadosFretes(email) {
  console.log(`ESTOU TENTANDO CONSULTAR DADOS FRETES\n \n\t\t >> `);
  var instrucao = `
     SELECT *
      FROM VW_FRETES
      WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');

    `;
  return database.executar(instrucao);
}
function EditarDadosFretes(id, dados) {
  console.log(`ESTOU TENTANDO EDITAR DADOS FRETES\n \n\t\t >> `);
  var instrucao = `
        UPDATE Frete
        SET cliente = '${dados.clienteServer}',
            dtSaida  = '${dados.dtSaidaServer}',
            valor = ${dados.valorServer},
            pesoKG = ${dados.pesoKGServer},
            vlPedagio = ${dados.vlPedagioServer},
            qtdAjudante = ${dados.qtdAjudanteServer},
            fkCaminhao = ${dados.fkCaminhaoServer},
            statusFrete = '${dados.statusFreteServer}'
        WHERE idFrete = ${id};
    `;
  return database.executar(instrucao);
}
module.exports = {
  InserirDadosFrete,
  ExibirDadosFretes,
  EditarDadosFretes,
};
