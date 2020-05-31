// Selecionar os Sliders
let infTaxaSlider = document.getElementById('inf')
let remTaxaSlider = document.getElementById('rem')
let tempoImTaxaSlider = document.getElementById('tempoIm')

//Selecionar os parágrafos
let infResp = document.getElementById('infValue')
let remResp = document.getElementById('remValue')

// Selecionar os bolds onde vão estar os resultados finais
let maxInf = document.getElementById('concl-simplesSIRS-maxInf')
let totInf = document.getElementById('concl-simplesSIRS-totInf')

// Selecionar a Div onde vão estar os gráficos
let divSimplesSIRS = document.getElementById('div-simplesSIRS')


// Obter os Valores e mostrá-los, através de Event Listeners, removendo os canvas antigos
infTaxaSlider.oninput = function atualizarInf() {
    let infTaxa = infTaxaSlider.value / 20
    infResp.innerHTML = `${infTaxa.toFixed(2)}`

    canvasSimplesSIRS = document.getElementById('simplesSIRS')
    divSimplesSIRS.removeChild(canvasSimplesSIRS)

    atualizarSIRS()
}

remTaxaSlider.oninput = function atualizarRem() {
    let remTaxa = remTaxaSlider.value / 50
    remResp.innerHTML = `${remTaxa.toFixed(2)}`

    canvasSimplesSIRS = document.getElementById('simplesSIRS')
    divSimplesSIRS.removeChild(canvasSimplesSIRS)

    atualizarSIRS()
}

tempoImTaxaSlider.oninput = function atualizarTempoIm() {
    canvasSimplesSIRS = document.getElementById('simplesSIRS')
    divSimplesSIRS.removeChild(canvasSimplesSIRS)

    atualizarSIRS()
}




// Funções Gerais

// Função para arredondar valores (PODE SER OTIMIZADA/ REMOVIDA)
function arredondar(num=0, casas=1) {
    let arredondado = (Math.round(num * (10 ** casas)) / (10 ** casas)).toFixed(casas)
    return arredondado
}

// Máximo de um Array
function maxArray(arr) {
    let max = 0
    for(let pos in arr) {
        if (arr[pos] > max) {
            max = arr[pos]
        }
    }
    return max
}



// Funções Específicas

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

    let infTaxa = infTaxaSlider.value / 20
    let remTaxa = remTaxaSlider.value / 50
    let tempoImTaxa = (tempoImTaxaSlider.value / 50) ** -1
    let resol = 0.3

    let arredRem = 0
    let arredInf = 0
    let arredSus = 0


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++) {

        // Variações de cada um dos grupos por time-step
        deltaSus = (-infTaxa * sus * inf + tempoImTaxa * rem) * resol 
        deltaInf = (infTaxa * sus * inf - remTaxa * inf) * resol
        deltaRem = (remTaxa * inf - tempoImTaxa * rem) * resol

        // Valor atual da percentagem da população em cada grupo
        sus += deltaSus
        inf += deltaInf
        rem += deltaRem

        // Adição aos arrays dos valores calculados
        arredRem = Number(arredondar(rem * 1000, 0))
        arredInf = Number(arredondar(inf * 1000, 0))
        arredSus = Number(1000 - arredInf - arredRem)

        xTempo.push(t)
        dataSus.push(arredSus)
        dataInf.push(arredInf)
        dataRem.push(arredRem)

        if (deltaSus >= -0.001 && deltaRem <= 0.001 && t > 100) {
            break
        }
    }

    return [xTempo, dataSus, dataInf,  dataRem]
}


// Atualizar os Gráficos
function atualizarSIRS() {
    // Criar o canvas para o gráfico de linhas
    canvasSimplesSIRS = document.createElement('canvas')
    canvasSimplesSIRS.setAttribute('id', 'simplesSIRS')
    canvasSimplesSIRS.setAttribute('width', '400')
    canvasSimplesSIRS.setAttribute('height', '200')
    divSimplesSIRS.appendChild(canvasSimplesSIRS)

    // Obter os arrays com as percentagens
    let allPoints = deltas()
    let xTempo = allPoints[0]
    let dataSus = allPoints[1]
    let dataInf = allPoints[2]
    let dataRem = allPoints[3]

    // Obter os valores finais e guardá-los nas tag bold
    maxInf.innerHTML = `${maxArray(dataInf)}`
    totInf.innerHTML = `${dataRem.slice(-1)[0] + dataInf.slice(-1)[0]}`
    
    // Criar o gráfico de linhas
    let graSimplesSIRS = new Chart(canvasSimplesSIRS, {
        type: 'line',
        data: {
            labels: xTempo,
            datasets: [
                { 
                    data: dataSus,
                    label: 'Suscétiveis',
                    borderColor: 'blue',
                    fill: false
                },
                {
                    data: dataInf,
                    label: 'Infetados',
                    borderColor: 'red',
                    fill: false
                },
                {
                    data: dataRem,
                    label: 'Removidos',
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

window.onload = atualizarSIRS
