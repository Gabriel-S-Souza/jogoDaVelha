var logDeInformacoes = document.querySelector('.log-de-informacoes')
var campos = document.querySelectorAll(".campo")
var player1 = {boleano: true, listaIds: [], nome: "Player1", status: ""}
var player2 = {boleano: false, listaIds: [], nome: "Player2", status: ""}
var gameOver = false

function setLogDeInformacoes(){
    if(player1.boleano && !player2.boleano){
        logDeInformacoes.textContent = player1.nome + " joga"
    }else if(!player1.boleano && player2.boleano){
        logDeInformacoes.textContent = player2.nome + " joga"
    } 
}

var rodaJogo = (e) =>{
    let area = e.target
    if(player1.boleano && !player2.boleano){
        area.classList.add('adicionaX')
        let id = parseInt(area.id)
        player1.listaIds.push(id)
        console.log(player1.listaIds)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = validaJogo()
        if(gameOver ? reinicia() : setLogDeInformacoes()) {}
    }else if(!player1.boleano && player2.boleano){
        area.classList.add('adicionaO')
        let id = parseInt(area.id)
        player2.listaIds.push(id)
        console.log(player2.listaIds)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = validaJogo()
        if(gameOver ? reinicia() : setLogDeInformacoes()) {}    
    }
}

function validaJogo(){
    if(player1.listaIds.length + player2.listaIds.length == 9){
        logDeInformacoes.textContent = "Game Over"
        console.log("Veio pra cá")
        return true
    }else{
        return false
    }
}

campos.forEach(function(campo){
    campo.addEventListener("click", rodaJogo)
})

function reinicia(){
    console.log("reinicia")
}

setLogDeInformacoes()