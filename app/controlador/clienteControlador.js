const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);
const canalModelo = require('../modelo/canalModelo');
const clienteModelo = require('../modelo/clienteModelo');

function agregarCliente(entrada){
    return new Promise(async (resolved, reject) =>{
        let data = [];
        let codigo = "0";
        let estado = true;
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
                logger.log({level: 'info', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            let clienteCi = await clienteModelo.clienteByCiExtComplemento(entrada.ci, entrada.ext, entrada.complemento, "1");
            if(clienteCi.length > 0){
                data = [];
                codigo = "CLI2";
                estado = false;
                mensaje = "El cliente ya se  encuentra registrado";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            let clienteUsuario = await clienteModelo.clienteByUsuario(entrada.usuario);
            if(clienteUsuario.length > 0){
                data = [];
                codigo = "CLI3";
                estado = false;
                mensaje = "Otro cliente ya tiene el usuario registrado, favor intente uno nuevo";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            let cliente = await clienteModelo.agregarCliente(entrada.ci, entrada.ext, entrada.complemento, entrada.nombre, entrada.appat, entrada.apmat, entrada.celular, entrada.email, entrada.tipoCuenta, entrada.usuario, entrada.password);
            if(cliente.affectedRows == 0){
                data = [];
                codigo = "CLI4";
                estado = false;
                mensaje = "No se pudo almacenar en base de datos la informacion del cliente.";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }

            data = {"id_cliente": cliente.id_cliente}
            respuesta = {data, codigo, estado, mensaje}

        }catch(error){
            data = [];
            codigo = "CLI-2";
            estado = false;
            mensaje = error;
            respuesta = {data, codigo, estado, mensaje}
            logger.log({level: 'error', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
        }

        return resolved(respuesta);
    })
}

function clienteByUsuarioPassword(entrada){
    return new Promise(async (resolved, reject) =>{
        let data = [];
        let codigo = "0";
        let estado = true;
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
                logger.log({level: 'info', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }
            let cliente = await clienteModelo.clienteByUsuarioPassword(entrada.usuario, entrada.password);
            if(cliente["data"].length == 0){
                data = [];
                codigo = "CLI2";
                estado = false;
                mensaje = "Usuario y/o contraseña incorrecto";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }
            const date = new Date();
            const fecha = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
            const hora = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
            let login = await clienteModelo.agregarLogin(cliente["data"][0]["idCliente"], entrada.canal, entrada.dispositivo, "Inicio por usuario y contraseña", fecha, hora);
            if(login.affectedRows == 0){
                data = [];
                codigo = "CLI3";
                estado = false;
                mensaje = "No se pude registrar el login al cliente";
                respuesta = {data, codigo, estado, mensaje}
                logger.log({level: 'info', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
                return resolved(respuesta);
            }
            console.log("5");
            data = {"idLogin": login.idLogin}
            respuesta = {data, codigo, estado, mensaje}
            console.log("6");
            respuesta = cliente

        }catch(error){
            console.log(error);
            data = [];
            codigo = "CLI-2";
            estado = false;
            mensaje = error + "";
            respuesta = {data, codigo, estado, mensaje}
            logger.log({level: 'error', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
        }

        return resolved(respuesta);
    })
}

//export
module.exports = {
    agregarCliente,
    clienteByUsuarioPassword
}