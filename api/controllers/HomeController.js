/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function (req,res) {
		sails.log("I'm in HomeController");

		if(req.user) {
			sails.log(req.user);
	        sails.log('------');
	        res.view({
	            user: req.user
	        });
		}
		
		res.view();
    }
	
};

