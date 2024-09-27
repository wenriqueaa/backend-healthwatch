const { Schema, model } = require('mongoose')


// Definición del esquema para el CRS
const crsSchema = Schema({
  type: { type: String, required: true },
  properties: {
    name: { type: String, required: true }
  }
}, { _id: false });

// Definición del esquema para la geometría
const geometrySchema = Schema({
  type: { type: String, required: true },
  coordinates: { type: [Number], required: true }
}, { _id: false });

// Definición del esquema para las propiedades
const propertiesSchema = Schema({
  OBJECTID: { type: Number, required: true },
  Id: { type: Number, required: true },
  Entidad: { type: String, required: true },
  Codigo: { type: String, required: true },
  Nit: { type: Number, required: true },
  Direccion: { type: String, required: true },
  Localidad: { type: Number, required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const epsSchema = Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: crsSchema,
  features: [featureSchema]
});

module.exports = model('Eps', epsSchema, 'Eps');