function preencherTabelaEntregas() {
  var email = sessionStorage.getItem('EMAIL_DO_LOGADO');
  fetch('/entrega/consultar', {
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
          tabelaEntrega.innerHTML = ``;
          for (let i = 0; i < respostaConversao.length; i++) {
            tabelaEntrega.innerHTML += `
                        <tr onclick="preencherFormularioEntrega('${respostaConversao[i].CLIENTE_ENTREGA}', '${respostaConversao[i].ESTADO_ENTREGA}', '${respostaConversao[i].NUMERO_ENTREGA}', '${respostaConversao[i].DISTANCIA_KM_ENTREGA}', '${respostaConversao[i].BAIRRO_ENTREGA}', '${respostaConversao[i].CEP_ENTREGA}', '${respostaConversao[i].COMPLEMENTO_ENTREGA}', '${respostaConversao[i].DESTINATARIO_ENTREGA}', '${respostaConversao[i].ID_ENTREGA}')">
                            <td>${respostaConversao[i].CLIENTE_ENTREGA}</td>
                            <td>${respostaConversao[i].ESTADO_ENTREGA}</td>
                            <td>${respostaConversao[i].NUMERO_ENTREGA}</td>
                            <td>${respostaConversao[i].DISTANCIA_KM_ENTREGA}</td>
                            <td>${respostaConversao[i].BAIRRO_ENTREGA}</td>
                            <td>${respostaConversao[i].CEP_ENTREGA}</td>
                            <td>${respostaConversao[i].COMPLEMENTO_ENTREGA}</td>
                            <td>${respostaConversao[i].DESTINATARIO_ENTREGA}</td>
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

function preencherFormularioEntrega(
  cliente,
  estado,
  numero,
  distancia,
  bairro,
  cep,
  complemento,
  destinatario,
  id
) {
  document.getElementById('clienteInput').value = cliente;
  document.getElementById('estadoInput').value = estado;
  document.getElementById('numeroInput').value = numero;
  document.getElementById('distanciaInput').value = distancia;
  document.getElementById('bairroInput').value = bairro;
  document.getElementById('cepInput').value = cep;
  document.getElementById('complementoInput').value = complemento;
  document.getElementById('destinatarioInput').value = destinatario;
  sessionStorage.setItem('ID_ENTREGA_EDITAR', id);
}

function adicionarEntrega() {
  var cliente = clienteInput.value;
  var estado = estadoInput.value;
  var numero = numeroInput.value;
  var distancia = distanciaInput.value;
  var bairro = bairroInput.value;
  var cep = cepInput.value;
  var complemento = complementoInput.value;
  var destinatario = destinatarioInput.value;
  var fkFrete = sessionStorage.getItem('ID_ENTREGA_EDITAR');

  fetch('/entrega/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clienteServer: cliente,
      estadoServer: estado,
      numeroServer: numero,
      distanciaKMServer: distancia,
      bairroServer: bairro,
      CEPServer: cep,
      complementoServer: complemento,
      destinatarioServer: destinatario,
      fkFreteServer: fkFrete,
    }),
  })
    .then(function (resposta) {
      console.log(resposta);
      //alert('Entrega cadastrada com sucesso!');
      preencherTabelaEntregas();
    })
    .catch(function (erro) {
      console.log(erro);
      alert(`Preencha os campos corretamente: ${erro}`)
    });
}

function editarEntrega() {
  var cliente = document.getElementById('clienteInput').value;
  var estado = document.getElementById('estadoInput').value;
  var numero = document.getElementById('numeroInput').value;
  var distancia = document.getElementById('distanciaInput').value;
  var bairro = document.getElementById('bairroInput').value;
  var cep = document.getElementById('cepInput').value;
  var complemento = document.getElementById('complementoInput').value;
  var destinatario = document.getElementById('destinatarioInput').value;
  var idEntrega = sessionStorage.getItem('ID_ENTREGA_EDITAR');

  fetch(`/entrega/editar/${idEntrega}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clienteServer: cliente,
      estadoServer: estado,
      numeroServer: numero,
      distanciaKMServer: distancia,
      bairroServer: bairro,
      CEPServer: cep,
      complementoServer: complemento,
      destinatarioServer: destinatario,
    }),
  })
    .then(function (resposta) {
      resposta
        .json()
        .then(function (respostaConversao) {
          console.log(respostaConversao);
          alert(`Entrega do cliente: ${cliente}, editada com sucesso!`);
          preencherTabelaEntregas();
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

function removerEntrega() {
  var idEntrega = sessionStorage.getItem('ID_ENTREGA_EDITAR');

  fetch(`/entrega/deletar/${idEntrega}`, {
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
          alert('Entrega removida com sucesso!');
          preencherTabelaEntregas();
        })
        .catch(function (erroConversao) {
          console.log(erroConversao);
        });
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
