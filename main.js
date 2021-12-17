var logDeInformacoes = document.querySelector('.log-de-informacoes')
var campos = document.querySelectorAll(".campo")
var player1 = {boleano:true, listasIds: [], nome: "Player1", status: ""}
var player2 = {boleano:false, listasIds: [], nome: "Player2", status: ""}
var gameOver = false

function ligaJogo(player1, player2){ //liga o jogo
    if(gameOver == false){
        var jogador = rodadas(player1, player2)
    }
}

function rodadas(player1, player2){ //o jogo roda aqui
    if(player1.boleano && !player2.boleano){
        logDeInformacoes.textContent = "Rodada: player 1"
        var resultado = marcaCampo(player1)
        player1.boleano = resultado.boleano
        Array.prototype.push.apply(player1.listasIds, resultado.ids)
        var vitoria = verificaVitoria(player1)
        if(vitoria.status == "ganhou"){
            logDeInformacoes.style.backgroundColor = "green"
            logDeInformacoes.textContent = vitoria.nome + " venceu"
            gameOver = true
        }
        else{
            ligaJogo(player1, player1)
            console.log(player1)
        }
    }
}


function marcaCampo (player){ // marca os espaços no jogo da velha e pega os respectivos ids
    player = {
        boleano: false,
        ids: [2, 0, 8, 7, 5]
    }
    return player
}

function verificaVitoria(player){ //Verifica nas listas dos players se um deles ganhou
    player.status = ""
    return player
}

ligaJogo(player1, player2)