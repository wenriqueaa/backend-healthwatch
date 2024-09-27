const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createTransporteEspecialPaciente
    , updateTransporteEspecialPaciente    
    , getAllTransporteEspecialPacienteFeature} = require('../controllers/transporteEspecialPaciente.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newtransporteespecialpaciente', createTransporteEspecialPaciente)
router.post('/updatetransporteespecialpaciente', updateTransporteEspecialPaciente)
router.get('/transporteespecialpaciente', getAllTransporteEspecialPacienteFeature)

module.exports = router