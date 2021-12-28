let startGame = (username, gamecode) => {
    const socket = io('localhost:2000')
    socket.on("connect", socket => {
        console.log('Connected to Server!')
    })

    // Start Here
    socket.emit('init-connection', {
        userName: username,
        gameCode: gamecode
    })

    // Constantly listens to messages from server
    socket.on('serverMessage', data => {
        console.log('Message Received from Server: ' + data.msg)
    })

    // Constant feedback loop from server updating game information
    socket.on('gamedata', data => {
        console.log(data)
    })
}
