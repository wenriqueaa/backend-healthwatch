const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const BancosSangre = require('./../models/BancoSangre')

describe('BancoSangre Controller testing', () => {
    //    msg: `Ya existe en base de datos con id: ${dataFound._id}`
    const dataFeatures = {
        type: "FeatureCollection", name: "bancosangre", crs: {
            type: "name", properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }, features: [{
            type: "Feature", properties: {
                OBJECTID: 0, id: 0, BANCO_DE_S: "NN", DIRECCION: "AK 00 #00 - 00", TELEFONOS: "0000000 Ext. 0000", codigo_loc: 0, geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }]
    }
    const dataNotFeatures = {
        type: "FeatureCollection"
        , name: "bancosangre"
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
            type: "Feature"
            , properties: {
                OBJECTID: 0
                , id: 0
                , BANCO_DE_S: "NN"
                , DIRECCION: "AK 00 #00 - 00"
                , TELEFONOS: "0000000 Ext. 0000"
                , codigo_loc: 0
                , geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }
        ]
    }
    beforeEach(async () => {
        await BancosSangre.deleteMany({})
    }, 10000)

    afterAll(async () => {
        await BancosSangre.deleteMany({})
        await mongoose.connection.close()
    })
    // Check createBancoSangre functionality
    const createBancoSangreCheck = true;
    if (createBancoSangreCheck) {
        it('Check createBancoSangre functionality status 201', async () => {
            const okExpect = true
            const msgExpect = `Banco Sangre creado exitosamente`
            const response = await request(app)
                .post('/api/newbancosangre')
                .send(dataFeatures)
            expect(response.statusCode).toBe(201)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check createBancoSangre functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/newbancosangre')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check createBancoSangre functionality status 400 not name = "bancosangre"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/newbancosangre')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })
        it('Check createBancoSangre functionality status 409 data Exists', async () => {
            await BancosSangre.deleteMany()
            const bancoSangre = await new BancosSangre(dataFeatures)
            bancoSangre.save()
            const statusCodeExpect = 409
            const okExpect = false
            const msgExpect = `Ya existe en base de datos con id: ${bancoSangre._id}`
            const response = await request(app)
                .post('/api/newbancosangre')
                .send(dataFeatures)
            expect(response.statusCode).toBe(statusCodeExpect)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)
        })

        // it('Check createBancoSangre functionality status 500 data Exists', async () => {
        //     const error = 'Database Error';
        //     const statusCodeExpect = 500;
        //     const okExpect = false;
        //     const msgExpect = `Por favor contactarse con soporte ${'\r\n' + error}`;
        //     jest.spyOn(BancosSangre, 'findOne').mockImplementationOnce(() => {
        //         throw new Error('Database Error');
        //     })
        //     // await BancosSangre.deleteMany({})

        //     const response = await request(app)
        //         .post('/api/newbancosangre')
        //         .send(dataFeatures)
        //     expect(response.statusCode).toBe(statusCodeExpect);

        //     // expect(response.body.ok).toBe(okExpect)
        //     // expect(response.body.msg).toBe(`${msgExpect}`)


        // })
    }
    const updateBancoSangreCheck = true;
    if (updateBancoSangreCheck) {
        it('Check updateBancoSangre functionality status 200', async () => {
            const bancoSangre = await new BancosSangre(dataFeatures)
            bancoSangre.save()
            const okExpect = true
            const msgExpect = `Bancos Sangre exitosamente sincronizado`

            const response = await request(app)
                .post('/api/updatebancosangre')
                .send(dataFeatures)
            expect(response.statusCode).toBe(200)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check updateBancoSangre functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/updatebancosangre')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check updateBancoSangre functionality status 400 not name = "bancosangre"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/updatebancosangre')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })

        // it('Check updateBancoSangre functionality status 500 data Exists', async () => {
        //     const error = 'Database Error';
        //     const statusCodeExpect = 500;
        //     const okExpect = false;
        //     const msgExpect = `Por favor contactarse con soporte ${'\r\n' + error}`;
        //     jest.spyOn(BancosSangre, 'findOne').mockImplementationOnce(() => {
        //         throw new Error('Database Error');
        //     })
        //     // await BancosSangre.deleteMany({})

        //     const response = await request(app)
        //         .post('/api/updatebancosangre')
        //         .send(dataFeatures)
        //     expect(response.statusCode).toBe(statusCodeExpect);

        //     // expect(response.body.ok).toBe(okExpect)
        //     // expect(response.body.msg).toBe(`${msgExpect}`)


        // })
    }
    
    it('Check getAllBancoSangreFeature functionality status 200', async () => {
        const bancoSangre = await new BancosSangre(dataFeatures)
        bancoSangre.save()
        const okExpect = true
        const msgExpect = `BancosSangre.Features encontrado`
        const response = await request(app)
            .get('/api/bancosangre')
        expect(response.statusCode).toBe(200)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })
    it('Check getAllBancoSangreFeature functionality status 400', async () => {
        const okExpect = false
        const msgExpect = `Database sin registros`
        const response = await request(app)
            .get('/api/bancosangre')
        expect(response.statusCode).toBe(400)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })


})    
