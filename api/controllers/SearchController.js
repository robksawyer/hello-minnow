/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function( req, res){
		console.log("Hi from SearchController!");
        res.view();
	}
};

