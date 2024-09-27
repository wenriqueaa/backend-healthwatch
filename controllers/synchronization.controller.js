const Axios = require('axios');
const BancosSangre = require('../models/BancoSangre')
const ConsultorioMedico = require('../models/ConsultorioMedico')

const synchronization = async (req, res) => {
    // desestructurar el schema
    const nameService = req.query.service
    let urlData
    let dataReceived
    let dataFound
    let data = {}
    console.info('synchronization.controller A. nameService: %s', nameService);
    try {
        switch (nameService) {
            case 'bancosangre':
                // Código para manejar la opción 'bancosangre'
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/53472aaa-2b4f-4b15-8e43-3a243b518ca1/resource/b80a3352-b9b8-42e8-a007-66f665515dc0/download/bancosangre.geojson'
                break;
            case 'consultoriomedico':
                // Código para manejar la opción 'consultoriomedico'
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/d727ef96-d9e4-4f18-a60e-d4bfc9e7dd7d/resource/55419556-fe94-412d-aba0-780214c240c7/download/cons.geojson'
                break;
            case 'entidadfarmaceutica':
                // Código para manejar la opción 'entidadfarmaceutica'
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/bb3ebd5d-9b9b-4be6-ab42-b4ab2bd98214/resource/25bc32fc-b377-4b78-a87a-d62b7b962998/download/efar.geojson'
                break;
            case 'eps':
                // Código para manejar la opción 'eps'
                // console.log('Seleccionaste eps');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/c9cc72c9-4242-4a57-b86d-d377de88b558/resource/838967cb-47dd-4567-b41c-62d3103ecfaa/download/eps.geojson'
                break;
            case 'ips':
                // Código para manejar la opción 'ips'
                // console.log('Seleccionaste ips');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/fc66362f-ba91-4d7a-af9c-d0b3d3a60106/resource/0e432b79-8c0f-4a0c-a592-43330712fe03/download/ips.geojson'
                break;
            case 'redadscritasalud':
                // Código para manejar la opción 'redadscritasalud'
                // console.log('Seleccionaste redadscritasalud');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/057e1a9c-2906-4ea2-bc40-de5120f770ce/resource/92d564f2-5af8-406a-a36f-fb7e1d7ef61d/download/rasa.geojson'
                break;
            case 'transfusionsanguinea':
                // Código para manejar la opción 'transfusionsanguinea'
                // console.log('Seleccionaste transfusionsanguinea');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/42c05920-1e8a-41ac-9795-7078512e285a/resource/e7e6f5da-bae5-4b70-8c50-3dd19b1dd8b9/download/stsa.geojson'
                break;
            case 'transporteespecialpaciente':
                // Código para manejar la opción 'transporteespecialpaciente'
                // console.log('Seleccionaste transporteespecialpaciente');
                urlData = 'https://datosabiertos.bogota.gov.co/api/3/action/datastore_search?resource_id=68d7345c-e77f-4e83-a2f5-d398ecbaa82e&limit=250'
                break;
            case 'upi':
                // Código para manejar la opción 'upi'
                // console.log('Seleccionaste upi');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/d0640cd2-00ed-4bcb-9ba2-12f3ced7a8f8/resource/dc8e76fc-33c4-4a23-b187-f1387748df3b/download/upi_12_2022.geojson'
                break;
            case 'vacunafiebre':
                // Código para manejar la opción 'vacunafiebre'
                // console.log('Seleccionaste vacunafiebre');
                urlData = 'https://datosabiertos.bogota.gov.co/dataset/3c527716-6b5b-46d3-a3d7-fcd918ba7ccb/resource/67abf906-6b52-4064-b0a8-8e3fcd39a1a7/download/vacunafiebre.geojson'
                break;
            default:
                 // Código para manejar cualquier opción no contemplada
                 console.error('synchronization.controller B. nameService %s not available', nameService);
                 return res.status(400).json({
                     ok: false,
                     msg: `service '${nameService}' no registrada para actualizar. Por favor contactarse con soporte`
                 })
                 break;
        }

        if( urlData==''||urlData===undefined){
            return res.status(400).json({
                ok: false,
                msg: `Error urlData --> ${urlData}`
            })
        }
        else{
        // Realizar una petición GET para obtener todos los usuarios
        console.info('synchronization.controller C. Axios.get(\'%s\')', urlData)
        await Axios.get(`${urlData}`)
            .then((response) => {
                // Manejar la respuesta exitosa
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);                // console.log('synchronization.controller D. data:', response);
                data = response.data
                console.log('synchronization.controller response.data: %s', data)
                return res.status(200).json({
                    ok: true,
                    msg: `review from: ${urlData} --> ${data}`,
                    data: response.data
                })
            })
            .catch((error) => {
                // Manejar el error en caso de fallo
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log('synchronization.controller error.response.data: %s', error.response.data);
                    console.log('synchronization.controller error.response.status: %s', error.response.status);
                    console.log('synchronization.controller error.response.headers: %s', error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('synchronization.controller error.request: %s', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('synchronization.controller error.message: %s', error.message);
                }
                console.log('synchronization.controller error.config: %s', error.config);
                return res.status(400).json({
                    ok: false,
                    msg: `Error from: ${urlData} --> ${error.message}`
                })
            });
        if(data){
        console.log('synchronization.controller F.01 Synchronization nameService : %s', nameService)
        console.log('synchronization.controller F.02 Synchronization data ', data)
        switch (nameService) {
            case 'bancosangre':
                // Código para manejar la opción 'bancosangre'
                if (data.name == nameService) {
                    dataFound = await BancosSangre.findOne()
                    if (dataFound) {
                        await BancosSangre.deleteMany()
                        message = `Bancos de Sangre actualizado exitosamente`
                    } else { message = `Banco Sangre creado exitosamente` }
                    dataReceived = new BancosSangre(data)
                    console.log('G. BancoSangre', dataReceived)
                    // await dataReceived.save();
                    return res.status(201).json({
                        ok: true,
                        msg: message
                    })
                } else {
                    console.log('data.name == nameService', data.name, nameService)
                    message = `Datos desde datosabiertos.bogota.gov.co: ${urlData}; no corresponden con ${nameService}`
                    return res.status(400).json({
                        ok: false,
                        msg: message
                    })
                }
                break;
            //     case 'consultoriomedico':
            //         // Código para manejar la opción 'consultoriomedico'
            //         dataFound = await ConsultorioMedico.findOne()
            //         if (serviceOption == 'update' & !dataFound) {
            //             console.error('Opción ', serviceOption);
            //             return res.status(400).json({
            //                 ok: false,
            //                 msg: `service '${nameService}' no registrada para actualizar. Por favor contactarse con soporte`
            //             })
            //         }
            //         if (dataFound) {
            //             await ConsultorioMedico.deleteMany()
            //         }
            //         dataReceived = new ConsultorioMedico(data)
            //         console.log('ConsultorioMedico', dataReceived)
            //         await dataReceived.save();
            //         return res.status(201).json({
            //             ok: true,
            //             msg: `Consultorio Médico creado exitosamente`
            //         })
            //         break;
            //     // case 'entidadfarmaceutica':
            //     //   // Código para manejar la opción 'entidadfarmaceutica'
            //     //   break;
            //     // case 'eps':
            //     //   // Código para manejar la opción 'eps'
            //     //   break;
            //     // case 'ips':
            //     //   // Código para manejar la opción 'ips'
            //     //   break;
            //     // case 'redadscritasalud':
            //     //   // Código para manejar la opción 'redadscritasalud'
            //     //   break;
            //     // case 'transfusionsanguinea':
            //     //   // Código para manejar la opción 'transfusionsanguinea'
            //     //   break;
            //     // case 'transporteespecialpaciente':
            //     //   // Código para manejar la opción 'transporteespecialpaciente'
            //     //   break;
            //     // case 'upi':
            //     //   // Código para manejar la opción 'upi'
            //     //   break;
            //     // case 'vacunafiebre':
            //     //   // Código para manejar la opción 'vacunafiebre'
            //     //   break;
            default:
                // Código para manejar cualquier opción no contemplada
                console.error('Servicio no reconocido', nameService);
                return res.status(400).json({
                    ok: false,
                    msg: `service '${nameService}' no implementado. Por favor contactarse con soporte`
                })
                break;
        }} else{
            console.log('erroir do not received revsynchronization.controller F.02 Synchronization data ', data)
        }
        }
    } catch (error) {
        console.error(`Por favor contactarse con soporte`, error)
        return res.status(500).json({
            ok: false,
            msg: `Por favor contactarse con soporte ${'\r\n' + error}`
        })
    }
}

module.exports = {
    synchronization
}
