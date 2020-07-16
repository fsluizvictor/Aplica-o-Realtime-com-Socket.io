const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()

const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connect', socket => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

//parâmetros passados : endereço do servidoe, porta do servidor, função callback
server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
})