nome = sessionStorage.getItem("NOME_DO_LOGADO")
nomeUser.innerHTML = nome;
function ConsultaKpiFretes() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    console.log('kpi fretes: ', email)
    if (email == null) {
        console.log("Nenhum email no sessionStorage");
    }
    fetch("/kpi/fretes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    fretesRealizados.innerHTML =
                        fretesRealizados.innerHTML = `
                            <div class="header-card">
                                <div>
                                    <h3>Fretes</h3>
                                    <h3>Realizados</h3>
                                </div>
                                <span class="caixa-mes">Mês</span>
                            </div>
                            <div class="conteudo-card">
                                <h2>${respostaConversao[0].TOTAL_FRETES_REALIZADOS}</h2>
                                <span class="porcentagem positivo"></span>
                            </div>
                            <p class="descricao-card">Viagens realizadas na jornada do último mês</p>
`;
                }).catch((erro) => {
                    console.log("ERRO:", erro)
                })
        }).catch((erro) => {
            console.log(erro)
        })
        .then(function (fretes) {
            console.log("Resultado da KPI:", fretes);
            console.log("Quantidade de fretes realizados:", fretes);

        })
        .catch(erro => {
            console.log("ERRO:", erro);
        });
}
function ConsultaKpiLucroLiquido() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    console.log('kpi lucro:', email)
    fetch('/kpi/lucro', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailSessionServer: email
        })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversaoDados) {
                    console.log(respostaConversaoDados)
                    LucroLiquido.innerHTML = `
                    <div class="header-card">
                        <div>
                            <h3>Lucro Líquido</h3>
                            <h3>Mensal</h3>
                        </div>
                        <span class="porcentagem-mini positivo"></span>
                    </div>
                    <div class="conteudo-card">
                        <h2>R$ ${respostaConversaoDados}</h2>
                    </div>
                    <p class="descricao-card">Cálculo baseado na margem dos custos fixos e variáveis no mês anterior.</p>
`;
                }).catch(function (errorConversao) {
                    console.log(errorConversao)
                })
        }).catch(function (errorEnvio) {
            console.log(console.log(errorEnvio))
        })
}
function ConsultaKpiDistancia() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    var objManipularData = new Date();
    var ano = objManipularData.getFullYear();
    var mes = objManipularData.getMonth() + 1;
    fetch('/kpi/distancia', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                emailServer: email,
                mesServer: mes,
                anoServer: ano
            })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    DistanciaTotal.innerHTML = `
                    <div class="header-card">
                        <div>
                            <h3>Distância Total</h3>
                            <h3>Percorrida</h3>
                        </div>
                        <span class="caixa-mes">Mês</span>
                    </div>
                    <div class="conteudo-card">
                        <h2>${respostaConversao[0].TOTAL_DE_KM}</h2>
                        <span class="unidade">KM</span>
                        <span class="porcentagem positivo"></span>
                    </div>
                    <p class="descricao-card">Porcentagem relativa ao período anterior.</p>
                `;
                }).catch(function (erro) {
                    console.log(`ERRO CONVERSAO: ${erro}`)
                })
        }).catch(function (erro) {
            console.log('ERRO AO BUSCAR DADOS NA ROTA: erro')
        })
}
function ConsultaKpiManutencao() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    fetch('/kpi/manutencao', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                emailServer: email,
            })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    Manutencao.innerHTML = `
                        <div class="header-revisao">
                            <h3>Sugestão de revisão em</h3>
                        </div>
                        <div class="conteudo-revisao">
                            <h2>${respostaConversao}</h2>
                            <span class="unidade-km">KMs</span>
                        </div>
                        <p class="descricao-revisao">Baseado no intervalo de KMs informado pelo usuário</p>
                        <p class="info-revisao">Gerenciamento baseado na quilometragem rodada de acordo com os fretes cadastrados na plataforma. Ajuste estimado baseado na sua distância, podendo variar.</p>
`;
                }).catch(function (erro) {
                    console.log(`ERRO CONVERSAO: ${erro}`)
                })
        }).catch(function (erro) {
            console.log(`ERRO AO BUSCAR DADOS NA ROTA: ${erro}`)
        })
}
function ConsultaGraficoSemestre() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")

    fetch('/grafico/semestre', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailServer: email })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    let labels = [];
                    let valores = [];

                    for (let i = 0; i < respostaConversao.length; i++) {
                        labels[i] = respostaConversao[i].mes;
                        valores[i] = respostaConversao[i].faturamento;
                    }

                    const ctx = document.getElementById('chart');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: "Faturamento",
                                data: valores,
                                borderWidth: 1,
                                backgroundColor: [
                                    '#1BAFA9',
                                    '#FFFFFF',
                                    '#7B20E2'
                                ],

                            }]
                        },
                        options: {
                            scales: { y: { beginAtZero: true } },
                            responsive: true,
                            maintainAspectRatio: false,
                            barPercentage: 0.40,
                        }
                    });
                })
        })
        .catch(err => console.log(err))
}
function ConsultaGraficoDonnut() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    fetch('/grafico/donut', {
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
                    let labels = [];
                    let valores = [];
                    for (let i = 0; i < respostaConversao.length; i++) {
                        labels[i] = respostaConversao[i].categoria, "%";
                        valores[i] = respostaConversao[i].total;
                    }
                    console.log(respostaConversao)
                    const ctx = document.getElementById('donut');
                    new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: valores,
                                backgroundColor: [
                                    '#FFFFFF',
                                    '#636363',
                                    '#FFAE00',
                                    '#7B20E2',
                                    '#1BAFA9'
                                ],
                                borderWidth: 1,
                            }]
                        },
                        options: {
                            cutout: '60%',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                            }
                        }
                    });
                }).catch(function (errorConversao) {
                    console.log(errorConversao)
                })
        }).catch(function (erro) {
            console.log(erro)
        })

}
function ConsultaAgenda() {
    var email = sessionStorage.getItem("EMAIL_DO_LOGADO")
    fetch('/usuarios/agenda', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email
        })
    })
        .then(function (resposta) {
            resposta.json()
                .then(function (respostaConversao) {
                    console.log(respostaConversao)
                    for (let i = 0; i < respostaConversao.length; i++) {
                        listaAgenda.innerHTML += `
                            <div class="item-agenda">
                                <strong>${respostaConversao[i].DATA_SAIDA.slice(0, 10)}</strong> - ${respostaConversao[i].NOME_CLIENTE} - ${respostaConversao[i].BAIRRO}, ${respostaConversao[i].ESTADO}
                            </div>
                          `;
                    }
                }).catch(function (errorConversao) {
                    console.log(errorConversao)
                })
        }).catch(function (erroResposta) {
            console.log(erroResposta)
        })

}

window.onload = function () {
    ConsultaKpiFretes()
    ConsultaKpiLucroLiquido()
    ConsultaKpiDistancia()
    ConsultaKpiManutencao()
    ConsultaGraficoSemestre()
    ConsultaGraficoDonnut()
    ConsultaAgenda()
}
