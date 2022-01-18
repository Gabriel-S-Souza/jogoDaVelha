var informationLog = document.querySelector('.log-de-informacoes')
var fields = document.querySelectorAll(".campo")
var player1 = { boolean: true, idList: [], name: "Player 1" }
var player2 = { boolean: false, idList: [], name: "Player 2" }

function setInformationLog() {
    informationLog.classList.remove("animateWin")
    informationLog.classList.remove("animateGameOver")
    if (player1.boolean && !player2.boolean) {
        informationLog.textContent = player1.name + " joga agora"
    } else if (!player1.boolean && player2.boolean) {
        informationLog.textContent = player2.name + " joga agora"
    }
}

var runGame = (e) => {
    var area = e.target
    area.removeEventListener("click", runGame)
    if (player1.boolean && !player2.boolean) {
        area.classList.add('adicionaX')
        let id = parseInt(area.id)
        player1.idList.push(id)
        player1.boolean = !player1.boolean
        player2.boolean = !player2.boolean
        let gameOver = winValidation(player1)
        if (gameOver ? reinicia() : setInformationLog()) {}
    } else if (!player1.boolean && player2.boolean) {
        area.classList.add('adicionaO')
        let id = parseInt(area.id)
        player2.idList.push(id)
        player1.boolean = !player1.boolean
        player2.boolean = !player2.boolean
        let gameOver = winValidation(player2)
        if (gameOver ? reinicia() : setInformationLog()) {}
    }
}

function winValidation(player) {
    let playerWin
    const possiveisVitorias = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 4, 6],
        [2, 5, 8], [3, 4, 5], [6, 7, 8], [1, 4, 7]
    ]
    possiveisVitorias.forEach(function(possivelVitoria) {
        let count = 0
        possivelVitoria.forEach(function(id) {
            if (player.idList.includes(id)) {
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
    if (player1.idList.length + player2.idList.length == 9) {
        informationLog.textContent = "Game Over"
        informationLog.classList.add("animateGameOver")
        return true
    } else return false
}

fields.forEach(function(field) {
    field.addEventListener("click", runGame)
})

function reinicia() {
    fields.forEach(function(field) {
        field.removeEventListener("click", runGame)
    })
    setTimeout(function() {
        setInformationLog()
        fields.forEach(function(field) {
            field.classList.remove("adicionaX")
            field.classList.remove("adicionaXred")
            field.classList.remove("adicionaO")
            field.classList.remove("adicionaOred")
            field.addEventListener("click", runGame)
            player1.idList = []
            player2.idList = []
        })
    }, 1500)
}

function animateWinner(i, j, k, player) {
    let fieldsVitoria = [fields[i], fields[j], fields[k]]
    fieldsVitoria.forEach(function(field) {
        let hasX = field.className.includes("adicionaX")
        field.classList.remove(hasX ? "adicionaX" : "adicionaO")
        field.classList.add(hasX ? "adicionaXred" : "adicionaOred")
    })
    informationLog.textContent = player.name + " venceu"
    informationLog.classList.add("animateWin")
}

setInformationLog()