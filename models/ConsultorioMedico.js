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
 CONCODIGO : { type: String, required: true },
 CONRSOCIAL: { type: String, required: true },
 CONDIRECCI: { type: String, required: true },
 CONTELEFON: { type: String }, //Existen datos sin esta valor
 CONCPRESTA: { type: String, required: true },
 CPRE      : { type: String, required: true },
 CNJURIDICA: { type: String, required: true },
 CPERSONA  : { type: String, required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const consultorioMedicoSchema = Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: crsSchema ,
  features: [featureSchema]
});

module.exports = model('ConsultoriosMedico', consultorioMedicoSchema, 'ConsultoriosMedico');