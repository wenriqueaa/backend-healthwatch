const express = require('express')
const bodyParser = require('body-parser');
// en app tengo toda la funcionalidad de express

const app = express()

//Configurar el archivo manejo de las variables de entorno
const dotenv = require('dotenv')

//manejo peticiones 
const cors = require('cors')
//ingresa el path
const path = require('path')

const api = require('./routes/api.routes')

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('./db/config')
databaseConnect()


//Para que express entienda los archivos formato JSON
// app.use(express.json())
// Middleware to parse JSON with an increased limit (e.g., 20MB) 
app.use(bodyParser.json({ limit: '512mb' }));



//Para que express reconozca las urls
app.use(express.urlencoded({ extended: false }))

//organizando de cors
app.use(cors())


//para usar las ruta
app.use('/', api)

// se quita por que se organiza con otro archivo www
// //colocar a escuchar el servidor express
// app.listen(port, () => {
//     console.log(`Servidor conectado en el puerto ${port}`)
// })

//esto es para colocar en produccion la dis del frontend
// app.use('/', express.static(__dirname + '/dist/frontend-healthwatch/browser'))
// app.get('/*', (req, res, next) => {
//     res.sendFile(path.resolve(__dirname + '/dist/frontend-healthwatch/browser/index.html'))
// })

module.exports = app
