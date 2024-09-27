const{ Schema, model } = require('mongoose')

const typeAlertSchema = Schema({
    description: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = model('TypeAlerts', typeAlertSchema)

