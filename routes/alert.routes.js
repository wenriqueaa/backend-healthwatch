
const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createAlert, getAllAlerts, getAlertById, deleteAlertById, updateAlertById, getAllAlertsByUserId} = require('./../controllers/alert.controller')

//traer el token
const { validateToken } = require('./../middlerwares/validateToken')

//validaciones para alertas
//pendiente agregar validaciones

//nueva alerta
router.post('/newalert', validateToken,  createAlert)

//traer todas las alertas
router.get('/alerts', validateToken,  getAllAlerts)

//buscar alerta por el id
router.get('/alert/:id', validateToken,  getAlertById)

//Borrar alerta por el id
router.delete('/deletealert/:id', validateToken,  deleteAlertById)

//modificar alerta por el id
router.put('/updatealert/:id', validateToken,  updateAlertById)

//traer todas las alertas para un usuario
router.get('/alertsuser/:userAlert', validateToken,  getAllAlertsByUserId)


module.exports = router

