const request = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const EntidadesFarmaceutica = require('../models/EntidadFarmaceutica')
// const path = require('path')

describe('EntidadFarmaceutica Controller testing', () => {
    jest.mock('./../models/EntidadFarmaceutica');  // Mock del modelo de Mongoose
    let mongoServer;
    // Agrupar Definition Data para uso
    //    msg: `Ya existe en base de datos con id: ${dataFound._id}`
    const dataFeatures = {
        type: "FeatureCollection", name: "EFar", crs: {
            type: "name", properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }, features: [{
            type: "Feature", properties: {
                ID: 0,
                UPZ: "NN",
                LOCALIDAD: "NN",
                RSOCIAL: "NN",
                DIRECCION: "NN",
                BARRIO: "NN",
                TELEFONO: "NN",
                DRO24HORAS: "NN",
                ENTREPORTA: "NN",
                TESTABLECI: "NN"
                , geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }]
    }
    const dataNotFeatures = {
        type: "FeatureCollection"
        , name: "EFar"
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
                ID: 0,
                UPZ: "NN",
                LOCALIDAD: "NN",
                RSOCIAL: "NN",
                DIRECCION: "NN",
                BARRIO: "NN",
                TELEFONO: "NN",
                DRO24HORAS: "NN",
                ENTREPORTA: "NN",
                TESTABLECI: "NN"
                , geometry: { type: "Point", coordinates: [-74.0893, 4.6732] }
            }
        }
        ]
    }

    beforeAll(async () => {
        await mongoose.connection.close();
        // Verifica si hay una conexión activa
        // if (mongoose.connection.readyState === 0) {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        // await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    });
    beforeEach(async () => {
        await EntidadesFarmaceutica.deleteMany({})
    }, 10000);

    afterAll(async () => {
        await mongoose.connection.close()
        await mongoose.disconnect();
        await mongoServer.stop();
    })
    // Check createEntidadFarmaceutica functionality
    const createEntidadFarmaceuticaCheck = true;
    if (createEntidadFarmaceuticaCheck) {
        it('Check createEntidadFarmaceutica functionality status 201', async () => {
            const okExpect = true
            const msgExpect = `Entidad Farmacéutica creado exitosamente`
            const response = await request(app)
                .post('/api/newentidadfarmaceutica')
                .send(dataFeatures)
            expect(response.statusCode).toBe(201)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check createEntidadFarmaceutica functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/newentidadfarmaceutica')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check createEntidadFarmaceutica functionality status 400 not name = "EFar"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/newentidadfarmaceutica')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })
        it('Check createEntidadFarmaceutica functionality status 409 data Exists', async () => {
            await EntidadesFarmaceutica.deleteMany()
            const entidadFarmaceutica = await new EntidadesFarmaceutica(dataFeatures)
            entidadFarmaceutica.save()
            const statusCodeExpect = 409
            const okExpect = false
            const msgExpect = `Ya existe en base de datos con id: ${entidadFarmaceutica._id}`
            const response = await request(app)
                .post('/api/newentidadfarmaceutica')
                .send(dataFeatures)
            expect(response.statusCode).toBe(statusCodeExpect)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)
        })
        
    }
    const updateEntidadFarmaceuticaCheck = true;
    if (updateEntidadFarmaceuticaCheck) {
        it('Check updateEntidadFarmaceutica functionality status 200', async () => {
            const entidadFarmaceutica = await new EntidadesFarmaceutica(dataFeatures)
            entidadFarmaceutica.save()
            const okExpect = true
            const msgExpect = `Entidades Farmacéuticas exitosamente sincronizado`

            const response = await request(app)
                .post('/api/updateentidadfarmaceutica')
                .send(dataFeatures)
            expect(response.statusCode).toBe(200)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(msgExpect)
        })

        it('Check updateEntidadFarmaceutica functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/updateentidadfarmaceutica')
                .send(dataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

        it('Check updateEntidadFarmaceutica functionality status 400 not name = "EFar"', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. No habilitado para documentos '${dataDiferentName.name}'`
            const response = await request(app)
                .post('/api/updateentidadfarmaceutica')
                .send(dataDiferentName)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body).toHaveProperty('msg', `${msgExpect}`)

        })

        // it('Check updateEntidadFarmaceutica functionality status 500 data Exists', async () => {
        //     const error = 'Database Error';
        //     const statusCodeExpect = 500;
        //     const okExpect = false;
        //     const msgExpect = `Por favor contactarse con soporte ${'\r\n' + error}`;
        //     jest.spyOn(EntidadesFarmaceutica, 'findOne').mockImplementationOnce(() => {
        //         throw new Error('Database Error');
        //     })
        //     // await EntidadesFarmaceutica.deleteMany({})

        //     const response = await request(app)
        //         .post('/api/updateentidadfarmaceutica')
        //         .send(dataFeatures)
        //     expect(response.statusCode).toBe(statusCodeExpect);

        //     // expect(response.body.ok).toBe(okExpect)
        //     // expect(response.body.msg).toBe(`${msgExpect}`)


        // })
    }

    it('Check getAllEntidadFarmaceuticaFeature functionality status 200', async () => {
        const entidadFarmaceutica = await new EntidadesFarmaceutica(dataFeatures)
        entidadFarmaceutica.save()
        const okExpect = true
        const msgExpect = `EntidadesFarmaceutica.Features encontrado`
        const response = await request(app)
            .get('/api/entidadfarmaceutica')
        expect(response.statusCode).toBe(200)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })


})    