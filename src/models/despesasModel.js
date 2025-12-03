var database = require('../database/config')

function obterDadosDespesas(email){
    var instrucao = `
            SELECT *
            FROM VW_DESPESAS_MENSAIS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
function obterDadosDespesasTipo(email){
    var instrucao = `
           SELECT *
            FROM VW_RESUMO_DESPESAS_MENSAIS
            WHERE ID_Usuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
    `
    return database.executar(instrucao)
}
 function atualizarDadosDespesas(id, dados){
    var instrucao = `
        UPDATE Despesa
        SET descricao = '${dados.descricaoServer}',
            valor = '${dados.valorServer}',
            categoria = '${dados.categoriaServer}',
            dataDesp = '${dados.dataDespServer}'
        WHERE idDespesa = ${id};
    `;
     return database.executar(instrucao)
 }
 function DeletarDadosDespesa(id) {
    console.log(`ESTOU TENTANDO DELETAR DADOS DESPESA\n \n\t\t >> `);
    var instrucao = `
      DELETE FROM Despesa
      WHERE idDespesa = ${id};
    `;
    return database.executar(instrucao);
  }
  function InserirDadosDespesa(descricao, valor, categoria, dataDesp, email) {
    console.log(`ESTOU TENTANDO INSERIR DADOS DESPESA\n \n\t\t >> `);
    var instrucao = `
       INSERT INTO Despesa(descricao, valor, categoria, dataDesp, fkMotorista)
    VALUES
    ('${descricao}', ${valor}, '${categoria}', '${dataDesp}',
    (SELECT idMotorista FROM Motorista WHERE fkUsuario = (SELECT idUsuario FROM Usuario WHERE email = '${email}')));
    `;
    return database.executar(instrucao);
  }
module.exports = {
    obterDadosDespesas,
    obterDadosDespesasTipo,
    DeletarDadosDespesa,
    atualizarDadosDespesas,
    InserirDadosDespesa
}
