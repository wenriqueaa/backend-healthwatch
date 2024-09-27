const{ Schema, model } = require('mongoose')

const incidentSchema = Schema({
    dateIncident: {
        type: Date,
        default: Date.now,
        require: true
    },
    nameIncident: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    incubationIncident: {
        type: String
    },
    recoveryIncident: {
        type: String
    },
    sourceIncident: {
        type: String
    },
    imageIncident: {
        type: String
    },
    casesIncident: {
        type: Number,
        require: true
    },
    urlSourceIncident: {
        type: String
    }
})

module.exports = model('Incidents', incidentSchema)


