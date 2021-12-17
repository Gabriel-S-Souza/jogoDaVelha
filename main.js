function playerOneAtivo(){
    var player = "Player 1"
    document.querySelector(".log-de-informacoes").textContent = player
    var getIds = []
    var campos = document.querySelectorAll(".campo")
    campos.forEach(function(campoClicado){
        campoClicado.addEventListener('click', addEventClick)
        addEventClick()
        getIds += this.id
        this.classList.add("adicionaX") 
        campos.forEach(function(campoClicado){
            campos.removeEventsListener('click', function(campoClicado){})
            })         
        })
    });
}

playerOneAtivo()