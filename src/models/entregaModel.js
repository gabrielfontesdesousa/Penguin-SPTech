var database = require('../database/config');

function InserirDadosEntrega(
  CEP,
  numero,
  bairro,
  estado,
  cliente,
  complemento,
  destinatario,
  distanciaKM,
  fkFrete
) {
  console.log(`ESTOU TENTANDO INSERIR DADOS ENTREGA\n \n\t\t >> `);
  var instrucao = `
    INSERT INTO Entrega(CEP, numero, bairro, estado, cliente, complemento, destinatario, distanciaKM, fkFrete)
    VALUES
    ('${CEP}', '${numero}', '${bairro}', '${estado}', '${cliente}', '${complemento}', '${destinatario}', ${distanciaKM}, ${fkFrete});
  `;
  console.log(instrucao)
  return database.executar(instrucao);
}

function ExibirDadosEntregas(email) {
  console.log(`ESTOU TENTANDO CONSULTAR DADOS ENTREGAS\n \n\t\t >> `);
  var instrucao = `
    SELECT
      e.idEntrega AS ID_ENTREGA,
      e.CEP AS CEP_ENTREGA,
      e.numero AS NUMERO_ENTREGA,
      e.bairro AS BAIRRO_ENTREGA,
      e.estado AS ESTADO_ENTREGA,
      e.cliente AS CLIENTE_ENTREGA,
      e.complemento AS COMPLEMENTO_ENTREGA,
      e.destinatario AS DESTINATARIO_ENTREGA,
      e.distanciaKM AS DISTANCIA_KM_ENTREGA,
      e.fkFrete AS FK_FRETE,
      u.idUsuario AS ID_USUARIO
    FROM Entrega e
    JOIN Frete f ON e.fkFrete = f.idFrete
    JOIN Usuario u ON u.idUsuario = f.fkUsuario
    WHERE u.idUsuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
  `;
  return database.executar(instrucao);
}

function EditarDadosEntrega(id, dados) {
  console.log(`ESTOU TENTANDO EDITAR DADOS ENTREGA\n \n\t\t >> `);
  var instrucao = `
    UPDATE Entrega
    SET CEP = '${dados.CEPServer}',
        numero = '${dados.numeroServer}',
        bairro = '${dados.bairroServer}',
        estado = '${dados.estadoServer}',
        cliente = '${dados.clienteServer}',
        complemento = '${dados.complementoServer}',
        destinatario = '${dados.destinatarioServer}',
        distanciaKM = ${dados.distanciaKMServer}
    WHERE idEntrega = ${id};
  `;
  return database.executar(instrucao);
}

function DeletarDadosEntrega(id) {
  console.log(`ESTOU TENTANDO DELETAR DADOS ENTREGA\n \n\t\t >> `);
  var instrucao = `
    DELETE FROM Entrega
    WHERE idEntrega = ${id};
  `;
  return database.executar(instrucao);
}

module.exports = {
  InserirDadosEntrega,
  ExibirDadosEntregas,
  EditarDadosEntrega,
  DeletarDadosEntrega
};
