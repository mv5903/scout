let joinGame = () => {
    //DEBUG
    document.querySelector('#input-nickname').value = 'TESTPLAYER'
    //
    let username = document.querySelector('#input-nickname').value
    let gameCode = document.querySelector('#gameCodeInput').value

    console.log('Join Game Pressed')
    activateGamePage(username, gameCode)
}

let createGame = () => {
    //DEBUG
    document.querySelector('#input-nickname').value = 'TESTPLAYER'
    //
    let username = document.querySelector('#input-nickname').value
    let gameCode = Math.floor(100000 + Math.random() * 900000)

    console.log('Create Game Pressed')
    activateGamePage(username, gameCode)
}

let activateGamePage = (username, gameCode) => {
    document.querySelector('.welcome').style.display = 'none'
    document.querySelector('.game').style.display = 'block'

    document.querySelector('.game').style.display = 'block'
    document.querySelector('#game-code').textContent = 'Game Code: ' + gameCode
    document.querySelector('#game-username').textContent = 'Hi, ' + username
    startGame(username, gameCode)
}
