const TypeAlert = require('./../models/TypeAlert')

const createTypeAlert = async (req, res) => {
    // desestructurar el schema
    const { description } = req.body
    console.log(`${description} recibido`)
    try {
        const typeAlert = await TypeAlert.findOne({ description: description })
        if (typeAlert) return res.status(400).json({
            ok: false,
            msg: `${description} is already exist in database`
        })
        const dbTypeAlert = new TypeAlert({
            description: description
        })
        //se graba el documento 
        await dbTypeAlert.save()
        return res.status(201).json({
            ok: true,
            msg: `${description} created successfuly`
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json[{
            ok: false,
            msg: `createTypeAlert, Please contact to support`
        }]
    }
}

// Buscar todos los tipos de alerta
const getAllTypeAlerts = async (req, res) => {
    try {
        const typeAlerts = await TypeAlert.find()
        return res.status(200).json({
            ok: true,
            msg: 'TypeAlerts found',
            typeAlerts: typeAlerts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'getAllTypeAlerts, Error getting TypeAlerts, please contact support'
        })
    }
}

// Buscar el tipo de alerta por Id
const getTypeAlertById = async(req, res) => {
    const id = req.params.id
    try {
        const typeAlert = await TypeAlert.findById({_id: id})
        if(!typeAlert) return res.status(404).json({
            ok:false,
            msg:`by getTypeAlertById, Not found Type of Alert para ${id}`
        })       
        return res.status(200).json({
            ok:true,
            msg:'Type of alert with Id found',
            typeAlert: typeAlert
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'by getTypeAlertById, contact to support'
        })
    }
}

// eliminar un tipo de alerta por el id
const deleteTypeAlertById = async(req, res) => {
    const { id } = req.params;
    try {
        const typeAlert = await TypeAlert.findByIdAndDelete(id)
        if (!typeAlert) return res.status(400).json({
            ok: false,
            msg: 'deleteTypeAlertById, type of Alert not found by Id'
        })
        return res.status(200).json({
            ok: true,
            msg: 'alert deleted sucessfuly',
            typeAlert: typeAlert       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'deleteTypeAlertById, error deleting, please contact to support'
        })
    }            
}

// modificar un tipo de alerta por el id
const updateTypeAlertById = async(req, res) => {
    const { id } = req.params;
    const { description } = req.body
    try {
        const updateDataById = {};
        if(description) updateDataById.description = description;
        console.log(updateDataById)
        const typeAlert = await TypeAlert.findByIdAndUpdate(id, updateDataById)
        if (!typeAlert) return res.status(400).json({
            ok: false,
            msg: 'updateTypeAlertById, type of alert not found by Id'
        })
        const updateTypeAlert = await TypeAlert.findById(id)
        return res.status(200).json({
            ok: true,
            msg: 'Type of alert update sucessfuly',
            typeAlert: updateTypeAlert       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'updateTypeAlertById, error updating, please contact to support'
        })
    }            
}


module.exports = {
    createTypeAlert,
    getAllTypeAlerts,
    getTypeAlertById,
    deleteTypeAlertById,
    updateTypeAlertById
}