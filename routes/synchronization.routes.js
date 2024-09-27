
const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {synchronization} = require('./../controllers/synchronization.controller')

//traer el token
// const { validateToken } = require('./../middlerwares/validateToken')

//synchronization
router.post('/synchronization',  synchronization)

module.exports = router

