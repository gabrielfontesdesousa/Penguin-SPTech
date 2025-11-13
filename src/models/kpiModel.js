var database = require("../database/config")

function ObterFretesRealizados(idUserSessao){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT
        f.idFrete,
        u.idUsuario AS ID_Usuario,
        f.cliente as CLIENTE,
        f.dtConclusao AS DATA_CONCLUSAO,
        (SELECT COUNT(*)
        FROM Frete
        WHERE fkUsuario = u.idUsuario
            AND statusFrete = 'Realizado') AS TOTAL_FRETES_REALIZADOS
        FROM Frete f
        JOIN Usuario u ON u.idUsuario = f.fkUsuario
        WHERE u.idUsuario = ${idUserSessao}
        AND f.statusFrete = 'Realizado'
        ORDER BY f.dtConclusao DESC;    `
}
