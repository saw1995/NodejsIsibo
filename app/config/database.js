const mysql = require("mysql");
const { promisify } = require('util');
const { database } = require('./config_db');
const logger = require('../logger').logger
const path = require('path');
const filename = path.basename(__filename);

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        console.error('DATABASE:'+err);
        logger.log({level: 'error', label: filename, message: err});
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION HAS REFUSED');
        }
    }
    if(connection){
        connection.release();
        logger.log({level: 'info', label: filename, message: 'La Base de Datos esta conectado'});
        return;
    }
});

pool.query = promisify(pool.query)

module.exports = pool;