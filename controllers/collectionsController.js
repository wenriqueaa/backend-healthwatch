const mongoose = require('mongoose');

// Lista de nombres de las colecciones
const collections = ['BancosSangre'
    , 'ConsultoriosMedico'
    , 'EntidadesFarmaceutica'
    , 'Eps'
    , 'Ips'
    , 'RedAdscritasSalud'
    , 'ServiciosTransfusionSanguinea'
    // , 'TransporteEspecialPacientes'
    , 'Upi'
    , 'VacunasFiebre'
]; // Aquí pon el nombre de tus colecciones

// Controlador para obtener los datos agregados
const getCollectionStats = async (req, res) => {
    try {
        const results = await Promise.all(collections.map(async (collectionName) => {
            const collection = mongoose.connection.collection(collectionName);
      // Diferentes pipelines dependiendo de la colección
      const pipeline = collectionName === 'Upi' ? [
        {
          $unwind: "$features" // Descompone el array de features para tratar cada uno por separado
        },
        {
          $group: {
            _id: null,
            totalFeatures: { $sum: 1 }, // Cuenta cada feature después del unwind
            averageLongitude: { $avg: "$features.properties.Longitud" }, // Usar latitud/longitud de properties
            averageLatitude: { $avg: "$features.properties.Latitud" }
          }
        },
        {
          $project: {
            _id: 0,
            nameCollection: collectionName,
            totalFeatures: 1,
            averageLongitude: 1,
            averageLatitude: 1
          }
        }
      ] : [
        {
          $unwind: "$features"
        },
        {
          $group: {
            _id: null,
            totalFeatures: { $sum: 1 },
            averageLongitude: { $avg: { $arrayElemAt: ["$features.geometry.coordinates", 0] } }, // Usar coordinates
            averageLatitude: { $avg: { $arrayElemAt: ["$features.geometry.coordinates", 1] } }
          }
        },
        {
          $project: {
            _id: 0,
            nameCollection: collectionName,
            totalFeatures: 1,
            averageLongitude: 1,
            averageLatitude: 1
          }
        }
      ];

      const [result] = await collection.aggregate(pipeline).toArray();
            // Si no hay resultados (colección vacía), devolver valores predeterminados
            if (!result) {
                return {
                    nameCollection: collectionName,
                    totalFeatures: 0,
                    averageLongitude: 0,
                    averageLatitude: 0
                };
            }

            return result;
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las estadísticas de las colecciones' });
    }
};
module.exports = {
    getCollectionStats
};
