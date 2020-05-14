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
    let infVel = infVelSlider.value
    infResp.innerHTML = `${infVel}`
    atualizarSIR()
}

recVelSlider.oninput = function atualizarRec() {
    let recVel = recVelSlider.value
    recResp.innerHTML = `${recVel}`
    atualizarSIR()
}

function atualizarSIR() {
    let infVel = infVelSlider.value
    let recVel = recVelSlider.value

    var myChart = new Chart(simplesSIR, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [{ 
                data: [1, 2, 4, 3, 6, 5, 7, 8, 9],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
              }]}
    })
}
