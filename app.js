var express = require('express')
var app = express()
var server = require('http').Server(app)

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/client/index.html')
})
app.use('/client', express.static(__dirname + '/client'))

server.listen(2000)
console.log('Server Started.')

/** SERVER CODE STARTS HERE */

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

// Keeps track of each player's status such as their name, cards in their hand, etc.
var PLAYER_LIST = {}

io.sockets.on('connection', socket => {
    console.log('Socket Connection has been made.')
    socket.id = Math.random()
    socket.username = ''
    socket.gamecode = ''
    PLAYER_LIST[socket.id] = socket

    socket.emit('serverMessage', {
        msg: 'Welcome!'
    })

    socket.on('init-connection', data => {
        console.log('New Player Connected:')
        console.log(data.userName + ' joined with game code ' + data.gameCode)
        socket.username = data.userName
        socket.gamecode = data.gameCode
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
            gamecode: socket.gamecode
        })
    }
}, 1000/n)
