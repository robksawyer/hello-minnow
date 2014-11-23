/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function (req, res) {
		
		if(req.user) {
			sails.log('HomeController.js');
			sails.log(req.user);
	        sails.log('------');
	        res.view({
	            user: req.user
	        });
		}
		
		res.view();
    }
	
};

