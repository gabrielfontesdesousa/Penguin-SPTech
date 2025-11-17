var kpiManutencaoModel = require('../models/kpiManutencaoModel');

function CalculaQuilometrosRestantes(
    quilometragemAtual,
    intervaloKmManutencao,
    somaKmColetas,
    somaKmEntregas
  ) {
    var kmRodado = quilometragemAtual + somaKmColetas + somaKmEntregas;
    var resto = kmRodado % intervaloKmManutencao;
    var kmRestante = intervaloKmManutencao - resto;
    if (kmRestante === intervaloKmManutencao) {
      kmRestante = 0;
    }
    return kmRestante;
}

function ExibirKpiManutencao(req, res) {
  var email = req.body.emailServer;
  if (!email) {
    console.log('EMAIL NÃO CHEGOU AQUI MANUTENCAO: ', email);
  } else {
    console.log('EMAIL: ', email);
  }

  kpiManutencaoModel
    .ObterKpiManutencao(email)
    .then(function (resposta) {
      console.log(`Resultado manutencao: ${resposta}`);
      var somaKmColetas = Number(resposta[0].SOMA_KM_COLETAS);
      var somaKmEntregas = Number(resposta[0].SOMA_KM_ENTREGAS);
      var quilometragem = Number(resposta[0].QUILOMETRAGEM);
      var intervaloKmManutencao = Number(resposta[0].INTERVALO_KM_MANUTENCAO)
        var kmRestante = CalculaQuilometrosRestantes(
            quilometragem,
            intervaloKmManutencao,
            somaKmColetas,
            somaKmEntregas
          );
          console.log("KM RESTANTE:", kmRestante);
      res.status(200).json(kmRestante);
    })
    .catch(function (erro) {
      console.log(`ERRO AO MANDAR A MESAGEM: ${erro}`);
      res.status(500);
    });
}
module.exports = {
  ExibirKpiManutencao,
};
