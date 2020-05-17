// Selecionar os elementos da tabela
let sus = document.getElementById('susInfo')
let inf = document.getElementById('infInfo')
let rem = document.getElementById('remInfo')


// Criar uma variável que guarda o 'estado' da tabela
let novoTextoSus = false
let novoTextoInf = false
let novoTextoRem = false


function mudarTextoSus() {
    if (novoTextoSus) {
        sus.innerHTML = `A população Suscétivel diminui com uma rapidez relacionada com: 
                        O <b>Número de Infetados</b>, o <b>Número de Pessoas Suscetíveis</b> e a <b>Taxa de Infeção</b>.`
        novoTextoSus = false
    } else {
        sus.innerHTML = `<b>Mais Pessoas Suscetíveis</b> &rArr; Mais Pessoas Suscetíveis que irão ser Infetadas <br>
                        <b>Mais Infetados</b> &rArr; Mais Pessoas Suscetíveis que irão ser Infetadas <br>
                        <b>Maior Taxa de Infeção</b> &rArr; Mais Pessoas Suscetíveis que irão ser Infetadas`
        novoTextoSus = true
    }
}

function mudarTextoInf() {
    if (novoTextoInf) {
        inf.innerHTML = `O número de infetados varia de acordo com as mudanças nas populações Sucétivel e Removida:
                        <b>Quem deixa de estar Suscétivel passa a estar Infetado</b>, como descrito acima, e <b>quem foi Removido deixa de estar Infetado</b>, como descrito abaixo.`
        novoTextoInf = false
    } else {
        inf.innerHTML = `<b>Variação da População Infetada</b> &equals; &minus;(Variação da População Suscetível + Variação da População Removida)`
        novoTextoInf = true
    }
}

function mudarTextoRem() {
    if (novoTextoRem) {
        rem.innerHTML = `A população Removida aumenta a ritmo relacionado com:
                        O <b>Número de Infetados</b> e a <b>Taxa de Recuperação</b>.`
        novoTextoRem = false
    } else {
        rem.innerHTML = `<b>Mais Infetados</b> &rArr; Mais Infetados que irão ser Removidos <br>
                        <b>Maior Taxa de Recuperação</b> &rArr; Mais Infetados que irão ser Removidos`
        novoTextoRem = true
    }
}