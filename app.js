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

/** SERVER CODE STARTS HERE */

// Leave this alone
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

// Keeps track of each player's status such as their name, cards in their hand, etc. Format and description as follows:
/*
    .username = Username of the client that connects to the game server
    .gamecode = Game code that the user joins with. This server can handle about 900000 games at once, so the server needs
                to know what's going on in each game.
    .id = A unique identifier used for events such as reconnection. When we reconnect with the same game code and user, the id 
                is maintained so that the server knows that the next connection should receive all future events.
    .ishost = Boolean that determines the host of the game. When all players connect, the host hits the 'Start Game' button to trigger
                the start of a game.
    
*/
var PLAYER_LIST = {}

// This gets triggered whenever a new connection is made from the client
io.sockets.on('connection', socket => {
    console.log('Socket Connection has been made.')

    //Since the inital connection can't handle additional arguments, this is the next event that is emitted immediately afterwards.
    socket.on('init-connection', data => {
        // Check if this is a reconnection based on game pin and username, first. 
        // We would then need to redirect the connection to this new socket and kill the old one.
        for (var i in PLAYER_LIST) {
            if (PLAYER_LIST[i].username == data.userName && PLAYER_LIST[i].gamecode == data.gameCode) {
                console.info('Player Reconnected at another device!')
                socket.id = PLAYER_LIST[i].id
                var ishost = PLAYER_LIST[i].ishost
                delete PLAYER_LIST[i]
                socket.username = data.userName
                socket.gamecode = data.gameCode
                socket.ishost = ishost
                PLAYER_LIST[i] = socket
                return
            }
        }
        // If not already in player list, then we can assume this a new connection
        console.log('New Player Connected:')
        console.log('***' + data.userName + ' joined with game code ' + data.gameCode + '***')
        socket.id = Math.random()
        socket.ishost = data.ishost
        socket.username = data.userName
        socket.gamecode = data.gameCode
        PLAYER_LIST[socket.id] = socket
    })
})

/*This function gets called n times per second and is used to send any new information to clients that was updated from the above code
 * For Debugging purposes, this will be set to 1 time per second until final deployment
 */
const n = 1
setInterval(() => {
    for (var i in PLAYER_LIST) {
        var socket = PLAYER_LIST[i]
        socket.emit('gamedata', {
            username: socket.username,
            gamecode: socket.gamecode,
            ishost: socket.ishost
        })
    }
}, 1000/n)
