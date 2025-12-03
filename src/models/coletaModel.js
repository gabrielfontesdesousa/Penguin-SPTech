var database = require('../database/config');

function InserirDadosColeta(
  CEP,
  numero,
  bairro,
  estado,
  cliente,
  complemento,
  distanciaKM,
  fkFrete
) {
  var instrucao = `
        INSERT INTO Coleta (CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete)
        VALUES ('${CEP}', '${numero}', '${bairro}', '${estado}', '${cliente}', '${complemento}', ${distanciaKM}, ${fkFrete});
    `;
  return database.executar(instrucao);
}
function consultarDadosColeta(email) {
  var instrucao = `
        SELECT
            CLIENTE_COLETA,
            ESTADO_COLETA,
            NUMERO_COLETA,
            DISTANCIA_KM_COLETA,
            BAIRRO_COLETA,
            CEP_COLETA,
            COMPLEMENTO_COLETA,
            ID_COLETA
        FROM VW_CONSULTA_COLETAS
        WHERE ID_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
  `;
  return database.executar(instrucao);
}
function atualizarDadosColeta(id, dados) {
  var instrucao = `
      UPDATE Coleta
      SET cliente = '${dados.clienteServer}',
            estado = '${dados.estadoServer}',
          distanciaKM = '${dados.distanciaServer}',
          CEP = '${dados.cepServer}',
          bairro = '${dados.bairroServer}',
          complemento = '${dados.complementoServer}',
          numero = '${dados.numeroServer}'
      WHERE idColeta = ${id};
    `;

  return database.executar(instrucao);
}
function DeletarDadosColeta(id) {
    console.log(`ESTOU TENTANDO DELETAR DADOS COLETA\n \n\t\t >> `);

    var instrucao = `
      DELETE FROM Coleta
      WHERE fkFrete = ${id};
    `;
    console.log(instrucao)
    return database.executar(instrucao)
  }
module.exports = {
  InserirDadosColeta,
  consultarDadosColeta,
  atualizarDadosColeta,
  DeletarDadosColeta
};
