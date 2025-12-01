function preencherTabelaDespesas() {
  email = sessionStorage.getItem('EMAIL_DO_LOGADO');
  fetch('/despesas/tabela', {
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
          tabelaDespesas.innerHTML = '';
          for (let i = 0; i < respostaConversao.length; i++) {
            tabelaDespesas.innerHTML += `
                    <tr onclick="preencherFormulario('${respostaConversao[i].CATEGORIA}', '${respostaConversao[i].VALOR
              }', '${respostaConversao[i].DATA}', '${respostaConversao[i].DESCRICAO}', '${respostaConversao[i].ID_DESPESA
              }')">
                        <td>${respostaConversao[i].CATEGORIA}</td>
                        <td>R$ ${respostaConversao[i].VALOR}</td>
                        <td>${respostaConversao[i].DATA.slice(0, 10)}</td>
                        <td>${respostaConversao[i].DESCRICAO}</td>
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
function preencherKpisDespesas() {
  fetch('/despesas/tipo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailServer: email,
    }),
  })
    .then(function (resposta) {
      resposta.json().then(function (respostaConversao) {
        console.log(respostaConversao);
        document.getElementById('kpi_total').innerText = `
                         R$ ${respostaConversao[0].TOTAL_DESPESAS_MES}`;
        document.getElementById('kpi_alimentacao').innerText = `
                        R$ ${respostaConversao[0].TOTAL_ALIMENTACAO}`;

        document.getElementById('kpi_pedagio').innerText = `
                        R$ ${respostaConversao[0].TOTAL_PEDAGIO}`;

        document.getElementById('kpi_documentos').innerText = `
                         R$ ${respostaConversao[0].TOTAL_DOCUMENTOS}`;

        document.getElementById('kpi_outros').innerText = `
                         R$ ${respostaConversao[0].TOTAL_OUTROS}`;
      });
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
function preencherFormulario(categoria, valor, data, descricao, id) {
  document.getElementById('categoriaInput').value = categoria;
  document.getElementById('valorInput').value = valor;
  document.getElementById('dataInput').value = data.slice(0, 10);
  document.getElementById('descricaoInput').value = descricao;
  sessionStorage.setItem('ID_DESPESA_EDITAR', id);
}

function editarDespesa() {
  var idServer = sessionStorage.getItem('ID_DESPESA_EDITAR');
  console.log(idServer)
  var valor = document.getElementById('valorInput').value;
  var descricao = document.getElementById('descricaoInput').value;
  var categoria = document.getElementById('categoriaInput').value;
  var dataDesp = document.getElementById('dataInput').value;
  fetch(`/despesas/atualizar/${idServer}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      descricaoServer: descricao,
      valorServer: valor,
      categoriaServer: categoria,
      dataDespServer: dataDesp,
    }),
  })
    .then(function (resposta) {
      resposta
        .json()
        .then(function (respostaConversao) {
          console.log(respostaConversao);
          alert(`Despesa editada com suceso!`);
          //window.location.reload(true);
        })
        .catch(function (erroConversao) {
          console.log(erroConversao);
        });
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
window.onload = preencherTabelaDespesas();
preencherKpisDespesas();
