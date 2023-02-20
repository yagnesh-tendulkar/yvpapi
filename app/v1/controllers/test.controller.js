// const logger = require("../logs/logger_def.js");

exports.test = function (req, res) {
    var time = new Date();
    // logger.debug(req.method + " : " + req.originalUrl);
    res.status(200).send(time);
}

exports.pingTest = function(req, res){
    var time = new Date();
    // logger.debug(req.method + " : " + req.originalUrl);
    res.status(200).send(time);
}
