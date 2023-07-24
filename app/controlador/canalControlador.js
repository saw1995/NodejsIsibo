const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);
const canalModelo = require('../modelo/canalModelo');

function verificaAccesoByCanal(entrada){
    return new Promise(async (resolved, reject) =>{
        let data = [];
        let codigo = "0";
        let estado = false;
        let mensaje = "Proceso correcto";
        let respuesta = {data, codigo, estado, mensaje}

        try{
            let canal = await canalModelo.accesoByCanal(entrada.canal, entrada.acceso);
            if(!canal.estado){
                respuesta = canal;
                return resolved(respuesta);
            }
            if(canal.data.length == 0){
                data = [];
                codigo = "CLI1";
                estado = false;
                mensaje = "Acceso denegado, no cuenta con permisos para esta acción";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - verificaAccesoByCanal', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            respuesta = canal;
        }catch(error){
            data = [];
            codigo = "CLI-2";
            estado = false;
            mensaje = error;
            respuesta = {data, codigo, estado, mensaje}
            logger.log({level: 'error', label: filename + ' - verificaAccesoByCanal', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
        }

        return resolved(respuesta);
    })
}

//export
module.exports = {
    verificaAccesoByCanal
}