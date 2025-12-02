
function preencherTabelaEntrega() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO");
    fetch('/coleta/consultar', {
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
                    console.log(respostaConversao);
                    tabelaColeta.innerHTML = ``;
                    for (let i = 0; i < respostaConversao.length; i++) {
                        tabelaColeta.innerHTML += `
                        <tr onclick="preencherFormularioColeta('${respostaConversao[i].CLIENTE_COLETA}', '${respostaConversao[i].ESTADO_COLETA}', '${respostaConversao[i].NUMERO_COLETA}', '${respostaConversao[i].DISTANCIA_KM_COLETA}', '${respostaConversao[i].BAIRRO_COLETA}', '${respostaConversao[i].CEP_COLETA}', '${respostaConversao[i].COMPLEMENTO_COLETA}', '${respostaConversao[i].ID_COLETA}')">
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
                }).catch(function (erroConversao) {
                    console.log(erroConversao);
                })
        }).catch(function (erro) {
            console.log(erro);
        })
}

function preencherFormularioEntrega(cliente, estado, numero, distancia, bairro, cep, complemento, id) {
    document.getElementById("clienteInput").value = cliente;
    document.getElementById("estadoInput").value = estado;
    document.getElementById("numeroInput").value = numero;
    document.getElementById("distanciaInput").value = distancia;
    document.getElementById("bairroInput").value = bairro;
    document.getElementById("cepInput").value = cep;
    document.getElementById("complementoInput").value = complemento;
    sessionStorage.setItem("ID_COLETA_EDITAR", id);
}

function adicionarEntrega() {
    var cliente = clienteInput.value;
    var estado = estadoInput.value;
    var numero = numeroInput.value;
    var distancia = distanciaInput.value;
    var bairro = bairroInput.value;
    var cep = cepInput.value;
    var complemento = complementoInput.value;
    var fkFrete = sessionStorage.getItem("ID_FRETE_SELECIONADO");

    fetch('/coleta/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                clienteServer: cliente,
                estadoServer: estado,
                numeroServer: numero,
                distanciaKMServer: distancia,
                bairroServer: bairro,
                CEPServer: cep,
                complementoServer: complemento,
                fkFreteServer: fkFrete
            })
    })
        .then(function (resposta) {
            console.log(resposta);
            alert("Coleta cadastrada com sucesso!");
            window.location.reload(true);
        }).catch(function (erro) {
            console.log(erro);
        })
}

function editarEntrega() {
    var cliente = document.getElementById("clienteInput").value;
    var estado = document.getElementById("estadoInput").value;
    var numero = document.getElementById("numeroInput").value;
    var distancia = document.getElementById("distanciaInput").value;
    var bairro = document.getElementById("bairroInput").value;
    var cep = document.getElementById("cepInput").value;
    var complemento = document.getElementById("complementoInput").value;
    var idColeta = sessionStorage.getItem("ID_COLETA_EDITAR");

    fetch(`/coleta/editar/${idColeta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                clienteServer: cliente,
                estadoServer: estado,
                numeroServer: numero,
                distanciaKMServer: distancia,
                bairroServer: bairro,
                CEPServer: cep,
                complementoServer: complemento
            })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao);
                    alert(`Coleta do cliente: ${cliente}, editada com sucesso!`);
                    window.location.reload(true);
                }).catch(function (erroConversao) {
                    console.log(erroConversao);
                })
        }).catch(function (erro) {
            console.log(erro);
        })
}

function removerEntrega() {
    var idColeta = sessionStorage.getItem("ID_COLETA_EDITAR");

    fetch(`/coleta/deletar/${idColeta}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao);
                    alert("Coleta removida com sucesso!");
                    window.location.reload(true);
                }).catch(function (erroConversao) {
                    console.log(erroConversao);
                })
        }).catch(function (erro) {
            console.log(erro);
        })
}


window.onload = 
PreencherTabelaEntrega()