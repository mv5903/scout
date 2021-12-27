let joinGame = () => {
    let gameCode = document.querySelector('#input-nickname').value
    let username = document.querySelector('#gameCodeInput').value



    console.log('Join Game Pressed')
    document.querySelector('.game').style.visibility = 'visible';
    document.querySelector('.welcome').remove()
}

let createGame = () => {
    let username = document.querySelector('#gameCodeInput').value
    

    
    console.log('Create Game Pressed')
    document.querySelector('.game').style.visibility = 'visible';
    document.querySelector('.welcome').remove()
}