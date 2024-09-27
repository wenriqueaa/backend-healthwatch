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
	id: { type: Number }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const redAdscritaSaludSchema = Schema({
  type: { type: String, required: true },
  name: { type: String },
  crs: crsSchema ,
  features: [featureSchema]
});

module.exports = model('RedAdscritasSalud', redAdscritaSaludSchema, 'RedAdscritasSalud');