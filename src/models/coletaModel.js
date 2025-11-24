var database = require('../database/config')

function InserirDadosColeta(CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete){
    var instrucao = `
        INSERT INTO Coleta (CEP, numero, bairro, estado, cliente, complemento, distanciaKM, fkFrete)
        VALUES ('${CEP}', '${numero}', '${bairro}', '${estado}', '${cliente}', '${complemento}', ${distanciaKM}, ${fkFrete});
    `
    return database.executar(instrucao);
}
function consultarDadosColeta(email){
    var instrucao = `
        SELECT
            CEP_COLETA,
            NUMERO_COLETA,
            BAIRRO_COLETA,
            ESTADO_COLETA,
            CLIENTE_COLETA,
            COMPLEMENTO_COLETA,
            DISTANCIA_KM_COLETA,
            ID_COLETA
        FROM VW_CONSULTA_COLETAS
        WHERE ID_USUARIO = (SELECT idUsuario FROM Usuario WHERE email = '${email}');
  `
    return database.executar(instrucao);
}
function editarDadosColeta(id, dados){
    var instrucao = `
        UPDATE Coleta SET
            CEP = '${dados.cepServer}',
            numero = '${dados.numeroServer}',
            bairro = '${dados.bairroServer}',
            estado = '${dados.estadoServer}',
            cliente = '${dados.clienteServer}',
            complemento = '${dados.complementoServer}',
            distanciaKM = ${dados.distanciaServer},
            fkFrete = ${dados.fkFreteServer}
        WHERE idColeta = ${id};
  `
    return database.executar(instrucao);
}


module.exports = {
    InserirDadosColeta,
    consultarDadosColeta,
    editarDadosColeta
}
