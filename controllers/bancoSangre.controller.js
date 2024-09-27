//el nombre de la variable BancoSangre debe coincidir con el nombre del archivo BancoSangre.js
//BancoSangre es el modelo
const BancosSangre = require('../models/BancoSangre')

const createBancoSangre = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new BancosSangre(req.body)
    console.log('createBancoSangre', dataReceived)
    try {
        // Controlar que el archivo cuente con datos en Features
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        // Controlar que el archivo corresponda con name:'bancosangre'
        if (dataReceived.name != 'bancosangre')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        const totalDocuments = await BancosSangre.where({ "name": { $gte: 'bancosangre' | { $lt: 'bancosangre' } } }).countDocuments()
        console.log(totalDocuments)
        if (totalDocuments != 0) {
            const dataFound = await BancosSangre.findOne({
                "type": dataReceived.type,
                "name": dataReceived.name,
                "crs.type": dataReceived.crs.type,
                "crs.properties.name": dataReceived.crs.properties.name
            })
            if (dataFound) {return res.status(409).json({
                ok: false,
                msg: `Ya existe en base de datos con id: ${dataFound._id}`
            })} else return res.status(400).json({
                ok: false,
                msg: `Database unicamente admite un (1) documento, Actualmente registra ${totalDocuments}. Por favor eliminar estos antes de adicionar`
            });
        }
        await dataReceived.save();
        return res.status(201).json({
            ok: true,
            msg: `Banco Sangre creado exitosamente`
        })

    } catch (error) {
        console.error(`Por favor contactarse con soporte`, error)
        return res.status(500).json[{
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        }]
    }
}

const updateBancoSangre = async (req, res) => {
    // desestructurar el schema
    const dataReceived = new BancosSangre(req.body)

    try {
        console.log("There are %d features in '%s' documents name ", dataReceived.features.length, dataReceived.name);
        if (dataReceived.features.length == 0)
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. Existen ${dataReceived.features.length} 'features' en documento '${dataReceived.name}'`
            })
        if (dataReceived.name != 'bancosangre')
            return res.status(400).json({
                ok: false,
                msg: `Se requiere data válida. No habilitado para documentos '${dataReceived.name}'`
            })
        let dataFound = await BancosSangre.findOne({
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
            await BancosSangre.deleteMany()
            await dataReceived.save();
            return res.status(200).json({
                ok: true,
                msg: `Bancos Sangre exitosamente sincronizado`
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


const getAllBancoSangreFeature = async (req, res) => {
    try {
        // const [features] = await BancosSangre.find().select('features.type features.properties features.geometry -_id'); //{"features.properties.BANCO_DE_S": regex}    
        const bancosSangre = await BancosSangre.find();
        console.info('getAllBancoSangreFeature data ', bancosSangre.length, bancosSangre[0] )
        if(bancosSangre && bancosSangre.length > 0 ){        
        const [{features}] = await BancosSangre.find().select('features -_id'); //{"features.properties.BANCO_DE_S": regex}    
        // console.log(features);
        const data = features
        return res.status(200).json({
            ok: true,
            msg: 'BancosSangre.Features encontrado',
            data: data
        })
    }
    else {
        return res.status(400).json({
            ok: false,
            msg: `Database sin registros`
        });
    }
    } catch (error) {
        console.error(`getAllBancoSangreFeature, Error getting BancosSangre.Features, please contact to support`, error)
        return res.status(500).json({
            ok: false,
            msg: `getAllBancoSangreFeature, Error en BancosSangre.Features, por favor contactar a soporte`
        })
    }
}


module.exports = {
    createBancoSangre
    , updateBancoSangre
    , getAllBancoSangreFeature
}
