const { Schema, model } = require('mongoose')


// Definición del esquema para el CRS
const crsSchema = Schema({
  type			:	{ type	: String },
  properties	:	{ name	:	{ type	:	String }}
}, { _id	:	false });

// Definición del esquema para la geometría
const geometrySchema = Schema({
  type				: { type	:	String,			required: true },
  coordinates	: { type	:	[Number],	required: true }
}, { _id	:	false });

// Definición del esquema para las propiedades
const propertiesSchema = Schema({
	OBJECTID		:	{ type	:	Number, 	required: true },
	Nombre_de_	:	{ type	:	String,			required: true },
	Nombre_IPS	:	{ type	:	String,			required: true },
	Direccion		:	{ type	:	String,			required: true },
	Telefono			:	{ type	:	String,			required: true },
	Horario_Lu		:	{ type	:	String,			required: true },
	Horario__S	:	{ type	:	String,			required: true },
	TipoEnti			:	{ type	:	String,			required: true },
	LocNombre	:	{ type	:	String,			required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type			:	{ type	:	String,	required: true },
  properties	:	propertiesSchema,
  geometry	:	geometrySchema
}, { _id: false });

// Definición del esquema principal
const vacunaFiebreSchema = Schema({
  type			:	{ type	:	String,	required: true },
  name		:	{ type	:	String,	required: true },
  crs				:	crsSchema ,
  features	:	[featureSchema]
});

module.exports = model('VacunasFiebre', vacunaFiebreSchema, 'VacunasFiebre');