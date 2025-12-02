function abrirModal() {
    document.getElementById('modalOverlay').style.display = 'block';
}
function fecharModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

var modoAtual = "coleta";

function abrirModal() {
    document.getElementById('modalOverlay').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

function alternarTabelaColetaEntrega() {
    var containerColeta = document.getElementById("containerColeta");
    var containerEntrega = document.getElementById("containerEntrega");
    var btnAlternar = document.getElementById("btnAlternar");
    var tituloModal = document.getElementById("tituloModal");
    var campoDestinatario = document.getElementById("campoDestinatario");

    if (modoAtual === "coleta") {
        containerColeta.style.display = "none";
        containerEntrega.style.display = "block";
        btnAlternar.innerHTML = "Ver Coletas";
        tituloModal.innerHTML = "Entregas";
        campoDestinatario.style.display = "block";
        modoAtual = "entrega";
        preencherTabelaEntregas();
    } else {
        containerColeta.style.display = "block";
        containerEntrega.style.display = "none";
        btnAlternar.innerHTML = "Ver Entregas";
        tituloModal.innerHTML = "Coletas";
        campoDestinatario.style.display = "none";
        modoAtual = "coleta";
        preencherTabelaColetas();
    }
}
function preencherTabelaFretes() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    fetch('/fretes/consultar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                emailServer: email
            })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao)
                    tabelaFrete.innerHTML = ``
                    for (let i = 0; i < respostaConversao.length; i++) {
                        tabelaFrete.innerHTML += `
                        <tr onclick="preencherFormularioFrete('${respostaConversao[i].CLIENTE}', '${respostaConversao[i].DT_SAIDA}', '${respostaConversao[i].VALOR}', '${respostaConversao[i].PESO_KG}', '${respostaConversao[i].VALOR_PEDAGIO}', '${respostaConversao[i].QTD_AJUDANTE}', '${respostaConversao[i].STATUS_FRETES}', '${respostaConversao[i].ID_Fretes}')">
                            <td>${respostaConversao[i].CLIENTE}</td>
                            <td>${respostaConversao[i].DT_SAIDA}</td>
                            <td>${respostaConversao[i].VALOR}</td>
                            <td>${respostaConversao[i].PESO_KG}</td>
                            <td>${respostaConversao[i].VALOR_PEDAGIO}</td>
                            <td>${respostaConversao[i].QTD_AJUDANTE}</td>
                            <td>${respostaConversao[i].STATUS_FRETES}</td>
                        </tr>
                        `;
                        console.log(respostaConversao.DT_SAIDA)
                    }
                }).catch(function (erroConversao) {
                    console.log(erroConversao)
                })
        }).catch(function (erro) {
            console.log(erro)
        })
}
function preencherFormularioFrete(cliente, dtsaida, valor, peso, pedagio, ajudantes, status, id) {
    document.getElementById("clienteInputFrete").value = cliente;
    document.getElementById("dataSaidaInputFrete").value = dtsaida.slice(0,10);
    console.log(document.getElementById("dataSaidaInputFrete").value)
    document.getElementById("valorInputFrete").value = valor;
    document.getElementById("pesoInputFrete").value = peso;
    document.getElementById("pedagioInputFrete").value = pedagio;
    document.getElementById("ajudantesInputFrete").value = ajudantes;
    document.getElementById("statusInputFrete").value = status;
    sessionStorage.setItem("ID_FRETE_EDITAR", id);
}

function adicionarFrete() {
    var cliente = clienteInputFrete.value;
    var data = dataSaidaInputFrete.value;
    var valor = valorInputFrete.value;
    var peso = pesoInputFrete.value;
    var pedagio = pedagioInputFrete.value;
    var ajudante = ajudantesInputFrete.value;
    var status = statusInputFrete.value;
    var dataConclusao = dataInputFrete.value;
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO");

    fetch('/fretes/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                clienteServer: cliente,
                dtSaidaServer: data,
                valorServer: valor,
                pesoKGServer: peso,
                vlPedagioServer: pedagio,
                qtdAjudanteServer: ajudante,
                statusFreteServer: status,
                dtConclusaoServer: dataConclusao,
                emailServer: email
            })
    })
        .then(function (resposta) {
            console.log(resposta);
            alert("Frete cadastrado com sucesso!");
            window.location.reload(true);
        }).catch(function (Erro) {
            console.log(Erro);
        })
}
function editarFrete() {
    var cliente = document.getElementById("clienteInputFrete").value;
    var dataSaida = document.getElementById("dataSaidaInputFrete").value;
    dataSaida = dataSaida.slice(0, 10);
    var valor = document.getElementById("valorInputFrete").value;
    var peso = document.getElementById("pesoInputFrete").value;
    var pedagio = document.getElementById("pedagioInputFrete").value;
    var ajudantes = document.getElementById("ajudantesInputFrete").value;
    var data = document.getElementById("dataInputFrete").value;
    var status = document.getElementById("statusInputFrete").value;
    var idCaminhao = sessionStorage.getItem("ID_CAMINHAO")
    var idFrete = sessionStorage.getItem("ID_FRETE_EDITAR")
    fetch(`/fretes/editar/${idFrete}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                clienteServer: cliente,
                dtSaidaServer: dataSaida,
                valorServer: valor,
                pesoKGServer: peso,
                vlPedagioServer: pedagio,
                qtdAjudanteServer: ajudantes,
                fkCaminhaoServer: idCaminhao,
                statusFreteServer: status,
                dtConclusaoServer: data
            })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao)
                    alert(`Frete do cliente: ${cliente}, editado com suceso!`)
                    window.location.reload(true);
                }).catch(function (erroConversao) {
                    console.log(erroConversao)
                })
        }).catch(function (erro) {

        })
}
function removerFrete() {
    var idFrete = sessionStorage.getItem("ID_FRETE_EDITAR");

    fetch(`/fretes/deletar/${idFrete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao);
                    alert("Frete removido com sucesso!");
                    window.location.reload(true);
                }).catch(function (erroConversao) {
                    console.log(erroConversao);
                })
        }).catch(function (erro) {
            console.log(erro);
        })
}
window.onload =
    preencherTabelaFretes()