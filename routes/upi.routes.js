const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createUpi
    , updateUpi    
    , getAllUpiFeature} = require('../controllers/upi.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newupi', createUpi)
router.post('/updateupi', updateUpi)
router.get('/upi', getAllUpiFeature)

module.exports = router