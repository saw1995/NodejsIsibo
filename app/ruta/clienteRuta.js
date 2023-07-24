const express = require('express');
const router = express.Router();
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);
const validarCabecera = require('../libreria/validarCabecera')
const clienteControlador = require('../controlador/clienteControlador')

/**
 * @swagger
 * /cliente/agregarCliente:
 *   post:
 *     tags:
 *       - Canal
 *     summary: Agregar al cliente con los datos basicos
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               dispositivo:
 *                 type: string
 *               ip:
 *                 type: string
 *               canal:
 *                 type: string
 *               acceso:
 *                 type: string
 *               ci:
 *                 type: string
 *               ext:
 *                 type: string
 *               nombre:
 *                 type: string
 *               appat:
 *                 type: string
 *               apmat:
 *                 type: string
 *               celular:
 *                 type: string
 *               email:
 *                 type: string
 *               tipoCuenta:
 *                 type: string
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/cliente/agregarCliente', async (req, res) => {
  let data = [];
  let codigo = "CLI-99";
  let estado = false;
  let mensaje = "Falta de parametros para la operacion.";
  let respuesta = {data, codigo, estado, mensaje}

  try{
    const { token, dispositivo, ip } = req.body;
    let valCabecera = validarCabecera.validar(token, dispositivo, ip)
    respuesta = valCabecera

    if(valCabecera["estado"] == true){
      respuesta = await clienteControlador.agregarCliente(req.body);
    }
    
  }catch(error){
    data = [];
    codigo = "CLI-1";
    estado = false;
    mensaje = error;
    respuesta = {data, codigo, estado, mensaje}
    logger.log({level: 'error', label: filename + ' - agregarCliente', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
  }

  res.status(200).json(respuesta);
});

/**
 * @swagger
 * /cliente/clienteByUsuarioPassword:
 *   post:
 *     tags:
 *       - Canal
 *     summary: Busca a cliente por usuario y contraseña (LOGIN)
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               dispositivo:
 *                 type: string
 *               ip:
 *                 type: string
 *               canal:
 *                 type: string
 *               acceso:
 *                 type: string
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/cliente/clienteByUsuarioPassword', async (req, res) => {
  let data = [];
  let codigo = "CLI-99";
  let estado = false;
  let mensaje = "Falta de parametros para la operacion.";
  let respuesta = {data, codigo, estado, mensaje}

  try{
    const { token, dispositivo, ip } = req.body;
    let valCabecera = validarCabecera.validar(token, dispositivo, ip)
    respuesta = valCabecera

    if(valCabecera["estado"] == true){
      respuesta = await clienteControlador.clienteByUsuarioPassword(req.body);
    }
    
  }catch(error){
    data = [];
    codigo = "CLI-1";
    estado = false;
    mensaje = error;
    respuesta = {data, codigo, estado, mensaje}
    logger.log({level: 'error', label: filename + ' - clienteByUsuarioPassword', message: JSON.stringify(entrada) + "," + JSON.stringify(respuesta)});
  }

  res.status(200).json(respuesta);
});

module.exports = router;