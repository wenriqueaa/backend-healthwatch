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
	Modalidad_	:	{ type	:	String,			required: true },
	Nom_UPI		:	{ type	:	String,			required: true },
	Ubicacion_		:	{ type	:	String,			required: true },
	Direccion_		:	{ type	:	String,			required: true },
	Nom_Loc		:	{ type	:	String,			required: true },
	Nom_Barrio	:	{ type	:	String,			required: true },
	Rango_Etar	:	{ type	:	String,			required: true },
	Perfil_Pob		:	{ type	:	String,			required: true },
	Alimentari		:	{ type	:	String,			required: true },
	Salud				:	{ type	:	String,			required: true },
	Autocuidad	:	{ type	:	String,			required: true },
	Descanso_R	:	{ type	:	String,			required: true },
	Sicosocial		:	{ type	:	String,			required: true },
	Sociolegal		:	{ type	:	String,			required: true },
	Taller_For		:	{ type	:	String,			required: true },
	Habito_Est		:	{ type	:	String,			required: true },
	Estrateg_P		:	{ type	:	String,			required: true },
	Nivelacion		:	{ type	:	String,			required: true },
	Espiritual		:	{ type	:	String,			required: true },
	Educacion		:	{ type	:	String,			required: true },
	Deportes		:	{ type	:	String,			required: true },
	Emprendimi	:	{ type	:	String,			required: true },
	Estrateg_S		:	{ type	:	String,			required: true },
	Form_Sena	:	{ type	:	String,			required: true },
	DeporVida		:	{ type	:	String,			required: true },
	Oferta_Aca	:	{ type	:	String,			required: true },
	Aceleracio		:	{ type	:	String,			required: true },
	Convenios		:	{ type	:	String,			required: true },
	Campamento	:	{ type	:	String,			required: true },
	Latitud			:	{ type	:	Number, 	required: true },
	Longitud			:	{ type	:	Number, 	required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type			:	{ type	:	String,	required: true },
  properties	:	propertiesSchema,
  geometry	:	geometrySchema
}, { _id: false });

// Definición del esquema principal
const upiSchema = Schema({
  type			:	{ type	:	String,	required: true },
  name		:	{ type	:	String,	required: true },
  crs				:	crsSchema ,
  features	:	[featureSchema]
});

module.exports = model('Upi', upiSchema, 'Upi');