const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createBancoSangre
    , updateBancoSangre    
    , getAllBancoSangreFeature} = require('../controllers/bancoSangre.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newbancosangre', createBancoSangre)
router.post('/updatebancosangre', updateBancoSangre)
router.get('/bancosangre', getAllBancoSangreFeature)

module.exports = router