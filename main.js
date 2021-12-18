var logDeInformacoes = document.querySelector('.log-de-informacoes')
var campos = document.querySelectorAll(".campo")
var player1 = {boleano: true, listaIds: [], nome: "Player1", status: ""}
var player2 = {boleano: false, listaIds: [], nome: "Player2", status: ""}
var gameOver = false

function setLogDeInformacoes(){
    logDeInformacoes.classList.remove("animateClass")
    if(player1.boleano && !player2.boleano){
        logDeInformacoes.textContent = player1.nome + " joga"
    }else if(!player1.boleano && player2.boleano){
        logDeInformacoes.textContent = player2.nome + " joga"
    } 
}

var rodaJogo = (e) =>{
    var area = e.target
    area.removeEventListener("click", rodaJogo)
    if(player1.boleano && !player2.boleano){
        area.classList.add('adicionaX')
        let id = parseInt(area.id)
        player1.listaIds.push(id)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = validaJogo(player1)
        if(gameOver ? reinicia() : setLogDeInformacoes()) {}
    }else if(!player1.boleano && player2.boleano){
        area.classList.add('adicionaO')
        let id = parseInt(area.id)
        player2.listaIds.push(id)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = validaJogo(player2)
        if(gameOver ? reinicia() : setLogDeInformacoes()) {}    
    }
}

function validaJogo(player){
    if(player.listaIds.includes(0) && player.listaIds.includes(1) && player.listaIds.includes(2)){
        colorWinner(0, 1, 2, player)
        return true 
    }else if(player.listaIds.includes(0) && player.listaIds.includes(3) && player.listaIds.includes(6)){
        colorWinner(0, 3, 6, player)
        return true
    }else if(player.listaIds.includes(0) &&  player.listaIds.includes(4) && player.listaIds.includes(8)){
        colorWinner(0, 4, 8, player)
        return true
    }else if(player.listaIds.includes(2) && player.listaIds.includes(4) && player.listaIds.includes(6)){
        colorWinner(2, 4, 6, player)
        return true
    }else if(player.listaIds.includes(2) && player.listaIds.includes(5) && player.listaIds.includes(8)){
        colorWinner(2, 5, 8, player)
        return true
    }else if(player.listaIds.includes(3) && player.listaIds.includes(4) && player.listaIds.includes(5)){
        colorWinner(3, 4, 5, player)
        return true
    }else if(player.listaIds.includes(6) && player.listaIds.includes(7) && player.listaIds.includes(8)){
        colorWinner(6, 7, 8, player)
        return true
    }else if(player.listaIds.includes(1) && player.listaIds.includes(4) && player.listaIds.includes(7)){
        colorWinner(1, 4, 7, player)
        return true
    }
    console.log(player.listaIds)
    if(player1.listaIds.length + player2.listaIds.length == 9){
        logDeInformacoes.textContent = "Game Over"
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
    player1.listaIds = []
    player2.listaIds = []
    setTimeout(function(){
        setLogDeInformacoes()
        rodaJogo
        campos.forEach(function(campo){
            campo.classList.remove("adicionaX")
            campo.classList.remove("adicionaXred")
            campo.classList.remove("adicionaO")
            campo.classList.remove("adicionaOred")
        })
    },1500)
    campos.forEach(function(campo){
        campo.removeEventListener("click", rodaJogo)
        campo.addEventListener("click", rodaJogo)
    })
}

function colorWinner(i, j, k, player){
    let camposVitoria = [campos[i], campos[j], campos[k]]
    camposVitoria.forEach(function(campo){
        if(campo.className.includes("adicionaX")){
            campo.classList.remove("adicionaX")
            campo.classList.add("adicionaXred")
        }if(campo.className.includes("adicionaO")){
            campo.classList.remove("adicionaO")
            campo.classList.add("adicionaOred")
        }
    })
    logDeInformacoes.textContent = player.nome + " venceu"
    logDeInformacoes.classList.add("animateClass")
}

setLogDeInformacoes()