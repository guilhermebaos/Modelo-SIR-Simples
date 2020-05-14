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
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
