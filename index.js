const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

io.sockets.on('connection', (socket) => {
    socket.on('username', (username) => {
        socket.username = username;
        io.emit('is_online', "<i>" + socket.username + " join the chat ! </i>")
    })
    socket.on('disconnect', () => {
        io.emit('is_online', "<i>" + socket.username + " left the chat ! </i>")
    })
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', "<strong>" + socket.username + "</strong> : " + msg)
    })
})

const server = http.listen(80)