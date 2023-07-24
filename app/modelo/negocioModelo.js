const pool = require('../config/database');
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);

function agregarNegocio(idRubro, nombre, descripcion, nit, telefono, sitioweb){
    return new Promise((resolved, reject) =>{
        
        let idGenerado = Date.now();

        const values = [idGenerado, idRubro, nombre, descripcion, nit, telefono, "", "", sitioweb, "", "", "", "", "", "", "", "", "", "sin_imagen_negocio.jpg", "1"];

        var sql = `
        INSERT INTO negocio(
        id, idRubro, nombre, descripcion, nit, telefono, celular, email, sitioweb, ciudad, zona, barrio, avenida, calle, casa, 
        referencia, latitud, longitud, imagen, estado) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;

        pool.query(sql, values, function(error, resultado){
            resultado["idNegocio"] = idGenerado;
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
                logger.log({level: 'error', label: filename + ' - agregarNegocio', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

module.exports = {
    agregarNegocio
}