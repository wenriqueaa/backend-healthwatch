//el nombre de la variable EntidadFarmaceutica debe coincidir con el nombre del archivo EntidadFarmaceutica.js
//EntidadFarmaceutica es el modelo
const EntidadesFarmaceutica = require('../models/EntidadFarmaceutica')

const createEntidadFarmaceutica = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new EntidadesFarmaceutica(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'EFar')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        const totalDocuments = await EntidadesFarmaceutica.where({ "name": { $gte: 'EFar' | { $lt: 'EFar' } } }).countDocuments()
        console.log(totalDocuments)
        if (totalDocuments != 0) {
            const dataFound = await EntidadesFarmaceutica.findOne({
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
            msg: `Entidad Farmacéutica creado exitosamente`
        })

    } catch (error) {
        console.error(`Por favor contactarse con soporte`, error)
        return res.status(500).json[{
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        }]
    }
}

const updateEntidadFarmaceutica = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new EntidadesFarmaceutica(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'EFar')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        let dataFound = await EntidadesFarmaceutica.findOne({
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
            await EntidadesFarmaceutica.deleteMany()
            await dataReceived.save();
            return res.status(200).json({
                ok: true,
                msg: `Entidades Farmacéuticas exitosamente sincronizado`
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


const getAllEntidadFarmaceuticaFeature = async (req, res) => {
    try {
        const [features] = await EntidadesFarmaceutica.find().select('features.properties features.geometry -_id'); 
        // console.log(features);
        const data = features.features
        return res.status(200).json({
            ok: true,
            msg: 'EntidadesFarmaceutica.Features encontrado',
            data: data
        })
    } catch (error) {
        console.error(`getAllEntidadFarmaceuticaFeature, Error getting EntidadesFarmaceutica.Features, please contact to support`, error)
        return res.status(500).json({
            ok: false,
            msg: `getAllEntidadFarmaceuticaFeature, Error en EntidadesFarmaceutica.Features, por favor contactar a soporte`
        })
    }
}


module.exports = {
    createEntidadFarmaceutica
    , updateEntidadFarmaceutica
    , getAllEntidadFarmaceuticaFeature
}
