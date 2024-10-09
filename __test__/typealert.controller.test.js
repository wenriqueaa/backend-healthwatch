const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//traer el esquema a validar, usar la variable en mayuscula
const TypeAlert = require('./../models/TypeAlert')

describe('TypeAlert Controller testing', () => {
    const TypeAlertNew = {
        description:"Promocion y Prevencion"
    };

    const email = 'test@test.com'
    const password = '#Clave1234'
    beforeAll(async () => {
        await TypeAlert.deleteMany({})
    }, 10000)

    afterAll(async () => {
        await TypeAlert.deleteMany({})
        await mongoose.connection.close()
    })

    it('Debería registrar un typeAlerta nueva si el correo no existe en la base de datos', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: password })
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('msg', `${email} created successfuly`)
    })

    it('No debería registrar un typeAlerta si el correo existe', async () => {
        await new TypeAlert({
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

    it('No deberia registrar un typeAlerta si la contraseña, no es fuerte', async () => {

        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: '' })

        console.log(response.text)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('ok', false)
        expect(response.body.msg.password).toHaveProperty('msg', 'Hey!! password must contain at least, uppercase, lowercase, numbers and characters')
    })

    it('Debería logear a un typeAlerta con credenciales correctas', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const typeAlert = await new TypeAlert({
            email: email,
            password: hashedPassword
        })
        await typeAlert.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: typeAlert.email, password: password })
        // console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('msg', `${email}, Wellcome app healthwatch`)
        expect(response.body).toHaveProperty('token')
    })

    it('No debería loguear al typeAlerta con un password incorrecto', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const typeAlert = await new TypeAlert({
            email: email,
            password: hashedPassword
        })
        await typeAlert.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: typeAlert.email, password: 'incorrecta' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('msg', 'incorrect password')
        expect(response.body).toHaveProperty('ok', false)
    })
    
    it('Deberia retornar un error de servidor al hacer el login', async () => {
        //para crear error en bd
        jest.spyOn(TypeAlert, 'findOne').mockImplementationOnce(() => {
            throw new Error('simulando error en bd')
        })
        const response = await request(app)
            .post('/api/login')
            .send({ email: email, password: password })

        expect(response.statusCode).toBe(500)
    })


})    