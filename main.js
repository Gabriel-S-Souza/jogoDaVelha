var logDeInformacoes = document.querySelector('.log-de-informacoes')
var campos = document.querySelectorAll(".campo")
var player1 = {boleano:true, listasIds: [], nome: "Player1", status: ""}
var player2 = {boleano:false, listasIds: [], nome: "Player2", status: ""}
var gameOver = false

function ligaJogo(player1, player2){
    if(gameOver == false){
        var jogador = rodaJogo(player1, player2)
    }
}

function rodaJogo(player1, player2){
    if(player1.boleano && !player2.boleano){
        logDeInformacoes.textContent = "Rodada: player 1"
        var resultado = marcaCampo(player1)
        player1.boleano = resultado.boleano
        player2.listasIds.push(...resultado.ids)
        var vitoria = verificaVitoria(player1)
        if(vitoria.status == "ganhou"){
            logDeInformacoes.style.backgroundColor = "green"
            logDeInformacoes.textContent = vitoria.nome + " venceu"
            //fazer aqui as demais ações de gameover
            gameOver = true
        }
        else{
            player1 = vitoria
            player2.boleano = true
            return
            rodaJogo(player1, player2)

        }
    }else if(!player1.boleano && player2.boleano){
        logDeInformacoes.textContent = "Rodada: player 2"
        var resultado2 = marcaCampo(player2)
        player2.boleano = resultado2.boleano
        player2.listasIds.push(...resultado.ids)
        var vitoria2 = verificaVitoria(player2)
        if(vitoria2.status == "ganhou"){
            logDeInformacoes.style.backgroundColor = "green"
            logDeInformacoes.textContent = vitoria2.nome + " venceu"
            //fazer aqui as demais ações de gameover
            gameOver = true
        }
        else{
            player2 = vitoria2
            player1.boleano = true
            rodaJogo(player1, player2)

        }
    }
}
var area = null

var addClass = (e) =>{
    area = e.target
    campos.forEach(function(campo){
        campo.removeEventListener("click", addClass)
    })
    console.log(area)

}


function marcaCampo (player){
    campos.forEach(function(campo){
        campo.addEventListener("click", addClass)

    })
}

function verificaVitoria(player){ 
    player.status = ""
    return player
}

ligaJogo(player1, player2)