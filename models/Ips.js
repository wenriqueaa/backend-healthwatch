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
                Id:  { type: Number, required: true },
                departamen: { type: String, required: true },
                municipio: { type: String, required: true },
                codigo_pre: { type: String, required: true },
                nombre_pre: { type: String, required: true },
                nombre: { type: String, required: true },
                tipo_zona: { type: String, required: true },
                direccion: { type: String, required: true },
                barrio: { type: String, required: true },
                telefono: { type: String, required: true },
                fax: { type: Number, required: true },
                email: { type: String, required: true },
                clase_pers: { type: String, required: true },
                naturaleza: { type: String, required: true },
                clase_pres: { type: String, required: true },
                ese: { type: String, required: true },
                nivel: { type: String, required: true },
                sede_princ: { type: String, required: true },
                horario_lu: { type: String, required: true },
                horario_ma: { type: String, required: true },
                horario_mi: { type: String, required: true },
                horario_ju: { type: String, required: true },
                horario_vi: { type: String, required: true },
                horario_sa: { type: String, required: true },
                horario_do: { type: String, required: true },
                fecha_cort: { type: String, required: true }
}, { _id: false });

// Definición del esquema para las características (features)
const featureSchema = Schema({
  type: { type: String, required: true },
  properties: propertiesSchema,
  geometry: geometrySchema
}, { _id: false });

// Definición del esquema principal
const ipsSchema = Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: crsSchema ,
  features: [featureSchema]
});

module.exports = model('Ips', ipsSchema, 'Ips');