const jwt = require('jsonwebtoken')

//funcion encargada de generar un token
const generateToken = (userData = {}) => {
    //recibir la data del usuario en userData
    try {
        //de acuerdo al conformacion del paquete jwt, la informacion del token
        const payload = { userData }
        //usar la variable de entorno
        const secret = process.env.SECRET_KEY
        const token = jwt.sign(payload, secret, {
            //condiciones adicionales al token
            expiresIn: '3h'
        })

        //antes de un return dejar un espacio codigo limpio
        return token
    } catch(error) {
        console.log(error)

        return false
    }
}

module.exports = {
    generateToken
}