const pool = require('../config/database');
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);

function agregarUsuario(idNegocio, idRol, ci, ciExt, nombre, appat, apmat, fechaNacimiento, telefono, celular, email, usuario, password){
    return new Promise((resolved, reject) =>{
        
        let id_generado = Date.now();

        const values = [id_generado, idNegocio, idRol, ci, ciExt, "00", nombre, appat, apmat, fechaNacimiento, telefono, celular, "", 
                        email, "", "", "", "", "", "", "", "", "", "sin_imagen_usuario.jpg", usuario, password, "1"];

        var sql = `
        INSERT INTO usuario(
        id, idNegocio, idRol, ci, ciExt, complemento, nombre, appat, apmat, fechaNacimiento, telefono, celular1, celular2, 
        email, ciudad, zona, barrio, avenida, calle, casa, referencia, latitud, longitud, imagen, usuario, password, estado) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;

        pool.query(sql, values, function(error, resultado){
            resultado["idUsuario"] = id_generado;
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
                logger.log({level: 'error', label: filename + ' - agregarUsuario', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

module.exports = {
    agregarUsuario
}