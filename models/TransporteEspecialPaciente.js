const { Schema, model } = require('mongoose')

// Definición del esquema principal, no cuenta con GEOLOCALIZACION
const transporteEspecialPacienteSchema = Schema({
	prestador				:	{ type	:	String,			required: true },
	SEDE						:	{ type	:	String,			required: true },
	direccion				:	{ type	:	String,			required: true },
	telefono					:	{ type	:	String,			required: true },
	email						:	{ type	:	String,			required: true },
	grse_nombre			:	{ type	:	String,			required: true },
	BASICO					:	{ type	:	String,			required: true },
	MEDICALIZADO	:	{ type	:	String,			required: true },
	URGENCIAS			:	{ type	:	String,			required: true },
	NATURALEZA		:	{ type	:	String,			required: true }
});

module.exports = model('TransporteEspecialPacientes', transporteEspecialPacienteSchema, 'TransporteEspecialPacientes');

