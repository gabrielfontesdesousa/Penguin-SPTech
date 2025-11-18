function ValidarColeta(corpoReq){
    if (!corpoReq.CEPServer) return "CEP obrigatório";
    if (!corpoReq.numeroServer) return "Numero obrigatório";
    if (!corpoReq.bairroServer ) return "Bairro inválido";

    if (!corpoReq.estadoServer) return "Estado inválido";

    if (!corpoReq.clienteServer) return "Cliente inválido";

    if (!corpoReq.complementoServer) return "Complemento inválido";

    if (!corpoReq.distanciaKMServer || isNaN(corpoReq.distanciaKMServer)) return "Distancia inválido";

    if (!corpoReq.fkFreteServer|| isNaN(corpoReq.fkFreteServer)) return "FK obrigatório";
    }
    module.exports = {
        ValidarColeta
    }
