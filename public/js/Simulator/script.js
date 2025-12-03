function calcular() {

    if (input_distancia.value === "" ||
        input_litro_km.value === "" ||
        input_preco_litro.value === "") {

        resultado_final.innerHTML = `<br>Preencha todos os campos para calcular.`;
        return;
    }

    var distancia = Number(input_distancia.value);
    var autonomia = Number(input_litro_km.value);
    var precoLitro = Number(input_preco_litro.value);

    var gastoLitroKm = 1 / autonomia;
    var litrosTotais = distancia * gastoLitroKm;
    var custoTotal = litrosTotais * precoLitro;

    var litrosIdaVolta = litrosTotais * 2;
    var custoIdaVolta = custoTotal * 2;

    var custoKm = custoTotal / distancia;

    resultado_final.innerHTML = `
        <br><b>Resumo do Frete</b><br><br>

        <b>Distância:</b> ${distancia} km<br>
        <b>Autonomia do caminhão:</b> ${autonomia.toFixed(2)} km/l<br>
        <b>Consumo médio real:</b> ${gastoLitroKm.toFixed(4)} L/km<br><br>

        <b>Diesel necessário (ida):</b> ${litrosTotais.toFixed(2)} litros<br>
        <b>Custo do diesel (ida):</b> R$ ${custoTotal.toFixed(2)}<br><br>

        <b>Diesel necessário (ida e volta):</b> ${litrosIdaVolta.toFixed(2)} litros<br>
        <b>Custo total (ida e volta):</b> R$ ${custoIdaVolta.toFixed(2)}<br><br>

        <b>Custo médio por KM:</b> R$ ${custoKm.toFixed(4)} por km<br><br>

        <b>Observações:</b><br>
        - Os valores são aproximados e variam conforme peso, vento, relevo e tipo de combustível.<br>
    `;
}
