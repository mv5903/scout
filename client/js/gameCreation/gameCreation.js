let joinGame = () => {
    let username = document.querySelector('#input-nickname').value
    let gameCode = document.querySelector('#gameCodeInput').value



    console.log('Join Game Pressed')
    document.querySelector('.welcome').style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    startGame()
}

let createGame = () => {
    let username = document.querySelector('#gameCodeInput').value
    


    console.log('Create Game Pressed')
    document.querySelector('.welcome').style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    startGame()
}

let startGame = () => {
    const socket = io('localhost:2000')
    socket.on("connect", (socket) => {
        console.log('Connected to Server!')
    })

    socket.on('serverMessage', (data) => {
        console.log('Message Received from Server: ' + data)
    })
}

