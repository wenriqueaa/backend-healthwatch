const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createIps
    , updateIps    
    , getAllIpsFeature} = require('../controllers/ips.controller')

//traer el token
const { validateToken } = require('../middlerwares/validateToken')


//validaciones incluidas en el controler
router.post('/newips', createIps)
router.post('/updateips', updateIps)
router.get('/ips', getAllIpsFeature)

module.exports = router