//el nombre de la variable ConsultorioMedico debe coincidir con el nombre del archivo ConsultorioMedico.js
//ConsultorioMedico es el modelo
const ConsultoriosMedico = require('../models/ConsultorioMedico')

const createConsultorioMedico = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new ConsultoriosMedico(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'Cons')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        const totalDocuments = await ConsultoriosMedico.where({ "name": { $gte: 'Cons' | { $lt: 'Cons' } } }).countDocuments()
        console.log(totalDocuments)
        if (totalDocuments != 0) {
            const dataFound = await ConsultoriosMedico.findOne({
                "type": dataReceived.type,
                "name": dataReceived.name,
                "crs.type": dataReceived.crs.type,
                "crs.properties.name": dataReceived.crs.properties.name
            })
            if (dataFound) return res.status(409).json({
                ok: false,
                msg: `Ya existe en base de datos con id: ${dataFound._id}`
            })
            else  return res.status(400).json({
                ok: false,
                msg: `Database unicamente admite un (1) documento, Actualmente registra ${totalDocuments}. Por favor eliminar estos antes de adicionar`
            })
        }

        await dataReceived.save();
        return res.status(201).json({
            ok: true,
            msg: `Consultorio Medico creado exitosamente`
        })

    } catch (error) {
        console.error(`Por favor contactarse con soporte`, error)
        return res.status(500).json[{
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        }]
    }
}

const updateConsultorioMedico = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new ConsultoriosMedico(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'Cons')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        let dataFound = await ConsultoriosMedico.findOne({
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
            await ConsultoriosMedico.deleteMany()
            await dataReceived.save();
            return res.status(200).json({
                ok: true,
                msg: `Consultorios Medico exitosamente sincronizado`
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


const getAllConsultorioMedicoFeature = async (req, res) => {
    try {
        const consultoriosMedico = await ConsultoriosMedico.find();
        if(!consultoriosMedico || ( consultoriosMedico && consultoriosMedico.length == 0 ))
            return res.status(400).json({
                ok: false,
                msg: `Database sin registros`
            });
                

        const [features] = await ConsultoriosMedico.find().select('features.properties features.geometry -_id'); //{"features.properties.BANCO_DE_S": regex}    
        // console.log(features);
        const data = features.features
        return res.status(200).json({
            ok: true,
            msg: 'ConsultoriosMedico.Features encontrado',
            data: data
        })
    } catch (error) {
        console.error(`getAllConsultorioMedicoFeature, Error getting ConsultoriosMedico.Features, please contact to support`, error)
        return res.status(500).json({
            ok: false,
            msg: `getAllConsultorioMedicoFeature, Error en ConsultoriosMedico.Features, por favor contactar a soporte`
        })
    }
}


module.exports = {
    createConsultorioMedico
    , updateConsultorioMedico
    , getAllConsultorioMedicoFeature
}
