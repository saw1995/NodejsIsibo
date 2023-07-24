const express = require('express');
const router = express.Router();
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);
const validarCabecera = require('../libreria/validarCabecera')
const canalControlador = require('../controlador/canalControlador')

/**
 * @swagger
 * /canal/verificaAccesoByCanal:
 *   post:
 *     tags:
 *       - Canal
 *     summary: verifica si tiene el canal el acceso para la acción correspondiente
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
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/canal/verificaAccesoByCanal', async (req, res) => {
  let data = [];
  let codigo = "CLI-99";
  let estado = false;
  let mensaje = "Falta de parametros para la operacion.";
  let respuesta = {data, codigo, estado, mensaje}

  try{
    const { token, dispositivo, ip, canal, acceso } = req.body;
    let valCabecera = validarCabecera.validar(token, dispositivo, ip)
    respuesta = valCabecera

    if(valCabecera["estado"] == true){
      respuesta = await canalControlador.verificaAccesoByCanal(req.body);
    }
    
  }catch(error){
    data = [];
    codigo = "CLI-1";
    estado = false;
    mensaje = error;
    respuesta = {data, codigo, estado, mensaje}
    logger.log({level: 'error', label: filename + ' - verificaAccesoByCanal', message: JSON.stringify(respuesta) + " || parametros: " + req.body});
  }

  res.status(200).json(respuesta);
});

module.exports = router;