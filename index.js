const config = require('./config.js');
const logger = require('./app/logger').logger
const { app, server } = require('./app/app');
//BASE DE DATOS

require('./app/config/database');

// INICIO SERVIDOR
app.listen(app.get('portHttp'), (error) => {
    if(error){
        logger.log({level: 'error', label: 'inicio proyecto', message: `No pudo iniciar el Servidor HTTP en el puerto ${app.get('portHttp')} - ${error}`});
    }else{
        logger.log({level: 'info', label: 'inicio proyecto', message: `Inicio Servidor HTTP en el puerto ${app.get('portHttp')}`});
        logger.log({level: 'info', label: 'inicio proyecto', message: `En el ambiente de ${config.NODE_ENV}`});
    }
})