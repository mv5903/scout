let joinGame = () => {
    let username = document.querySelector('#input-nickname').value
    let gameCode = parseInt(document.querySelector('#gameCodeInput').value)

    activateGamePage(username, gameCode, false)
}

let createGame = () => {
    let username = document.querySelector('#input-nickname').value
    let gameCode = Math.floor(100000 + Math.random() * 900000)

    activateGamePage(username, gameCode, true)
}

let activateGamePage = (username, gameCode, ishost) => {
    setVisible('.welcome', false)
    setVisible('.game', true)
    document.querySelector('#game-code').textContent = 'Game Code: ' + gameCode
    document.querySelector('#game-username').textContent = 'Hi, ' + username
    startGame(username, gameCode, ishost)
}
