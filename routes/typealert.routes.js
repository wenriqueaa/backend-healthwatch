const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createTypeAlert, getAllTypeAlerts, getTypeAlertById, deleteTypeAlertById, updateTypeAlertById} = require('./../controllers/typealert.controller')

//traer el token
const { validateToken } = require('./../middlerwares/validateToken')

//validaciones para tipo de alerta
//pendiente agregar validaciones

//nuevo tipo alerta
router.post('/newtypealert', validateToken, createTypeAlert)

//buscar todos los tipos de alertas
router.get('/typealerts', validateToken, getAllTypeAlerts)

//buscar tipo de alerta por el id
router.get('/typealert/:id', validateToken, getTypeAlertById)

//Borrar tipo de alerta por el id
router.delete('/deletetypealert/:id', validateToken,  deleteTypeAlertById)

//modificar tipo de alerta por el id
router.put('/updatetypealert/:id', validateToken,  updateTypeAlertById)

module.exports = router