module.exports = function(req, res, next) {
  	if (req.session.passport.user) {
  		User.findById(req.session.passport.user, function(err, user) {
		 	if(err) {
		  		console.log(err);
		 	} else {
		   		req.body.username = user[0].username;
				next();
		 	};
		});
	} else {
		console.log('Failed Message.');
		res.send('Must be logged in.');
	}
};
