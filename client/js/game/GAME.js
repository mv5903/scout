// This file is responsible for communication with the server. It will listen (.on) for events
// and will broadcast (.emit) events to the server

let startGame = (username, gamecode, ishost) => {
    const socket = io('localhost:2000', {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': Infinity
    })

    socket.on("connect", socket => {
        console.info('Connected to Server!')
    })

    // Start Here
    socket.emit('init-connection', {
        username: username,
        gamecode: gamecode,
        ishost: ishost
    })

    document.querySelector('#start-game-button').addEventListener('click', () => socket.emit('startgame'))

    socket.on('gamecodechange', data => {
        document.querySelector('#game-code').textContent = 'Game Code: ' + data.newgamecode
        console.warn('Game Code has been changed to: ' + data.newgamecode)
    })

    socket.on('broadcast', () => {
        console.error('Fix player count!')
    })

    // Constant feedback loop from server updating game information
    socket.on('gamedata', data => {
        data = data.data

        console.group('Player Packet Received:')
        console.log(data)
        console.groupEnd()

        // Fired when game is started by host
        if (data.gameinprogress) {
            HTML.setVisible('#game-waiting-for-host', false)
            HTML.setVisible('#start-game-button', false) 
            HTML.setVisible('.game-view', true) 
        }

        if (data.hand != [] && document.querySelector('.player-hand').firstChild) {
            let playerHand = document.querySelector('.player-hand')
            data.hand.forEach(card => {
                let cardToAdd = document.createElement('img')
                cardToAdd.setAttribute('src', photoToLink(card))
                cardToAdd.className = 'card'
                playerHand.append(cardToAdd)
            })
        }
    })
}