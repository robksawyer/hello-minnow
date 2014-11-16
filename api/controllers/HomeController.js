/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function (req,res) {
        console.log(req.user);
        res.view({
            user: req.user
        });
    },
	
};

