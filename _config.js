const dotenv = require('dotenv').config();
var config = {};

// create keys object for keyvault values
if (dotenv) {
    var env = {
        mongoUrl: {},
        insightsBackendUrl: {}
    };
    env.mongoUrl['in'] = process.env.DB_URI_DEV;
    env.insightsBackendUrl['in'] = process.env.INSIGHTS_BACKEND_URL;

} else {
    console.log(".env not found, fetching from real env variables");
}

// get keyvault values - if configured
config.mongoURI = {
    production: env.mongoUrl.in,
    development: env.mongoUrl.in,
}

// Exporting _config as module
module.exports = config;