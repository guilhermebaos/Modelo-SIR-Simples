// Selecionar os Sliders
let infVelSlider = document.getElementById('inf')
let recVelSlider = document.getElementById('rec')

//Selecionar os parágrafos
let infResp = document.getElementById('infValue')
let recResp = document.getElementById('recValue')


// Obter os Valores e mostrá-los, através de Event Listeners
infVelSlider.oninput = function atualizarInf() {
    let infVel = infVelSlider.value
    infResp.innerHTML = `${infVel}`
}

recVelSlider.oninput = function atualizarRec() {
    let recVel = recVelSlider.value
    recResp.innerHTML = `${recVel}`
}
