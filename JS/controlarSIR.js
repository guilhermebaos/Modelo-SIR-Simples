// Selecionar os Sliders
let infTaxaSlider = document.getElementById('inf')
let remTaxaSlider = document.getElementById('rem')

let novo_infTaxaSlider = document.getElementById('novo_inf')
let novo_remTaxaSlider = document.getElementById('novo_rem')

let tempoSlider = document.getElementById('tempo')


//Selecionar os spans onde estão os valores dos sliders
let infResp = document.getElementById('infValue')
let remResp = document.getElementById('remValue')

let novo_infResp = document.getElementById('novo_infValue')
let novo_remResp = document.getElementById('novo_remValue')

let tempoResp = document.getElementById('tempoValue')


// Selecionar os bolds e italics onde vão estar os resultados finais
let maxInf = document.getElementById('concl-simplesSIR-maxInf')
let totInf = document.getElementById('concl-simplesSIR-totInf')

let novo_maxInf = document.getElementById('concl-controlarSIR-maxInf')
let novo_totInf = document.getElementById('concl-controlarSIR-totInf')

let tempoMaxInf = document.getElementById('concl-controlarTempoSIR-maxInf')
let tempoTotInf = document.getElementById('concl-controlarTempoSIR-totInf')


let maxInfComparar = document.getElementById('concl-controlarSIR-maxInfComparar')
let totInfComparar = document.getElementById('concl-controlarSIR-totInfComparar')

let tempoMaxInfComparar = document.getElementById('concl-controlarTempoSIR-maxInfComparar')
let tempoTotInfComparar = document.getElementById('concl-controlarTempoSIR-totInfComparar')


// Selecionar a Div onde vão estar os gráficos
let divSimplesSIR = document.getElementById('div-simplesSIR')
let divControlarSIR = document.getElementById('div-controlarSIR')
let divControlarTempoSIR = document.getElementById('div-controlarTempoSIR')


// Guardar os máximos para comparar
var maxInfCompararNum = 0
var totInfCompararNum = 0


// Obter os Valores e mostrá-los, através de Event Listeners, removendo os canvas antigos
infTaxaSlider.oninput = function atualizarInf() {
    let infTaxa = infTaxaSlider.value / 20
    infResp.innerHTML = `${infTaxa.toFixed(2)}`


    canvasSimplesSIR = document.getElementById('simplesSIR')            // Apagar os canvas
    divSimplesSIR.removeChild(canvasSimplesSIR)

    canvasControlarSIR = document.getElementById('controlarSIR')
    divControlarSIR.removeChild(canvasControlarSIR)

    canvasControlarTempoSIR = document.getElementById('controlarTempoSIR')
    divControlarTempoSIR.removeChild(canvasControlarTempoSIR)

    atualizarSIR()
}

remTaxaSlider.oninput = function atualizarRem() {
    let remTaxa = remTaxaSlider.value / 50
    remResp.innerHTML = `${remTaxa.toFixed(2)}`

    canvasSimplesSIR = document.getElementById('simplesSIR')
    divSimplesSIR.removeChild(canvasSimplesSIR)

    canvasControlarSIR = document.getElementById('controlarSIR')
    divControlarSIR.removeChild(canvasControlarSIR)

    canvasControlarTempoSIR = document.getElementById('controlarTempoSIR')
    divControlarTempoSIR.removeChild(canvasControlarTempoSIR)
    
    atualizarSIR()
}

novo_infTaxaSlider.oninput = function atualizarNovo_Inf() {
    let novo_infTaxa = novo_infTaxaSlider.value * 5
    novo_infResp.innerHTML = `${novo_infTaxa.toFixed(0)}%`

    canvasControlarSIR = document.getElementById('controlarSIR')
    divControlarSIR.removeChild(canvasControlarSIR)

    canvasControlarTempoSIR = document.getElementById('controlarTempoSIR')
    divControlarTempoSIR.removeChild(canvasControlarTempoSIR)

    atualizarControlarSIR()
}

novo_remTaxaSlider.oninput = function atualizarNovo_Rem() {
    let novo_remTaxa = novo_remTaxaSlider.value * 5
    novo_remResp.innerHTML = `${novo_remTaxa.toFixed(0)}%`

    canvasControlarSIR = document.getElementById('controlarSIR')
    divControlarSIR.removeChild(canvasControlarSIR)

    canvasControlarTempoSIR = document.getElementById('controlarTempoSIR')
    divControlarTempoSIR.removeChild(canvasControlarTempoSIR)
    
    atualizarControlarSIR()
}

tempoSlider.oninput = function atualizarTempo() {
    let tempo = tempoSlider.value
    tempoResp.innerHTML = `${tempo}`

    canvasControlarTempoSIR = document.getElementById('controlarTempoSIR')
    divControlarTempoSIR.removeChild(canvasControlarTempoSIR)
    
    atualizarControlarTempoSIR()
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
    let resol = 0.3

    let arredRem = 0
    let arredInf = 0
    let arredSus = 0


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++) {

        // Variações de cada um dos grupos por time-step
        deltaSus = (-infTaxa * sus * inf) * resol
        deltaInf = (infTaxa * sus * inf - remTaxa * inf) * resol
        deltaRem = (remTaxa * inf) * resol

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

        if (deltaSus >= -0.001 && deltaRem <= 0.001 && t > 30) {
            break
        }
    }

    return [xTempo, dataSus, dataInf, dataRem]
}


// Atualizar os Gráficos
function atualizarSIR() {
    // Criar o canvas para o gráfico de linhas
    canvasSimplesSIR = document.createElement('canvas')
    canvasSimplesSIR.setAttribute('id', 'simplesSIR')
    canvasSimplesSIR.setAttribute('width', '400')
    canvasSimplesSIR.setAttribute('height', '200')
    divSimplesSIR.appendChild(canvasSimplesSIR)

    // Obter os arrays com as percentagens
    let allPoints = deltas()
    let xTempo = allPoints[0]
    let dataSus = allPoints[1]
    let dataInf = allPoints[2]
    let dataRem = allPoints[3]

    // Obter os valores finais e guardá-los nas tag bold
    maxInfCompararNum = maxArray(dataInf)
    totInfCompararNum = dataRem.slice(-1)[0] + dataInf.slice(-1)[0]

    maxInf.innerHTML = `${maxInfCompararNum}`
    totInf.innerHTML = `${totInfCompararNum}`
    
    // Criar o gráfico de linhas
    let graSimplesSIR = new Chart(canvasSimplesSIR, {
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

    atualizarControlarSIR()
}


function deltasControlar() {
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
    let resol = 0.3

    // Há um problema aqui
    let novo_infTaxa = (novo_infTaxaSlider.value / 20) * infTaxa
    let novo_remTaxa = (novo_remTaxaSlider.value / 20) * remTaxa
    let novo_t = 20

    let arredRem = 0
    let arredInf = 0
    let arredSus = 0


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++) {

        // Variações de cada um dos grupos por time-step
        deltaSus = (-infTaxa * sus * inf) * resol
        deltaInf = (infTaxa * sus * inf - remTaxa * inf) * resol
        deltaRem = (remTaxa * inf) * resol

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

        if (deltaSus >= -0.001 && deltaRem <= 0.001 && t > 30) {
            break
        }

        if (t == novo_t) {
            infTaxa = novo_infTaxa
            remTaxa = novo_remTaxa
        }
    }

    return [xTempo, dataSus, dataInf, dataRem]

}


function atualizarControlarSIR() {
    // Criar o canvas para o gráfico de linhas
    canvasControlarSIR = document.createElement('canvas')
    canvasControlarSIR.setAttribute('id', 'controlarSIR')
    canvasControlarSIR.setAttribute('width', '400')
    canvasControlarSIR.setAttribute('height', '200')
    divControlarSIR.appendChild(canvasControlarSIR)

    // Obter os arrays com as percentagens
    let allPoints = deltasControlar()
    let xTempo = allPoints[0]
    let dataSus = allPoints[1]
    let dataInf = allPoints[2]
    let dataRem = allPoints[3]

    // Obter os valores finais e guardá-los nas tag bold
    let maxInfAgora = maxArray(dataInf)
    let totInfAgora = dataRem.slice(-1)[0] + dataInf.slice(-1)[0]

    novo_maxInf.innerHTML = `${maxInfAgora}`
    novo_totInf.innerHTML = `${totInfAgora}`

    maxInfComparar.innerHTML = `(-${((maxInfCompararNum - maxInfAgora) * 100 / maxInfCompararNum).toFixed(1)}%)`
    totInfComparar.innerHTML = `(-${((totInfCompararNum - totInfAgora) * 100 / totInfCompararNum).toFixed(1)}%)`


    
    // Criar o gráfico de linhas
    let graControlarSIR = new Chart(canvasControlarSIR, {
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

    atualizarControlarTempoSIR()
}


function deltasControlarTempo() {
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
    let resol = 0.3

    // Há um problema aqui
    let novo_infTaxa = (novo_infTaxaSlider.value / 20) * infTaxa
    let novo_remTaxa = (novo_remTaxaSlider.value / 20) * remTaxa
    let novo_t = Number(tempoSlider.value)

    let arredRem = 0
    let arredInf = 0
    let arredSus = 0


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++) {

        // Variações de cada um dos grupos por time-step
        deltaSus = (-infTaxa * sus * inf) * resol
        deltaInf = (infTaxa * sus * inf - remTaxa * inf) * resol
        deltaRem = (remTaxa * inf) * resol

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

        if (deltaSus >= -0.001 && deltaRem <= 0.001 && t > 30) {
            break
        }

        if (t == novo_t) {
            infTaxa = novo_infTaxa
            remTaxa = novo_remTaxa
        }
    }

    return [xTempo, dataSus, dataInf, dataRem]

}


function atualizarControlarTempoSIR() {
    // Criar o canvas para o gráfico de linhas
    canvasControlarTempoSIR = document.createElement('canvas')
    canvasControlarTempoSIR.setAttribute('id', 'controlarTempoSIR')
    canvasControlarTempoSIR.setAttribute('width', '400')
    canvasControlarTempoSIR.setAttribute('height', '200')
    divControlarTempoSIR.appendChild(canvasControlarTempoSIR)

    // Obter os arrays com as percentagens
    let allPoints = deltasControlarTempo()
    let xTempo = allPoints[0]
    let dataSus = allPoints[1]
    let dataInf = allPoints[2]
    let dataRem = allPoints[3]

    // Obter os valores finais e guardá-los nas tag bold
    let maxInfAgora = maxArray(dataInf)
    let totInfAgora = dataRem.slice(-1)[0] + dataInf.slice(-1)[0]

    tempoMaxInf.innerHTML = `${maxInfAgora}`
    tempoTotInf.innerHTML = `${totInfAgora}`

    tempoMaxInfComparar.innerHTML = `(-${((maxInfCompararNum - maxInfAgora) * 100 / maxInfCompararNum).toFixed(1)}%)`
    tempoTotInfComparar.innerHTML = `(-${((totInfCompararNum - totInfAgora) * 100 / totInfCompararNum).toFixed(1)}%)`


    
    // Criar o gráfico de linhas
    let graControlarTempoSIR = new Chart(canvasControlarTempoSIR, {
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



window.onload = atualizarSIR
