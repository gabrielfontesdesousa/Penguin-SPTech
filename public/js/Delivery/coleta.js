function preencherTabelaColetas() {
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
          tabelaColeta.innerHTML = ``;
          for (let i = 0; i < respostaConversao.length; i++) {
            var complemento = ""
            if (!respostaConversao[i].COMPLEMENTO_COLETA) {
                complemento = "-"
            }  else {
                complemento = respostaConversao[i].COMPLEMENTO_COLETA
            }
            tabelaColeta.innerHTML += `
              <tr onclick="preencherFormularioColeta('${respostaConversao[i].CLIENTE_COLETA}','${respostaConversao[i].ESTADO_COLETA}','${respostaConversao[i].NUMERO_COLETA}','${respostaConversao[i].DISTANCIA_KM_COLETA}','${respostaConversao[i].BAIRRO_COLETA}','${respostaConversao[i].CEP_COLETA}','${respostaConversao[i].COMPLEMENTO_COLETA}','${respostaConversao[i].ID_COLETA}')">
                  <td>${respostaConversao[i].CLIENTE_COLETA}</td>
                  <td>${respostaConversao[i].ESTADO_COLETA}</td>
                  <td>${respostaConversao[i].NUMERO_COLETA}</td>
                  <td>${respostaConversao[i].DISTANCIA_KM_COLETA}</td>
                  <td>${respostaConversao[i].BAIRRO_COLETA}</td>
                  <td>${respostaConversao[i].CEP_COLETA}</td>
                  <td>${complemento}</td>
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
  console.log(sessionStorage.getItem('ID_COLETA_EDITAR'));
}
function adicionarColeta() {
  fetch('/coleta/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        clienteServer: clienteInput.value,
        distanciaKMServer: distanciaInput.value,
        CEPServer: cepInput.value,
        estadoServer: estadoInput.value,
        bairroServer: bairroInput.value,
        complementoServer: complementoInput.value,
        numeroServer: numeroInput.value,
        fkFreteServer: sessionStorage.getItem('ID_COLETA_EDITAR'),
    }),
  }).then(function (resposta) {
    resposta.json()
    .then(function (respostaConversao){
        console.log(respostaConversao);
        alert("Coleta cadastrada com sucesso!")
        preencherTabelaColetas()
    }).catch(function (erro) {
        console.log(erro)
    })
  }).catch(function(erro){
    console.log(erro)
    alert(`Preencha os campos corretamente: ${erro}`)

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
      alert(`Preencha os campos corretamente: ${erro}`)
    });
}
function removerColeta() {
  var idFrete = sessionStorage.getItem('ID_COLETA_EDITAR');
  fetch(`/coleta/deletar/${idFrete}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (resposta) {
      resposta
        .json()
        .then(function (respostaConversao) {
          console.log(respostaConversao);
          alert('Frete removido com sucesso!');
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
window.onload = preencherTabelaColetas();
