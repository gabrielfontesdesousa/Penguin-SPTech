// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuariosRoute");
var kpiFreteRouter = require("./src/routes/kpiFreteRoute")
var kpiLucroRouter = require("./src/routes/kpiLucroRoute")
var kpiDistanciaRouter = require("./src/routes/kpiDistanciaRoute");
var KpiManutencaoRouter = require("./src/routes/kpiManutencaoRoute")
var graficoSemestreRouter = require("./src/routes/graficoSemestreRoute")
var graficoDonutRouter = require('./src/routes/graficoDonutRoute');
var agendaRouter = require('./src/routes/agendaRoute');
var fretesRouter = require('./src/routes/fretesRoute');
var coletaRouter = require('./src/routes/coletaRoute')
var entregaRouter = require('./src/routes/entregaRoute')
var despesasRouter = require('./src/routes/despesasRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/kpi", kpiFreteRouter);
app.use("/kpi", kpiLucroRouter);
app.use("/kpi", kpiDistanciaRouter);
app.use("/kpi", KpiManutencaoRouter);
app.use("/grafico", graficoSemestreRouter);
app.use("/grafico", graficoDonutRouter);
app.use("/usuarios", agendaRouter);
app.use("/fretes", fretesRouter);
app.use('/coleta', coletaRouter);
app.use('/entrega', entregaRouter);
app.use('/despesas', despesasRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######
    \n\n\n
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
