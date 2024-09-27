const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createRedAdscritaSalud
    , updateRedAdscritaSalud    
    , getAllRedAdscritaSaludFeature} = require('../controllers/redAdscritaSalud.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newredadscritasalud', createRedAdscritaSalud)
router.post('/updateredadscritasalud', updateRedAdscritaSalud)
router.get('/redadscritasalud', getAllRedAdscritaSaludFeature)

module.exports = router