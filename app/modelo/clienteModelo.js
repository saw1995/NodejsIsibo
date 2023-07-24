const pool = require('../config/database');
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);

function agregarCliente(ci, ext, complemento, nombre, appat, apmat, celular, email, tipoCuenta, usuario, password){
    return new Promise((resolved, reject) =>{
        let id_generado = Date.now();
        const values = [id_generado, ci, ext, complemento, nombre, appat, apmat, "", celular, "", email, "", "", "", "", "", "", "", "", "", "sin_imagen_cliente.jpg", tipoCuenta, usuario, password, "1"];

        var sql = `
        INSERT INTO cliente(id, ci, ciExt, complemento, nombre, appat, apmat, telefono, celular1, celular2, email, ciudad, zona, barrio, avenida, calle, casa, referencia, latitud, longitud, imagen, tipoCuenta, usuario, password, estado)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;

        pool.query(sql, values, function(error, resultado){
            resultado["idCliente"] = id_generado;
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
                logger.log({level: 'error', label: filename + ' - agregarCliente', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

function agregarLogin(idCliente, idCanal, dispositivo, observacion, fechaInicio, horaInicio){
    return new Promise((resolved, reject) =>{
        let id_generado = Date.now();
        const values = [id_generado, idCliente, idCanal, dispositivo, observacion, fechaInicio, horaInicio, "1"];

        var sql = `
        INSERT INTO login(id, idCliente, idCanal, dispositivo, observacion, fechaInicio, horaInicio, estado)
        VALUES(?,?,?,?,?,?,?,?);
        `;

        pool.query(sql, values, function(error, resultado){
            resultado["idLogin"] = id_generado;
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
                logger.log({level: 'error', label: filename + ' - agregarLogin', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

function clienteByCiExtComplemento(ci, ext, complemento, estado){
    return new Promise((resolved, reject) =>{
        const values = [ci, ext, complemento, estado];

        var sql = `
        SELECT cliente.id as 'idCliente', nombre, appat, apmat
        FROM cliente
        WHERE ci = ? and ciExt = ? and complemento = ? and estado = ?
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
                logger.log({level: 'error', label: filename + ' - clienteByCiExtComplemento', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

function clienteByUsuario(usuario){
    return new Promise((resolved, reject) =>{
        const values = [usuario];

        var sql = `
        SELECT cliente.id as 'idCliente', nombre, appat, apmat
        FROM cliente
        WHERE usuario = ?
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
                logger.log({level: 'error', label: filename + ' - clienteByUsuario', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

function clienteByUsuarioPassword(usuario, password){
    return new Promise((resolved, reject) =>{
        const values = [usuario, password];

        var sql = `
        SELECT cliente.id as 'idCliente', nombre, appat, apmat
        FROM cliente
        WHERE cliente.usuario = ? and cliente.password = ?
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
                logger.log({level: 'error', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(respuesta)});
            }

            return resolved(respuesta)
        });
    })
}

module.exports = {
    agregarCliente,
    agregarLogin,
    clienteByCiExtComplemento,
    clienteByUsuario,
    clienteByUsuarioPassword
}