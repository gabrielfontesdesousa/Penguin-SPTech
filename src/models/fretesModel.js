const cli = require('nodemon/lib/cli');
var database = require('../database/config');

function InserirDadosFrete(
    cliente,
    dtSaida,
    valor,
    pesoKG,
    vlPedagio,
    qtdAjudante,
    statusFrete,
    email
  ) {
    console.log(`ESTOU TENTANDO INSERIR DADOS FRETE\n \n\t\t >> `);
    var instrucao = `

      INSERT INTO Frete(cliente, dtSaida, valor, pesoKG, vlPedagio, qtdAjudante, fkCaminhao, fkUsuario, statusFrete)
      VALUES
        ('${cliente}','${dtSaida}',${valor},${pesoKG},${vlPedagio},${qtdAjudante},
        (SELECT idCaminhao FROM Caminhao WHERE fkUsuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}')),
        (SELECT idUsuario FROM Usuario WHERE email = '${email}'),
        '${statusFrete}');
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
            fkCaminhao = (SELECT idCaminhao FROM Caminhao WHERE fkUsuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}')),
            statusFrete = '${dados.statusFreteServer}'
        WHERE idFrete = ${id};
    `;
  return database.executar(instrucao);
}
function DeletarDadosFrete(id) {
    console.log(`ESTOU TENTANDO DELETAR DADOS FRETE\n \n\t\t >> `);

    var instrucaoEntrega = `
      DELETE FROM Entrega
      WHERE fkFrete = ${id};
    `;

    var instrucaoColeta = `
      DELETE FROM Coleta
      WHERE fkFrete = ${id};
    `;

    var instrucaoFrete = `
      DELETE FROM Frete
      WHERE idFrete = ${id};
    `;

    return database.executar(instrucaoEntrega)
      .then(function() {
        return database.executar(instrucaoColeta);
      })
      .then(function() {
        return database.executar(instrucaoFrete);
      });
  }
module.exports = {
  InserirDadosFrete,
  ExibirDadosFretes,
  EditarDadosFretes,
  DeletarDadosFrete
};
