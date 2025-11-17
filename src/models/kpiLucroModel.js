var database = require('../database/config')

function ObterLucroLiquido(email){
    console.log("ESTOU TENTANDO ENVIAR O LUCRO LIQUIDO \n \n\t\t >>")
    var instrucao = `
       SELECT
    (
        SELECT SUM(f.valor)
        FROM Frete f
        WHERE f.fkUsuario = u.idUsuario
    ) AS totalFretes,
    (
        SELECT SUM(d.valor)
        FROM Despesa d
        JOIN Motorista m ON d.fkMotorista = m.idMotorista
        WHERE m.fkUsuario = u.idUsuario
    ) AS totalDespesas
        FROM Usuario u
        WHERE u.email = '${email}';
    `
    return database.executar(instrucao)
}
module.exports = {
    ObterLucroLiquido
}
