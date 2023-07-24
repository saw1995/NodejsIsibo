const pool = require('../config/database');
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);

function canalByNombre(nombre){
    return new Promise((resolved, reject) =>{
        const values = [nombre];

        var sql = `
        SELECT id, nombre 
        FROM canal 
        WHERE nombre = ?
        `;

        pool.query(sql, values, function(error, resultado){
            let data = resultado;
            let codigo = "0";
            let estado = true;
            let mensaje = "Proceso correcto";
            let respuesta = {data, codigo, estado, mensaje}

            if (error){
                data = [];
                codigo = "NEG-3";
                estado = false;
                mensaje = error;
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'error', label: filename + ' - canalByNombre', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

function accesoByCanal(canal, acceso){
    return new Promise((resolved, reject) =>{
        const values = [canal, acceso];

        var sql = `
        SELECT canalAcceso.id, canalAcceso.acceso, canalAcceso.estado, canal.nombre as 'canal' 
        FROM canal INNER JOIN canalAcceso ON canal.id = canalAcceso.idCanal 
        WHERE canal.id = ? AND canalAcceso.acceso = ?;
        `;

        pool.query(sql, values, function(error, resultado){
            let data = resultado;
            let codigo = "0";
            let estado = true;
            let mensaje = "Proceso correcto";
            let respuesta = {data, codigo, estado, mensaje}

            if (error){
                data = [];
                codigo = "CLI-3";
                estado = false;
                mensaje = error;
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'error', label: filename + ' - accesoByCanal', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

module.exports = {
    canalByNombre,
    accesoByCanal
}