const Alert = require("../models/Alert");

// Crear una Alerta
const createAlert = async (req, res) => {
    const { dateAlert, description, notificationSms, notificationEmail, frecuency, typeAlert, userAlert} = req.body
    try {
        const alert = await Alert.findOne({ description: description })
        if (alert) return res.status(400).json({
            ok: false,
            msg: `${description} is already exist in database`
        })
        //nuevo objeto
        const dbAlert = new Alert({
            dateAlert: dateAlert,
            description: description,
            typeAlert: typeAlert,
            notificationSms: notificationSms,
            notificationEmail: notificationEmail,
            frecuency: frecuency,
            userAlert: userAlert
        })
        //guardar el objeto
        await dbAlert.save()
        return res.status(201).json({
            ok: true,
            msg: `${description} created successfuly`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'createAlert fail, please contact support'
        })
    }
}

// Buscar todas las alertas
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find()
        return res.status(200).json({
            ok: true,
            msg: 'alerts found',
            alerts: alerts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'getAllAlerts, Error getting Alerts, please contact support'
        })
    }
}

// Buscar alerta por Id
const getAlertById = async(req, res) => {
    const id = req.params.id
    try {
        const alert = await Alert.findById({_id: id})
        if(!alert) return res.status(404).json({
            ok:false,
            msg:`by getAlertById, Not found Alert para ${id}`
        })       
        return res.status(200).json({
            ok:true,
            msg:'alert with Id found',
            alert: alert
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'by getAlertById, contact to support'
        })
    }
}

// eliminar una alerta por el id
const deleteAlertById = async(req, res) => {
    const { id } = req.params;
    try {
        const alert = await Alert.findByIdAndDelete(id)
        if (!alert) return res.status(400).json({
            ok: false,
            msg: 'deleteAlertById, alert not found by Id'
        })
        return res.status(200).json({
            ok: true,
            msg: 'alert deleted sucessfuly',
            alert: alert       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'deleteAlertById, error deleting, please contact to support'
        })
    }            
}

// modificar una alerta por el id
const updateAlertById = async(req, res) => {
    const { id } = req.params;
    const { description, typeAlert, notificationSms, notificationEmail, frecuency} = req.body
    try {
        const updateDataById = {};
        if(description) updateDataById.description = description;
        if(notificationSms) updateDataById.notificationSms = notificationSms;
        if(notificationEmail) updateDataById.notificationEmail = notificationEmail;
        if(frecuency) updateDataById.frecuency = frecuency;
        if(typeAlert) updateDataById.typeAlert = typeAlert;
        console.log(updateDataById)
        const alert = await Alert.findByIdAndUpdate(id, updateDataById)
        if (!alert) return res.status(400).json({
            ok: false,
            msg: 'updateAlertById, alert not found by Id'
        })
        const updatealert = await Alert.findById(id)
        return res.status(200).json({
            ok: true,
            msg: 'alert update sucessfuly',
            alert: updatealert       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'updateAlertById, error updating, please contact to support'
        })
    }            
}


// Buscar alertas por Id del usuario
const getAllAlertsByUserId = async(req, res) => {
    const { userAlert } = req.params;
    console.log(userAlert)
    try {
        const alerts = await Alert.find({userAlert: userAlert})
        if(!alerts) return res.status(404).json({
            ok:false,
            msg:`by getAllAlertsByUserId, Not found Alerts para ${userAlert}`
        })       
        return res.status(200).json({
            ok:true,
            msg:`alerts found by userid para ${userAlert}`,
            alerts: alerts
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'by getAllAlertsByUserId, contact to support'
        })
    }
}


module.exports = {
    createAlert,
    getAllAlerts,
    getAlertById,
    deleteAlertById,
    updateAlertById,
    getAllAlertsByUserId    
}