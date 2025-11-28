function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    if (emailVar == "" || senhaVar == "") {
        mensagem_erro.innerHTML = "Campos em branco não são válidos";
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        EMAILSESSAO = sessionStorage.setItem("EMAIL_DO_LOGADO", emailVar)
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                var nome = json[1].resultadoAutenticar[0].nomeCompleto;
                console.log(nome);
                var fkCaminhao = json[1].resultadoAutenticar[0].idCaminhao;
                sessionStorage.setItem("ID_CAMINHAO", fkCaminhao)
                console.log(`${fkCaminhao} CAMINHAO LOGIN`);
                console.log(`${nome} NOME LOGIN`);
                nome = sessionStorage.setItem("NOME_DO_LOGADO", nome)
                console.log('redireciona ai')
                window.location.href = "../Dashboard/index.html";
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            mensagem_erro.innerHTML = "Usuario ou Senha incorretos!"
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

function sumirMensagem() {
    responseInput.style.display = "none"
}
