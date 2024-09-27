//el nombre de la variable User debe coincidir con el nombre del archivo User.js
//User es el modelo
const User = require('./../models/User')
const bcrypt = require('bcrypt')
//trae la funcion generatetoken
const {generateToken} = require('./../middlerwares/jwtGenerate')

// registra un usuario en la app
const createUser = async (req, res) => {
    // desestructurar el schema
    const { email, password, userName, userRole } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({
            ok: false,
            msg: `${email} is already exist in database`
        })
        //algoritmo de encriptacion
        const salt = bcrypt.genSaltSync()

        const dbUser = new User({
            email: email,
            password: password,
            userName: userName,
            userRole: userRole
        })
        //accedemos al password para encriptarlo
        dbUser.password = bcrypt.hashSync(password, salt)
        //se graba el documento para User
        await dbUser.save()
        return res.status(201).json({
            ok: true,
            msg: `${email} created successfuly`
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json[{
            ok: false,
            msg: `createUser Please ontact to support`
        }]
    }
}

// permite logearse el usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        //validar el email
        const dbUser = await User.findOne({ email })
        console.log(dbUser)
        //si no encuentra email, salimos
        if (!dbUser) return res.status(400).json({
            ok: false,
            msg: 'User doesnt exist !!!'
        })
        //validar el password
        const validatePassword = bcrypt.compareSync(password, dbUser.password)
        //password no coincide
        if (!validatePassword) return res.status(400).json({
            ok: false,
            msg: 'incorrect password'
        })
        //generar el token
        const token = await generateToken(dbUser._id, dbUser.email)

        return res.status(200).json({
            ok: true,
            msg: `${dbUser.email}, Wellcome app healthwatch`,
            token: token,
            userId: dbUser._id,
            userName: dbUser.userName,
            userRole: dbUser.userRole
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'loginUser please contact to development team'
        })
    }
}

// determinar is existe un usuario en la app
const checkIfExistsUser = async (req, res) => {
    // recibir params	
    const email  = req.query.email
    console.log(email)
    try {
        const user = await User.findOne({ email: email })
        if (user) return res.status(200).json({
            ok: true,
            msg: `${email} is already exist in database`
        })
        return res.status(400).json({
            ok: false,
            msg: `${email} no yet in database`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json[{
            ok: false,
            msg: `checkIfExistsUser Please contact to support`
        }]
    }
}

// Buscar el Id del usuario
const getUserById = async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById({_id: id})
        if(!user) return res.status(404).json({
            ok:false,
            msg:`by getUserById, Not found User para ${id}`
        })       
        return res.status(200).json({
            ok:true,
            msg:'user with Id found',
            user: user
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'by getUserById, contact to support'
        })
    }
}

// modificar un Usuario por el id
const updateUserById = async(req, res) => {
    const { id } = req.params;
    const { email, password, userName, userRole } = req.body

    try {
        //algoritmo de encriptacion
        const salt = bcrypt.genSaltSync();

        const updateDataById = {};
        if(email) updateDataById.email = email;
        if(password) updateDataById.password = password;
        if(userName) updateDataById.userName = userName;
        if(userRole) updateDataById.userRole = userRole;
        console.log(userRole)
        console.log(updateDataById.userRole)
        //accedemos al password para encriptarlo
        updateDataById.password = bcrypt.hashSync(password, salt)
        
        console.log(updateDataById)
        const user = await User.findByIdAndUpdate(id, updateDataById)
        if (!user) return res.status(400).json({
            ok: false,
            msg: `updateUserById, user with email ${email}, is administrative: ${userRole}, not found by Id`
        })
        //valida la actualizacion
        const updateUser = await User.findById(id)
        return res.status(200).json({
            ok: true,
            msg: `User user with email ${email}, is administrative: ${userRole}, update sucessfuly`,
            User: updateUser       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'updateUserById, error updating, please contact to support'
        })
    }            
}



module.exports = {
    createUser,
    loginUser,
    checkIfExistsUser,
    getUserById,
    updateUserById
}