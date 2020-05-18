// Selecionar os Sliders
let infTaxaSlider = document.getElementById('inf')
let remTaxaSlider = document.getElementById('rem')

//Selecionar os parágrafos
let infResp = document.getElementById('infValue')
let remResp = document.getElementById('remValue')

// Selecionar a Div onde vão estar os gráficos
let divSimplesSIR = document.getElementById('div-simplesSIR')


// Obter os Valores e mostrá-los, através de Event Listeners
infTaxaSlider.oninput = function atualizarInf() {
    let infTaxa = infTaxaSlider.value / 10
    infResp.innerHTML = `${infTaxa.toFixed(2)}`

    canvasSIR = document.getElementById('simplesSIR')
    divSimplesSIR.removeChild(canvasSIR)
    atualizarSIR()
}

remTaxaSlider.oninput = function atualizarRem() {
    let remTaxa = remTaxaSlider.value / 100
    remResp.innerHTML = `${remTaxa.toFixed(2)}`

    canvasSIR = document.getElementById('simplesSIR')
    divSimplesSIR.removeChild(canvasSIR)
    atualizarSIR()
}


// Função para arredondar valores (PODE SER OTIMIZADA/ REMOVIDA)
function arredondar(num=0, casas=1) {
    let arredondado = (Math.round(num * (10 ** casas)) / (10 ** casas)).toFixed(casas)
    return arredondado
}

// Atualizar o Gráfico
function atualizarSIR() {
    canvasSIR = document.createElement('canvas')

    canvasSIR.setAttribute('id', 'simplesSIR')
    canvasSIR.setAttribute('width', '400')
    canvasSIR.setAttribute('height', '200')

    divSimplesSIR.appendChild(canvasSIR)


    // Obter os arrays com as percentagens
    let allDeltas = deltas()
    let xTempo = allDeltas[0]
    let dataSus = allDeltas[1]
    let dataInf = allDeltas[2]
    let dataRem = allDeltas[3]
    
    // Criar o gráfico
    let graSimplesSIR = new Chart(canvasSIR, {
        type: 'line',
        data: {
            labels: xTempo,
            datasets: [
                { 
                    data: dataSus,
                    label: 'Suscétiveis ',
                    borderColor: 'blue',
                    fill: false
                },
                {
                    data: dataInf,
                    label: 'Infetados ',
                    borderColor: 'red',
                    fill: false
                },
                {
                    data: dataRem,
                    label: 'Removidos ',
                    borderColor: 'grey',
                    fill: true
                }
            ]
        },
        options: {
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Tempo'
                        }
                    }
                ], 
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Número de Pessoas'
                        }
                    }
                ]
            }
        }
    })
}


// Calcular a variação de cada grupo por time-step
function deltas() {
    // Declarar variáveis para o cálculo da percentagem da população que está em cada grupo
    let tempo = 0
    let tempo_max = 200
    let sus = 0.999
    let inf = 1 - sus
    let rem = 0

    let xTempo = []
    let dataSus = []
    let dataInf = []
    let dataRem = []

    let infTaxa = infTaxaSlider.value / 10
    let remTaxa = remTaxaSlider.value / 100
    let resol = 0.3


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++ ) {

        // Variações de cada um dos grupos por time-step
        deltaSus = (-infTaxa * sus * inf) * resol
        deltaInf = (infTaxa * sus * inf - remTaxa * inf) * resol
        deltaRem = (remTaxa * inf) * resol

        // Valor atual da percentagem da população em cada grupo
        sus += deltaSus
        inf += deltaInf
        rem += deltaRem

        // Adição aos arrays dos valores calculados, arredondados e multiplicados por 1000
        let arredRem = arredondar(rem * 1000, 0)
        let arredInf = arredondar(inf * 1000, 0)
        let arredSus = 1000 - arredInf - arredRem

        xTempo.push(t)
        dataSus.push(arredSus)
        dataInf.push(arredInf)
        dataRem.push(arredRem)

        if (deltaSus >= -0.001 && deltaRem <= 0.001 && t > 30) {
            break
        }
    }

    return [xTempo, dataSus, dataInf, dataRem]
}

window.onload = atualizarSIR
