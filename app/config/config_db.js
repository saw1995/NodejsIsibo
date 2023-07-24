const config = require('../../config.js');
module.exports = {
    database: {
        host: `${config.DB_HOST}`,
        user: `${config.DB_USER}`,
        password: `${config.DB_PASS}`,
        database: `${config.DB_NAME}`
    }
}