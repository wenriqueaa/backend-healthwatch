const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const ConsultoriosMedico = require('./../models/ConsultorioMedico')
const path = require('path')

describe('ConsultorioMedico Controller testing', () => {
    //    msg: `Ya existe en base de datos con id: ${dataFound._id}`
    const dataFeatures = {
        type: "FeatureCollection", name: "Cons", crs: {
            type: "name", properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }, features: [{
            type: "Feature", properties: {
                CONCODIGO : "NN",
                CONRSOCIAL: "NN",
                CONDIRECCI: "NN",
                CONTELEFON: "NN",
                CONCPRESTA: "NN",
                CPRE      : "NN",
                CNJURIDICA: "NN",
                CPERSONA  : "NN"
                , geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }]
    }
    const dataNotFeatures = {
        type: "FeatureCollection"
        , name: "Cons"
        , crs: {
            type: "name"
            , properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }
        , features: []
    }
    const dataDiferentName = {
        type: "FeatureCollection"
        , name: "XYZ"
        , crs: {
            type: "name"
            , properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }
        , features: [{
            type: "Feature", properties: {
                CONCODIGO : "NN",
                CONRSOCIAL: "NN",
                CONDIRECCI: "NN",
                CONTELEFON: "NN",
                CONCPRESTA: "NN",
                CPRE      : "NN",
                CNJURIDICA: "NN",
                CPERSONA  : "NN"
                , geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }
        ]
    }
    beforeEach(async () => {
        await ConsultoriosMedico.deleteMany({})
    }, 10000)

    afterAll(async () => {
        await ConsultoriosMedico.deleteMany({})
        await mongoose.connection.close()
    })
    // Check createConsultorioMedico functionality
    const createConsultorioMedicoCheck = true;
    if (createConsultorioMedicoCheck) {
        it('Check createConsultorioMedico functionality status 201', async () => {
            const okExpect = true
            const msgExpect = `Consultorio Medico creado exitosamente`
            const response = await request(app)
                .post('/api/newconsultoriomedico')
                .send(dataFeatures)
            expect(response.statusCode).toBe(201)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check createConsultorioMedico functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/newconsultoriomedico')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check createConsultorioMedico functionality status 400 not name = "Cons"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/newconsultoriomedico')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })
        it('Check createConsultorioMedico functionality status 409 data Exists', async () => {
            await ConsultoriosMedico.deleteMany()
            const consultorioMedico = await new ConsultoriosMedico(dataFeatures)
            consultorioMedico.save()
            const statusCodeExpect = 409
            const okExpect = false
            const msgExpect = `Ya existe en base de datos con id: ${consultorioMedico._id}`
            const response = await request(app)
                .post('/api/newconsultoriomedico')
                .send(dataFeatures)
            expect(response.statusCode).toBe(statusCodeExpect)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)
        })

        // it('Check createConsultorioMedico functionality status 500 data Exists', async () => {
        //     const error = 'Database Error';
        //     const statusCodeExpect = 500;
        //     const okExpect = false;
        //     const msgExpect = `Por favor contactarse con soporte ${'\r\n' + error}`;
        //     jest.spyOn(ConsultoriosMedico, 'findOne').mockImplementationOnce(() => {
        //         throw new Error('Database Error');
        //     })
        //     // await ConsultoriosMedico.deleteMany({})

        //     const response = await request(app)
        //         .post('/api/newconsultoriomedico')
        //         .send(dataFeatures)
        //     expect(response.statusCode).toBe(statusCodeExpect);

        //     // expect(response.body.ok).toBe(okExpect)
        //     // expect(response.body.msg).toBe(`${msgExpect}`)


        // })
    }
    const updateConsultorioMedicoCheck = true;
    if (updateConsultorioMedicoCheck) {
        it('Check updateConsultorioMedico functionality status 200', async () => {
            const consultorioMedico = await new ConsultoriosMedico(dataFeatures)
            consultorioMedico.save()
            const okExpect = true
            const msgExpect = `Consultorios Medico exitosamente sincronizado`

            const response = await request(app)
                .post('/api/updateconsultoriomedico')
                .send(dataFeatures)
            expect(response.statusCode).toBe(200)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check updateConsultorioMedico functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/updateconsultoriomedico')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check updateConsultorioMedico functionality status 400 not name = "Cons"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/updateconsultoriomedico')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })

        // it('Check updateConsultorioMedico functionality status 500 data Exists', async () => {
        //     const error = 'Database Error';
        //     const statusCodeExpect = 500;
        //     const okExpect = false;
        //     const msgExpect = `Por favor contactarse con soporte ${'\r\n' + error}`;
        //     jest.spyOn(ConsultoriosMedico, 'findOne').mockImplementationOnce(() => {
        //         throw new Error('Database Error');
        //     })
        //     // await ConsultoriosMedico.deleteMany({})

        //     const response = await request(app)
        //         .post('/api/updateconsultoriomedico')
        //         .send(dataFeatures)
        //     expect(response.statusCode).toBe(statusCodeExpect);

        //     // expect(response.body.ok).toBe(okExpect)
        //     // expect(response.body.msg).toBe(`${msgExpect}`)


        // })
    }
    
    it('Check getAllConsultorioMedicoFeature functionality status 200', async () => {
        const consultorioMedico = await new ConsultoriosMedico(dataFeatures)
        consultorioMedico.save()
        const okExpect = true
        const msgExpect = `ConsultoriosMedico.Features encontrado`
        const response = await request(app)
            .get('/api/consultoriomedico')
        expect(response.statusCode).toBe(200)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })

    it('Check getAllConsultorioMedicoFeature functionality status 400', async () => {
        const okExpect = false
        const msgExpect = `Database sin registros`
        const response = await request(app)
            .get('/api/consultoriomedico')
        expect(response.statusCode).toBe(400)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })

    // it('Check getAllConsultorioMedicoFeature functionality status 500', async () => {
    //     const okExpect = false
    //     const msgExpect = `getAllConsultorioMedicoFeature, Error en ConsultoriosMedico.Features, por favor contactar a soporte`
    //     const response = await request(app)
    //         .get('/api/consultoriomedico')
    //     expect(response.statusCode).toBe(500)
    //     expect(response.body.ok).toBe(okExpect)
    //     expect(response.body.msg).toBe(msgExpect)
    // })


})    
