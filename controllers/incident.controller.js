const Incident = require("../models/Incident");

// Crear una incidencia
const createIncident = async (req, res) => {
    const { dateIncident, nameIncident, description, incubationIncident, recoveryIncident, sourceIncident, imageIncident, casesIncident, urlSourceIncident } = req.body
    try {
        const incident = await Incident.findOne({ nameIncident: nameIncident })
        if (incident) return res.status(400).json({
            ok: false,
            msg: `${nameIncident} is already exist in database`
        })
        //nuevo objeto
        const dbIncident = new Incident({
            dateIncident: dateIncident,
            nameIncident: nameIncident,
            description: description,
            incubationIncident: incubationIncident,
            recoveryIncident: recoveryIncident,
            sourceIncident: sourceIncident,
            imageIncident: imageIncident,
            casesIncident: casesIncident,
            urlSourceIncident: urlSourceIncident
        })
        //guardar el objeto
        await dbIncident.save()
        return res.status(201).json({
            ok: true,
            msg: `${description} created successfuly`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'createIncident fail, please contact support'
        })
    }
}

// Buscar todas las incidencias
const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find()
        return res.status(200).json({
            ok: true,
            msg: 'incidents found',
            incidents: incidents
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'getAllIncidents, Error getting Incidents, please contact support'
        })
    }
}

// Buscar incidencia por Id
const getIncidentById = async (req, res) => {
    const id = req.params.id
    try {
        const incident = await Incident.findById({ _id: id })
        if (!incident) return res.status(404).json({
            ok: false,
            msg: `by getIncidentById, Not found Incident para ${id}`
        })
        return res.status(200).json({
            ok: true,
            msg: 'incident with Id found',
            incident: incident
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'by getIncidentById, contact to support'
        })
    }
}

// eliminar una incidencia por el id
const deleteIncidentById = async (req, res) => {
    const { id } = req.params;
    try {
        const incident = await Incident.findByIdAndDelete(id)
        if (!incident) return res.status(400).json({
            ok: false,
            msg: 'deleteIncidentById, incident not found by Id'
        })
        return res.status(200).json({
            ok: true,
            msg: 'incident deleted sucessfuly',
            incident: incident
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'deleteIncidentById, error deleting, please contact to support'
        })
    }
}

// modificar una incidencia por el id
const updateIncidentById = async (req, res) => {
    const { id } = req.params;
    const { nameIncident, description, incubationIncident, recoveryIncident, sourceIncident, imageIncident, casesIncident, urlSourceIncident } = req.body
    try {
        const updateDataById = {};
        if (nameIncident) updateDataById.nameIncident = nameIncident;
        if (description) updateDataById.description = description;
        if (incubationIncident) updateDataById.incubationIncident = incubationIncident;
        if (recoveryIncident) updateDataById.recoveryIncident = recoveryIncident;
        if (sourceIncident) updateDataById.sourceIncident = sourceIncident;
        if (imageIncident) updateDataById.imageIncident = imageIncident;
        if (casesIncident) updateDataById.casesIncident = casesIncident;
        if (urlSourceIncident) updateDataById.urlSourceIncident = urlSourceIncident;

        console.log(updateDataById)
        const incident = await Incident.findByIdAndUpdate(id, updateDataById)
        if (!incident) return res.status(400).json({
            ok: false,
            msg: 'updateIncidentById, incident not found by Id'
        })
        const updateincident = await Incident.findById(id)
        return res.status(200).json({
            ok: true,
            msg: 'incident update sucessfuly',
            incident: updateincident
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'updateIncidentyId, error updating, please contact to support'
        })
    }
}


module.exports = {
    createIncident,
    getAllIncidents,
    getIncidentById,
    deleteIncidentById,
    updateIncidentById
}