const express = require('express');
const fileUpload = require('express-fileupload')
const net = require('net');
//el cors autorizacion par otras app
const cors = require('cors');

const portHttp  = (process.env.PORT || 4005)

// INICIALIZACION
const app = express();

app.use(cors({
    origin: '*'
}));

// CONFIGURACION
app.set('portHttp', portHttp);
// LOG'S

// MIDDLEWARES
app.use(cors());
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static('imagenes'));

// RUTAS
app.use(require('./ruta/canalRuta'));
app.use(require('./ruta/clienteRuta'));

const swaggerSetup = require('./swagger');
swaggerSetup(app);

module.exports = {
    app
}