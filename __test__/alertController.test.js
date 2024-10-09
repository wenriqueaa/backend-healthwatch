const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//traer el esquema a validar, usar la variable en mayuscula
const Alert = require('./../models/Alert')

describe('Alert Controller testing', () => {
    const AlertNew = { dateAlert, description, notificationSms, notificationEmail, frecuency, typeAlert, userAlert}

    const email = 'test@test.com'
    const password = '#Clave1234'
    beforeAll(async () => {
        await Alert.deleteMany({})
    }, 10000)

    afterAll(async () => {
        await Alert.deleteMany({})
        await mongoose.connection.close()
    })

    it('Debería registrar un alerta nueva si el correo no existe en la base de datos', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: password })
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('msg', `${email} created successfuly`)
    })

    it('No debería registrar un alerta si el correo existe', async () => {
        await new Alert({
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

    it('No deberia registrar un alerta si la contraseña, no es fuerte', async () => {

        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: '' })

        console.log(response.text)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('ok', false)
        expect(response.body.msg.password).toHaveProperty('msg', 'Hey!! password must contain at least, uppercase, lowercase, numbers and characters')
    })

    it('Debería logear a un alerta con credenciales correctas', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const alert = await new Alert({
            email: email,
            password: hashedPassword
        })
        await alert.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: alert.email, password: password })
        // console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('msg', `${email}, Wellcome app healthwatch`)
        expect(response.body).toHaveProperty('token')
    })

    it('No debería loguear al alerta con un password incorrecto', async () => {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const alert = await new Alert({
            email: email,
            password: hashedPassword
        })
        await alert.save()
        const response = await request(app)
            .post('/api/login')
            .send({ email: alert.email, password: 'incorrecta' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('msg', 'incorrect password')
        expect(response.body).toHaveProperty('ok', false)
    })
    
    it('Deberia retornar un error de servidor al hacer el login', async () => {
        //para crear error en bd
        jest.spyOn(Alert, 'findOne').mockImplementationOnce(() => {
            throw new Error('simulando error en bd')
        })
        const response = await request(app)
            .post('/api/login')
            .send({ email: email, password: password })

        expect(response.statusCode).toBe(500)
    })


})    