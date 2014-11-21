// policies/getIp.js
module.exports = function getIp (req, res, next) {

  req.query.ip = req.ip;

  // If we made it all the way down here, looks like everything's ok, so we'll let the user through
  next();
};