const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createVacunaFiebre
    , updateVacunaFiebre    
    , getAllVacunaFiebreFeature} = require('../controllers/vacunaFiebre.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newvacunafiebre', createVacunaFiebre)
router.post('/updatevacunafiebre', updateVacunaFiebre)
router.get('/vacunafiebre', getAllVacunaFiebreFeature)

module.exports = router