const app = require('../index') 
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const Upi = require('../models/Upi')
const request = require('supertest')
// const path = require('path')
jest.mock('../models/Upi');

describe('Upi Controller testing', () => {
    let mongoServer;
    // Agrupar Definition Data para uso
    msg: `Ya existe en base de datos con id: ${dataFound._id}`
    const dataNotFeatures = {
        type: "FeatureCollection", name: "EFar", crs: {
            type: "name", properties: { name: "urn:ogc:def:crs:EPSG::0000" }
        }, features: []
    }

    beforeAll(async () => {
        await mongoose.connection.close();
        // Verifica si hay una conexión activa
        if (mongoose.connection.readyState === 0) {
			mongoServer = await MongoMemoryServer.create();
			const uri = mongoServer.getUri();
			await mongoose.connect(uri);
			await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}});

    beforeEach(async () => {
        Upi.mockClear();
    });

    afterAll(async () => {
        await mongoose.connection.close()
        await mongoose.disconnect();
        await mongoServer.stop();
    })
    // Check createUpi functionality
    const createUpiCheck = true;
    if (createUpiCheck) {
        it('Check createUpi functionality status 400 not features in data', async () => {
            const okExpect = false
            const msgExpect = `Se requiere data válida. Existen ${dataNotFeatures.features.length} 'features' en documento '${dataNotFeatures.name}'`
            const response = await request(app)
                .post('/api/newupi')
                .send(dataNotFeaturesdataNotFeatures)
            expect(response.statusCode).toBe(400)
            expect(response.body.ok).toBe(okExpect)
            expect(response.body.msg).toBe(`${msgExpect}`)

        })

    it('Check getAllUpiFeature functionality status 200', async () => {
        const upi = await new Upi(dataFeatures)
        upi.save()
        const okExpect = true
        const msgExpect = `Upi.Features encontrado`
        const response = await request(app)
            .get('/api/upi')
        expect(response.statusCode).toBe(200)
        expect(response.body.ok).toBe(okExpect)
        expect(response.body.msg).toBe(msgExpect)
    })
    
}})    