const { Schema, model } = require('mongoose')


// Definición del esquema para el CRS
const crsSchema = Schema({
  // type: { type: String, required: true },
  type: { type: String },
  properties: {
    // name: { type: String, required: true }
    name: { type: String }
  }
}, { _id: false });

// Definición del esquema para la geometría
const geometrySchema = Schema({
  type: { type: String, required: true },
  coordinates: { type: [Number], required: true }
}, { _id: false });

// Definición del esquema para las propiedades
const propertiesSchema = Schema({
	ID: { type: Number, required: true },
	UPZ: { type: String, required: true },
	LOCALIDAD: { type: String, required: true },
	RSOCIAL: { type: String, required: true },
	DIRECCION: { type: String, required: true },
	BARRIO: { type: String, required: true },
	TELEFONO: { type: String, required: true },
	DRO24HORAS: { type: String, required: true },
	ENTREPORTA: { type: String, required: true },
	TESTABLECI: { type: String, required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const entidadesFarmaceuticaSchema = Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: crsSchema ,
  features: [featureSchema]
});

module.exports = model('EntidadesFarmaceutica', entidadesFarmaceuticaSchema, 'EntidadesFarmaceutica');