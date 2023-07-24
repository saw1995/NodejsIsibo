const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '.env')
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'local',
    NOMBRE_APP: process.env.NOMBRE_APP || 'clientemicroservicio',
    DIRECTORIO_LOG: process.env.DIRECTORIO_LOG || 'D:/logs',
    DB_HOST: process.env.DB_HOST || '15.229.91.44',
    DB_USER: process.env.DB_USER || 'userDev',
    DB_PASS: process.env.DB_PASS || 'userDev',
    DB_NAME: process.env.DB_NAME || 'clienteServicio'
}