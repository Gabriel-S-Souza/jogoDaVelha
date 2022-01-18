var logDeInformacoes = document.querySelector('.log-de-informacoes')
var campos = document.querySelectorAll(".campo")
var player1 = { boleano: true, listaIds: [], nome: "Player 1" }
var player2 = { boleano: false, listaIds: [], nome: "Player 2" }

function setLogDeInformacoes() {
    logDeInformacoes.classList.remove("animateWin")
    logDeInformacoes.classList.remove("animateGameOver")
    if (player1.boleano && !player2.boleano) {
        logDeInformacoes.textContent = player1.nome + " joga agora"
    } else if (!player1.boleano && player2.boleano) {
        logDeInformacoes.textContent = player2.nome + " joga agora"
    }
}

var rodaJogo = (e) => {
    var area = e.target
    area.removeEventListener("click", rodaJogo)
    if (player1.boleano && !player2.boleano) {
        area.classList.add('adicionaX')
        let id = parseInt(area.id)
        player1.listaIds.push(id)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = winValidation(player1)
        if (gameOver ? reinicia() : setLogDeInformacoes()) {}
    } else if (!player1.boleano && player2.boleano) {
        area.classList.add('adicionaO')
        let id = parseInt(area.id)
        player2.listaIds.push(id)
        player1.boleano = !player1.boleano
        player2.boleano = !player2.boleano
        let gameOver = winValidation(player2)
        if (gameOver ? reinicia() : setLogDeInformacoes()) {}
    }
}

function winValidation(player) {
    let playerWin
    const possiveisVitorias = [
        [0, 1, 2], [0, 3, 6],[0, 4, 8],[2, 4, 6],
        [2, 5, 8],[3, 4, 5],[6, 7, 8],[1, 4, 7]
    ]
    possiveisVitorias.forEach(function(possivelVitoria) {
        let count = 0
        possivelVitoria.forEach(function(id) {
            if (player.listaIds.includes(id)) {
                count++
                if (count == 3) {
                    animateWinner(...possivelVitoria, player)
                    playerWin = true
                }
            }
        })
    })
    return playerWin ?? isGameOver()
}

function isGameOver() {
    if (player1.listaIds.length + player2.listaIds.length == 9) {
        logDeInformacoes.textContent = "Game Over"
        logDeInformacoes.classList.add("animateGameOver")
        return true
    } else return false
}

campos.forEach(function(campo) {
    campo.addEventListener("click", rodaJogo)
})

function reinicia() {
    campos.forEach(function(campo) {
        campo.removeEventListener("click", rodaJogo)
    })
    setTimeout(function() {
        setLogDeInformacoes()
        campos.forEach(function(campo) {
            campo.classList.remove("adicionaX")
            campo.classList.remove("adicionaXred")
            campo.classList.remove("adicionaO")
            campo.classList.remove("adicionaOred")
            campo.addEventListener("click", rodaJogo)
            player1.listaIds = []
            player2.listaIds = []
        })
    }, 1500)
}

function animateWinner(i, j, k, player) {
    let camposVitoria = [campos[i], campos[j], campos[k]]
    camposVitoria.forEach(function(campo) {
        let hasX = campo.className.includes("adicionaX")
        campo.classList.remove(hasX ? "adicionaX" : "adicionaO")
        campo.classList.add(hasX ? "adicionaXred" : "adicionaOred")
    })
    logDeInformacoes.textContent = player.nome + " venceu"
    logDeInformacoes.classList.add("animateWin")
}

setLogDeInformacoes()