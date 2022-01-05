// This file is the code for the server. All server code goes in this file only! The server will talk to each player.

// This is the port that the server will run on. Change it by changing this declaration. But keep it 2000 for now pls.
const PORT = 2000

// These are essentially imports. They are grabbing express for file communication and the others are declaring a simple websocket server.
var express = require('express')
var app = express()
var server = require('http').Server(app)

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/client/index.html')
})
app.use('/client', express.static(__dirname + '/client'))

server.listen(PORT)
console.log('Server Started.')

// Leave this alone
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

/** SERVER CODE STARTS HERE */


// Import the cards file for use on the server
var cards = require('./cards').cards
var shuffle = require('./cards').shuffle

// Keeps track of each player's status such as their name, cards in their hand, etc. Format and description as follows:
/*
    .username = Username of the client that connects to the game server
    .gamecode = Game code that the user joins with. This server can handle about 900000 games at once, so the server needs
                to know what's going on in each game.
    .id = A unique identifier used for events such as reconnection. When we reconnect with the same game code and user, the id 
                is maintained so that the server knows that the most recent connection should receive all future events.
    .ishost = Boolean that determines the host of the game. When all players connect, the host hits the 'Start Game' button to trigger
                the start of a game.
    
*/

var PLAYER_LIST = {}

// This gets triggered whenever a new connection is made from the client
io.sockets.on('connection', socket => {
    console.log('Socket Connection has been made.')

    // Since the inital connection can't handle additional arguments, this is the next event that is emitted from each client immediately afterwards.
    socket.on('init-connection', data => {
        // This is the JavaScript object where we will store the data we need for the game in the socket object.
        socket.player = {
            id: 0.0,
            username: '',
            gamecode: 0,
            ishost: '',
            gameinprogress: false,
            hand: []
        }
        // Check if this is a reconnection based on game pin and username, first. 
        // We would then need to redirect the connection to this new socket and kill the old one.
        for (var i in PLAYER_LIST) {
            if (PLAYER_LIST[i].player.username == data.username && PLAYER_LIST[i].player.gamecode == data.gamecode) {
                console.warn(`Player ${data.username} reconnected from another device!`)
                socket.player.id = PLAYER_LIST[i].player.id
                var ishost = PLAYER_LIST[i].player.ishost
                delete PLAYER_LIST[i]
                socket.player.username = data.username
                socket.player.gamecode = data.gamenode
                socket.player.ishost = ishost
                PLAYER_LIST[i] = socket
                return
            }
        }

         // Check to see if game code already exists (although this is extremely rare, it's still good to check!)
         for (var i in PLAYER_LIST) {
            if (PLAYER_LIST[i].player.gamecode == data.gamecode && data.ishost) {
                socket.player.gamecode = Math.floor(100000 + Math.random() * 900000)
                console.warn(`The connecting player ${data.username} attempted to create a game with a game code that already is in progress. The game code will be changed to ${socket.player.gamecode} and sent back to the player.`)
                socket.emit('gamecodechange', {
                    newgamecode: socket.player.gameCode
                }) 
            }
        }
        // Check to see if unique id per player already exists (this is even rarer, but again it doesn't hurt to check!)
        for (var i in PLAYER_LIST) {
            if (PLAYER_LIST[i].player.id == socket.player.id) {
                socket.player.id = Math.random()
                console.warn(`The randomly generated id for player ${data.username} was found in the master player list. Changing their id to ${socket.player.id}.`)
            }
        }

        // If not already in player list, then we can assume this a new connection
        console.log('New Player Connected:')
        console.log('***' + data.username + ' joined with game code ' + data.gamecode + '***')
        socket.player.id = Math.random()
        socket.player.ishost = data.ishost
        socket.player.username = data.username
        socket.player.gamecode = data.gamecode
        PLAYER_LIST[socket.id] = socket
    })

    socket.on('startgame', () => {
        console.log('Received Start Game Request')
        let playerCount = 0
        for (var i in PLAYER_LIST) {
            if (PLAYER_LIST[i].player.gamecode == socket.player.gamecode) {
                PLAYER_LIST[i].player.gameinprogress = true
                playerCount++
            }
        }
        // Get number of cards and remove outstanding ones
        let deck = cards
        switch (playerCount) {
            case 2:
            case 4:
                deck = deck.filter(e => { return e.top != 10 && e.top != 9 })
                break

            case 3:
                deck = deck.filter(e => { return e.top != 10 })
                break

            case 5:
                break
            
            default:
                broadcast(socket.player.gamecode, 'Not enough or too many players!')
        }
        deck = shuffle(deck)
    
        let playerNumber = 0
        for (var i in PLAYER_LIST) {
            if (socket.player.gamecode == PLAYER_LIST[i].player.gamecode) {
                let cardsToGive = deck.splice(playerNumber * (deck.length / playerCount), ((playerNumber+1) * (deck.length / playerCount) - 1))
                PLAYER_LIST[i].player.hand = cardsToGive
                console.log({
                    name: PLAYER_LIST[i].player.username,
                    cards: cardsToGive
                })
            }
            playerNumber++
        }
    })
})

let broadcast = (gamecode, message) => {
    for (var i in PLAYER_LIST) {
        if (PLAYER_LIST[i].player.gamecode == gamecode) {
            PLAYER_LIST[i].emit('broadcast', {
                message: message
            })
        }
    }
}

/* This function gets called n times per second and is used to send any new information to clients that was updated from the above code
 * For Debugging purposes, this will be set to 1 time per second until final deployment.
 */
const n = 1
setInterval(() => {
    for (var i in PLAYER_LIST) {
        var socket = PLAYER_LIST[i]
        socket.emit('gamedata', {
            data: socket.player
        })
    }
}, 1000/n)

/*
 *  Debug only
 */
let printAllPlayers = () => {
    for (var i in PLAYER_LIST) {
        var socket = PLAYER_LIST[i]
        console.log(socket.player)
    }
}
