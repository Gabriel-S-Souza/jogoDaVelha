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
    var area = e.target
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
    if(player.listaIds.includes(0)){
        if(player.listaIds.includes(1) && player.listaIds.includes(2)){
            let camposVitoria = [campos[0], campos[1], campos[2]]
            camposVitoria.forEach(function(campo){
                if(campo.className.includes("adicionaX")){
                    campo.classList.remove("adicionaX")
                    campo.classList.add("adicionaXred")
                }else if(campo.className.includes("adicionaO")){
                    campo.classList.remove("adicionaO")
                    campo.classList.add("adicionaOred")
                }
            })
        }  
    }

    

    // let verificador1 = ids1.includes(0 && 1 && 2) || ids1.includes(3 && 4 && 5) || ids1.includes(6 && 7 && 8) ||  ids1.includes(0 && 3 && 6) || ids1.includes(1 && 4 && 7) || ids1.includes(2 && 5 && 8) || ids1.includes(0 && 4 && 8) || ids1.includes(2 && 4 && 6)
    // let verificador2 = ids2.includes(0 && 1 && 2) || ids2.includes(3 && 4 && 5) || ids2.includes(6 && 7 && 8) ||  ids2.includes(0 && 3 && 6) || ids2.includes(1 && 4 && 7) || ids2.includes(2 && 5 && 8) || ids2.includes(0 && 4 && 8) || ids2.includes(2 && 4 && 6)
    // console.log(verificador2)
    console.log(player.listaIds)
    if(player1.listaIds.length + player2.listaIds.length == 9){
        logDeInformacoes.textContent = "Game Over"
        console.log("validaJogo")
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
            campo.classList.remove("adicionaO")
        })
    },1500)
}

setLogDeInformacoes()