let joinGame = () => {
    let gameCode = document.querySelector('#input-nickname').value
    let username = document.querySelector('#gameCodeInput').value



    console.log('Join Game Pressed')
    // document.querySelector('.welcome').style.visibility = 'hidden';
    // document.querySelector('.game').style.visibility = 'visible';
    //startGame()
}

let createGame = () => {
    let username = document.querySelector('#gameCodeInput').value
    


    console.log('Create Game Pressed')
    // document.querySelector('.welcome').style.visibility = 'hidden';
    // document.querySelector('.game').style.visibility = 'visible';
    startGame()
}

let startGame = () => {
    const socket = io()
    socket.on("connect", (socket) => {
        console.log(socket.id)
        console.log('Connected to Host!')
    })
}

