function ValidarDespesa(corpoReq) {
  if (!corpoReq.descricaoServer) return 'Descrição obrigatória';
  if (!corpoReq.valorServer || isNaN(corpoReq.valorServer)) return 'Valor inválido';
  if (!corpoReq.categoriaServer) return 'Categoria obrigatória';
  if (!corpoReq.dataDespServer) return 'Data obrigatória';
}

module.exports = {
  ValidarDespesa,
};
