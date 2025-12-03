function ValidarFrete(corpoReq) {
  if (!corpoReq.clienteServer) return 'Cliente obrigatório';
  if (!corpoReq.dtSaidaServer) return 'Data de saída obrigatória';

  if (!corpoReq.valorServer || isNaN(corpoReq.valorServer)) return 'Valor inválido';

  if (!corpoReq.pesoKGServer || isNaN(corpoReq.pesoKGServer)) return 'Peso inválido';

  if (!corpoReq.vlPedagioServer || isNaN(corpoReq.vlPedagioServer)) return 'Pedágio inválido';

  if (corpoReq.qtdAjudanteServer && isNaN(corpoReq.qtdAjudanteServer))
    return 'Qtd ajudante inválida';

  if (!corpoReq.fkCaminhaoServer || isNaN(corpoReq.fkCaminhaoServer)) return 'fkCaminhao inválido';

  if (!corpoReq.fkUsuarioServer || isNaN(corpoReq.fkUsuarioServer)) return 'fkUsuario inválido';

  if (!corpoReq.statusFreteServer) return 'Status obrigatório';
}
module.exports = ValidarFrete;
