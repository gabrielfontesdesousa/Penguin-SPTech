const { consultarDadosColeta } = require('../../../src/models/coletaModel');

function preencherTabelaColetas() {
  tabelaColeta.innerHTML = `
     <thead>
        <tr>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Numero</th>
            <th>Distancia (KM)</th>
            <th>Bairro</th>
            <th>CEP</th>
            <th>Complemento</th>
        </tr>
    </thead>
    `;
  var email = sessionStorage.getItem('EMAIL_DO_LOGADO');
  fetch('/coleta/consultar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailServer: email,
    }),
  })
    .then(function (resposta) {
      resposta
        .json()
        .then(function (respostaConversao) {
          console.log(respostaConversao);
          for (let i = 0; i < respostaConversao.length; i++) {
            tabelaColeta.innerHTML += `
                        <tr onclick="preencherFormularioColeta('${respostaConversao[i].CLIENTE_COLETA}','${respostaConversao[i].ESTADO_COLETA}','${respostaConversao[i].NUMERO_COLETA}','${respostaConversao[i].DISTANCIA_KM_COLETA}','${respostaConversao[i].BAIRRO_COLETA}','${respostaConversao[i].CEP_COLETA}','${respostaConversao[i].COMPLEMENTO_COLETA}','${respostaConversao[i].ID_COLETA}')">
                            <td>${respostaConversao[i].CLIENTE_COLETA}</td>
                            <td>${respostaConversao[i].ESTADO_COLETA}</td>
                            <td>${respostaConversao[i].NUMERO_COLETA}</td>
                            <td>${respostaConversao[i].DISTANCIA_KM_COLETA}</td>
                            <td>${respostaConversao[i].BAIRRO_COLETA}</td>
                            <td>${respostaConversao[i].CEP_COLETA}</td>
                            <td>${respostaConversao[i].COMPLEMENTO_COLETA}</td>
                        </tr>
                        `;
          }
        })
        .catch(function (erroConversao) {
          console.log(erroConversao);
        });
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
function preencherFormularioColeta(
  cliente,
  estado,
  numero,
  distancia,
  bairro,
  cep,
  complemento,
  id
) {
  document.getElementById('clienteInput').value = cliente;
  document.getElementById('distanciaInput').value = distancia;
  document.getElementById('cepInput').value = cep;
  document.getElementById('estadoInput').value = estado;
  document.getElementById('bairroInput').value = bairro;
  document.getElementById('complementoInput').value = complemento;
  document.getElementById('numeroInput').value = numero;
  sessionStorage.setItem('ID_COLETA_EDITAR', id);
}
function adicionarColeta() {
  fetch('/coleta/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clienteServer: clienteInputFrete.value,
      dtSaidaServer: dataSaidaInputFrete.value,
      valorServer: valorInputFrete.value,
      pesoKGServer: pesoInputFrete.value,
      vlPedagioServer: pedagioInputFrete.value,
      qtdAjudanteServer: ajudantesInputFrete.value,
      fkUsuarioServer: sessionStorage.getItem('ID_USUARIO'),
      dtConclusaoServer: dataInputFrete.value,
      statusFreteServer: StatusInputFrete.value,
    }),
  }).then(function (resposta) {
    console.log(resposta);
  });
}
function editarColeta() {
  var id = sessionStorage.getItem('ID_COLETA_EDITAR');
  console.log(id);
  var cliente = document.getElementById('clienteInput').value;
  var distancia = document.getElementById('distanciaInput').value;
  var cep = document.getElementById('cepInput').value;
  var estado = document.getElementById('estadoInput').value;
  var bairro = document.getElementById('bairroInput').value;
  var complemento = document.getElementById('complementoInput').value;
  var numero = document.getElementById('numeroInput').value;

  fetch(`/coleta/atualizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clienteServer: cliente,
      distanciaServer: distancia,
      cepServer: cep,
      estadoServer: estado,
      bairroServer: bairro,
      complementoServer: complemento,
      numeroServer: numero,
    }),
  })
    .then(function (resposta) {
      resposta
        .json()
        .then(function (respostaConversao) {
          console.log(respostaConversao);
          alert(`COLETA do cliente: ${cliente}, editado com suceso!`);
          preencherTabelaColetas();
        })
        .catch(function (erroConversao) {
          console.log(erroConversao);
        });
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
