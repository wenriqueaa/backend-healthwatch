const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createConsultorioMedico
    , updateConsultorioMedico    
    , getAllConsultorioMedicoFeature} = require('../controllers/consultorioMedico.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newconsultoriomedico', createConsultorioMedico)
router.post('/updateconsultoriomedico', updateConsultorioMedico)
router.get('/consultoriomedico', getAllConsultorioMedicoFeature)

module.exports = router