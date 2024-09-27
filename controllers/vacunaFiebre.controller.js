//el nombre de la variable VacunaFiebre debe coincidir con el nombre del archivo VacunaFiebre.js
//VacunaFiebre es el modelo
const VacunasFiebre = require('../models/VacunaFiebre')

const createVacunaFiebre = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new VacunasFiebre(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'vacunafiebre')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        const totalDocuments = await VacunasFiebre.where({ "name": { $gte: 'vacunafiebre' | { $lt: 'vacunafiebre' } } }).countDocuments()
        console.log(totalDocuments)
        if (totalDocuments != 0) {
            const dataFound = await VacunasFiebre.findOne({
                "type": dataReceived.type,
                "name": dataReceived.name,
                "crs.type": dataReceived.crs.type,
                "crs.properties.name": dataReceived.crs.properties.name
            })
            if (dataFound) return res.status(409).json({
                ok: false,
                msg: `Ya existe en base de datos con id: ${dataFound._id}`
            })
        }
        if (totalDocuments != 0) return res.status(400).json({
            ok: false,
            msg: `Database unicamente admite un (1) documento, Actualmente registra ${totalDocuments}. Por favor eliminar estos antes de adicionar`
        })

        await dataReceived.save();
        return res.status(201).json({
            ok: true,
            msg: `Vacuna Fiebre creado exitosamente`
        })

    } catch (error) {
        console.error(`Por favor contactarse con soporte`, error)
        return res.status(500).json[{
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        }]
    }
}

const updateVacunaFiebre = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new VacunasFiebre(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'vacunafiebre')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        let dataFound = await VacunasFiebre.findOne({
            "type": dataReceived.type,
            "name": dataReceived.name,
            "crs.type": dataReceived.crs.type,
            "crs.properties.name": dataReceived.crs.properties.name
        })
        if (!dataFound)
            return res.status(400).json({
                ok: false,
                msg: `Documento ${dataReceived.name} no encontrado con 'type': '${dataReceived.type}', 'name': '${dataReceived.name}', 'crs.type': '${dataReceived.crs.type}', 'crs.properties.name': '${dataReceived.crs.properties.name}'`
            })
        if (dataFound) {
            await VacunasFiebre.deleteMany()
            await dataReceived.save();
            return res.status(200).json({
                ok: true,
                msg: `Vacunas Fiebre exitosamente sincronizado`
            })
        }
    } catch (error) {
        console.error(`Please contact to support`, error)
        return res.status(500).json[{
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        }]
    }
}


const getAllVacunaFiebreFeature = async (req, res) => {
    try {
        const [features] = await VacunasFiebre.find().select('features.properties features.geometry -_id'); 
        // console.log(features);
        const data = features.features
        return res.status(200).json({
            ok: true,
            msg: 'VacunasFiebre.Features encontrado',
            data: data
        })
    } catch (error) {
        console.error(`getAllVacunaFiebreFeature, Error getting VacunasFiebre.Features, please contact to support`, error)
        return res.status(500).json({
            ok: false,
            msg: `getAllVacunaFiebreFeature, Error en VacunasFiebre.Features, por favor contactar a soporte`
        })
    }
}


module.exports = {
    createVacunaFiebre
    , updateVacunaFiebre
    , getAllVacunaFiebreFeature
}
