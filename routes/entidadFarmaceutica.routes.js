const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createEntidadFarmaceutica
    , updateEntidadFarmaceutica    
    , getAllEntidadFarmaceuticaFeature} = require('../controllers/entidadFarmaceutica.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newentidadfarmaceutica', createEntidadFarmaceutica)
router.post('/updateentidadfarmaceutica', updateEntidadFarmaceutica)
router.get('/entidadfarmaceutica', getAllEntidadFarmaceuticaFeature)

module.exports = router