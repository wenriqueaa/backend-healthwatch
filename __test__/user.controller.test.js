const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//traer el esquema a validar, usar la variable en mayuscula
const User = require('./../models/User')

describe('User Controller testing', () => {

    const email = 'test@test.com'
    const password = '#Clave1234'
    beforeEach(async () => {
        await User.deleteMany({})
    }, 10000)

    afterAll(async () => {
        await User.deleteMany({})
        await mongoose.connection.close()
    })

    it('Debería registrar un usuario nuevo si el correo no existe en la base de datos', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: password })
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('msg', `${email} created successfuly`)
    })

    it('No debería registrar un usuario si el correo existe', async () => {
        await new User({
            email: email,
            password: password
        }).save()

        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: password })

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('ok', false)
        expect(response.body).toHaveProperty('msg', `${email} is already exist in database`)
    })

    it('No deberia registrar un Usuario si el correo no es valido', async () => {

        const response = await request(app)
            .post('/api/register')
            .send({ email: '', password: password })

        console.log(response.text)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('ok', false)
        expect(response.body).toHaveProperty('msg.email.msg', 'Email is not valid!!')
    })

    it('No deberia registrar un usuario si la contraseña, no es fuerte', async () => {

        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: '' })

        console.log(response.text)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('ok', false)
        expect(response.body.msg.password).toHaveProperty('msg', 'Hey!! password must contain at least, uppercase, lowercase, numbers and characters')
    })

    it('Debería logear a un usuario con credenciales correctas', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await new User({
            email: email,
            password: hashedPassword
        })
        await user.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: user.email, password: password })
        // console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('msg', `${email}, Wellcome app healthwatch`)
        expect(response.body).toHaveProperty('token')
    })

    it('No debería loguear al usuario con un password incorrecto', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await new User({
            email: email,
            password: hashedPassword
        })
        await user.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: user.email, password: 'incorrecta' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('msg', 'incorrect password')
        expect(response.body).toHaveProperty('ok', false)
    })
    
    it('Deberia retornar un error de servidor al hacer el login', async () => {
        //para crear error en bd
        jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
            throw new Error('simulando error en bd')
        })
        const response = await request(app)
            .post('/api/login')
            .send({ email: email, password: password })

        expect(response.statusCode).toBe(500)
    })


})    