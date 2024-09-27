
const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createIncident, getAllIncidents, getIncidentById, deleteIncidentById, updateIncidentById} = require('./../controllers/incident.controller')

//traer el token
const { validateToken } = require('./../middlerwares/validateToken')

//validaciones para incidencias
//pendiente agregar validaciones

//nueva incidencia
router.post('/newincident', validateToken,  createIncident)

//traer todas las incidentes
router.get('/incidents', getAllIncidents)

//buscar incidente por el id
router.get('/incident/:id',  getIncidentById)

//Borrar incidente por el id
router.delete('/deleteincident/:id', validateToken,  deleteIncidentById)

//modificar incidente por el id
router.put('/updateincident/:id', validateToken,  updateIncidentById)


module.exports = router

