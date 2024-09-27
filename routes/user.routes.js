const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const { createUser, 
        loginUser, 
        checkIfExistsUser, 
        getUserById,
        updateUserById } = require('./../controllers/user.controller')


//traer el token para cuando es requerido
const { validateToken } = require('./../middlerwares/validateToken')

//validaciones para usuario
const users = require('./../middlerwares/validationBody')
const validatFields = require('./../middlerwares/validationResult')

//validaciones incluidas en el controler
router.post('/register', users, validatFields, createUser)


//Realizar login 
router.post('/login', loginUser)

//Verificar si existe en BD
router.get('/user', checkIfExistsUser)

//buscar usuario por el id
router.get('/user/:id',  validateToken, getUserById)

//modificar usuario por el id
router.put('/updateuser/:id',  validateToken, updateUserById)

module.exports = router

