var bcrypt = require('bcrypt');

// policies/anonymizer.js
module.exports = function getIp (req, res, next) {

    if(!req.query.email) { return next(); }
    if(!req.query.ip) return next();

    var salt = bcrypt.genSaltSync(sails.config.crypto.saltFactor); //See the config/crypto.js file

    req.query.email = bcrypt.hashSync(req.query.email, salt); //Salt should be stored in a different database

    //Create a separate token to be used for the email confirmation code
    req.query.ve_token = bcrypt.hashSync(req.query.email + req.query.ip, salt);

    next();
}