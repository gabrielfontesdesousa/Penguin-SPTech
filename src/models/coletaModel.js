var database = require('../database/config')

function InserirDadosColeta(CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete){
    var instrucao = `
        INSERT INTO Coleta (CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete)
        VALUES ('${CEP}', '${numero}', '${bairro}', '${estado}', '${cliente}', '${complemento}', ${distanciaKM}, ${fkFrete});
    `
    return database.executar(instrucao);
}
module.exports = {
    InserirDadosColeta
}
