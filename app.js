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
io.sockets.on('connection', socket => {
    console.log('Socket Connection has been made.')

    socket.emit('serverMessage', {
        msg: 'Welcome!'
    })
})