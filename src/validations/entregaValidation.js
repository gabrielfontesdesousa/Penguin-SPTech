function ValidarEntrega(corpoReq) {
  if (!corpoReq.clienteServer) return 'Cliente obrigatório';
  if (!corpoReq.distanciaKMServer || isNaN(corpoReq.distanciaKMServer)) return 'Distância inválida';
  if (!corpoReq.CEPServer) return 'CEP obrigatório';
  if (!corpoReq.estadoServer) return 'Estado obrigatório';
  if (!corpoReq.bairroServer) return 'Bairro obrigatório';
  if (!corpoReq.numeroServer || isNaN(corpoReq.numeroServer)) return 'Número inválido';
  if (!corpoReq.complementoServer) return 'Complemento obrigatório';
  if (!corpoReq.destinatarioServer) return 'Destinatário obrigatório';
  if (!corpoReq.fkFreteServer || isNaN(corpoReq.fkFreteServer)) return 'fkFrete inválido';
}

module.exports = {
  ValidarEntrega,
};
