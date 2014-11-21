var bcrypt = require('bcrypt');

// policies/anonymizer.js
module.exports = function getIp (req, res, next) {

    if(!req.query.email) { return next(); }
    if(!req.query.ip) return next();

    var salt = bcrypt.genSaltSync(10);

    req.query.email = bcrypt.hashSync(req.query.email, salt); 

    //Create a separate token to be used for the email confirmation code
    req.query.ve_token = bcrypt.hashSync(req.query.email + req.query.ip, salt);

    next();
}