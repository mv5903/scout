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
        userName: username,
        gameCode: gamecode,
        ishost: ishost
    })

    // Constantly listens to messages from server
    socket.on('serverMessage', data => {
        console.info('Message Received from Server: ' + data.msg)
    })

    // Constant feedback loop from server updating game information
    socket.on('gamedata', data => {
        console.log(data)
    })
}
