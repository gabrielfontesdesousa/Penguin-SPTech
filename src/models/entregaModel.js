var database = require('../database/config')

function InserirDadosEntrega(CEP, numero, bairro, estado, cliente, complemento, destinatario, distanciaKM, fkFrete){
    var instrucao = `
    INSERT INTO Entrega (CEP, numero, bairro, estado, cliente, complemento, destinatario, distanciaKM, fkFrete)
    VALUES ('${CEP}', '${numero}', '${bairro}', '${estado}', '${cliente}', '${complemento}', '${destinatario}', ${distanciaKM}, ${fkFrete});
    `
    return database.executar(instrucao)
}

module.exports = {
    InserirDadosEntrega
}
