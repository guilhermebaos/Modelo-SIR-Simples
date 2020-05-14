// Selecionar os Sliders
let infVelSlider = document.getElementById('inf')
let recVelSlider = document.getElementById('rec')

//Selecionar os parágrafos
let infResp = document.getElementById('infValue')
let recResp = document.getElementById('recValue')

// Selecionar o canvas para desenhar os gráficos
let simplesSIR = document.getElementById('simplesSIR').getContext('2d')



// Obter os Valores e mostrá-los, através de Event Listeners
infVelSlider.oninput = function atualizarInf() {
    let infVel = infVelSlider.value / 10
    infResp.innerHTML = `${infVel}`
    atualizarSIR()
}

recVelSlider.oninput = function atualizarRec() {
    let recVel = recVelSlider.value / 100
    recResp.innerHTML = `${recVel}`
    atualizarSIR()
}



// Atualizar o Gráfico
function atualizarSIR() {
    // Obter os arrays com as percentagens
    let allDeltas = deltas()
    let xTempo = allDeltas[0]
    let dataSus = allDeltas[1]
    let dataInf = allDeltas[2]
    let dataRec = allDeltas[3]
    
    // Criar o gráfico
    let graSimplesSIR = new Chart(simplesSIR, {
        type: 'line',
        data: {
            labels: xTempo,
            datasets: [
                { 
                    data: dataSus,
                    label: 'População Suscétivel',
                    borderColor: 'blue',
                    fill: false
                },
                {
                    data: dataInf,
                    label: 'População Infetada',
                    borderColor: 'red',
                    fill: false
                },
                {
                    data: dataRec,
                    label: 'População Removida',
                    borderColor: 'grey',
                    fill: true
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '%'
                            }
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
    let rec = 0

    let xTempo = []
    let dataSus = []
    let dataInf = []
    let dataRec = []

    let infVel = infVelSlider.value / 10
    let recVel = recVelSlider.value / 100
    let resol = 0.4


    // Calcular as derivadas por time-step
    for(let t = tempo; t < tempo_max; t++ ) {

        deltaSus = (-infVel * sus * inf) * resol
        deltaInf = (infVel * sus * inf - recVel * inf) * resol
        deltaRec = (recVel * inf) * resol

        sus += deltaSus
        inf += deltaInf
        rec += deltaRec

        xTempo.push(t)
        dataSus.push(sus * 100)
        dataInf.push(inf * 100)
        dataRec.push(rec * 100)

        if (deltaSus >= -0.00001 && deltaInf <= 0.00001 && t > 30) {
            break
        }
    }

    return [xTempo, dataSus, dataInf, dataRec]
}

window.onload = atualizarSIR
