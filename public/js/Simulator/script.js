function calcular() {

    var distancia = Number(input_distancia.value);
    var gastoLitroKm = Number(input_litro_km.value);
    var precoLitro = Number(input_preco_litro.value);

    if (distancia == "" || gastoLitroKm == "" || precoLitro == "") {
        resultado_final.innerHTML = "<br>Preencha todos os campos para calcular.";
        return;
    }

    var litrosTotais = distancia * gastoLitroKm;
    var custoTotal = litrosTotais * precoLitro;

    var custoKm = custoTotal / distancia;
    var autonomia = 1 / gastoLitroKm;
    var litrosIdaVolta = litrosTotais * 2;
    var custoIdaVolta = custoTotal * 2;

    resultado_final.innerHTML =
        "<br><b>Resumo do Frete</b><br><br>" +

        "<b>• Distância:</b> " + distancia + " km<br>" +
        "<b>• Consumo médio do caminhão:</b> " + gastoLitroKm + " L/km<br>" +
        "<b>• Autonomia:</b> " + autonomia.toFixed(2) + " km por litro<br><br>" +

        "<b>• Diesel necessário (ida):</b> " + litrosTotais.toFixed(2) + " litros<br>" +
        "<b>• Custo do diesel (ida):</b> R$ " + custoTotal.toFixed(2) + "<br><br>" +

        "<b>• Diesel necessário (ida e volta):</b> " + litrosIdaVolta.toFixed(2) + " litros<br>" +
        "<b>• Custo total (ida e volta):</b> R$ " + custoIdaVolta.toFixed(2) + "<br><br>" +

        "<b>• Custo médio por KM:</b> R$ " + custoKm.toFixed(4) + " por km<br><br>" +

        "<b>• Observações:</b><br>" +
        "- Os valores são aproximados e variam conforme peso, vento, relevo e tipo de combustível.<br>" +
        "- Quanto maior a autonomia, menor o custo final do frete.<br><br>";
}
