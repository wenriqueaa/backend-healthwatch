const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createServicioTransfusionSanguinea
    , updateServicioTransfusionSanguinea    
    , getAllServicioTransfusionSanguineaFeature} = require('../controllers/servicioTransfusionSanguinea.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newserviciotransfusionsanguinea', createServicioTransfusionSanguinea)
router.post('/updateserviciotransfusionsanguinea', updateServicioTransfusionSanguinea)
router.get('/serviciotransfusionsanguinea', getAllServicioTransfusionSanguineaFeature)

module.exports = router