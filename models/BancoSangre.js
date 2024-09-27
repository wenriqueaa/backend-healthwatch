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
  OBJECTID: { type: Number, required: true },
  id: { type: Number, required: true },
  BANCO_DE_S: { type: String, required: true },
  DIRECCION: { type: String, required: true },
  TELEFONOS: { type: String, required: true },
  codigo_loc: { type: Number, required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const bancoSangreSchema = Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: crsSchema ,
  features: [featureSchema]
});

module.exports = model('BancosSangre', bancoSangreSchema, 'BancosSangre');