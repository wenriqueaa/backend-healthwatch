const app = require('./../index')
const http = require('http')
const port = process.env.PORT

//hacer que este puerto se vaya para index
app.set('port', port)

const server = http.createServer(app)

server.listen(port)

server.on('error', () => {
    console.log('error conectando el server')
})

server.on('listening', () => {
    console.log('server on !!! !!!')
})