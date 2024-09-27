const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createEps, updateEps, getAllEpsFeature } = require('../controllers/eps.controller')

//validaciones incluidas en el controler
router.post('/neweps', createEps)
router.post('/updateeps', updateEps)
router.get('/eps', getAllEpsFeature)

module.exports = router