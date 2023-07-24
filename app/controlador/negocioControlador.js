const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);
const canalModelo = require('../modelo/canalModelo');
const negocioMedelo = require('../modelo/negocioModelo');

function agregarNegocio(param){
    return new Promise(async (resolved, reject) =>{
        
        let estado = true;
        let codigo = "0";        
        let mensaje = "Proceso correcto";
        let data = [];
        let respuesta = {estado, codigo, mensaje, data}

        try{
            let oCanal = await canalModelo.canalByNombre(param.canal);

            if(oCanal.length == 0){
                respuesta.codigo = "NEG1";
                respuesta.estado = false;
                respuesta.mensaje = "Acceso denegado, canal no encontrado.";
                respuesta.data = [];
                logger.log({level: 'info', label: filename + ' - agregarNegocio', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            if(oCanal[0].estado != 0){
                respuesta.codigo = "NEG2";
                respuesta.estado = false;
                respuesta.mensaje = "Acceso denegado, canal encontrado: " + oCanal[0].nombre + ", canal fue dado de baja.";
                respuesta.data = [];
                logger.log({level: 'info', label: filename + ' - agregarNegocio', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            let oCanalAcceso = await canalModelo.accesoByCanal(param.canal, param.acceso);

            if(oCanalAcceso.length == 0){
                respuesta.codigo = "NEG3";
                respuesta.estado = false;
                respuesta.mensaje = "Acceso denegado, no cuenta con permisos necesarios para esta acciòn.";
                respuesta.data = [];
                logger.log({level: 'info', label: filename + ' - agregarNegocio', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            if(oCanalAcceso[0].estado != 1){
                respuesta.codigo = "NEG4";
                respuesta.estado = false;
                respuesta.mensaje = "Acceso denegado, no cuenta con permisos necesarios para esta acciòn.";
                respuesta.data = [];
                logger.log({level: 'info', label: filename + ' - agregarNegocio', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            let oAgregaCliente = await negocioMedelo.agregarNegocio(param.idRubro, param.nombre, param.descripcion, param.nit, param.telefono, param.sitioweb)
            
            if(!canal.estado){
                respuesta = canal;
                return resolved(respuesta);
            }
            if(canal.data.length == 0){
                data = [];
                codigo = "NEG1";
                estado = false;
                mensaje = "Acceso denegado, no cuenta con permisos para esta acción";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - verificaAccesoByCanal', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            return resolved(respuesta);

        }catch(error){
            respuesta.codigo = "NEG-4";
            respuesta.estado = false;
            respuesta.mensaje = error;
            respuesta.data = [];
            logger.log({level: 'error', label: filename + ' - agregarNegocio', message: JSON.stringify(param) + "," + JSON.stringify(respuesta)});
            return resolved(respuesta);
        }

    })
}

//export
module.exports = {
    verificaAccesoByCanal
}