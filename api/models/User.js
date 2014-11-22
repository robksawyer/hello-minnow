/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt'),
    uuid = require('uuid');

module.exports = {
	
  schema: true,

  attributes: {
    /*id: {
      type: 'string',
      primaryKey: true
    },*/
    facebookId: { 
      type: 'string',
      unique: true
    },
    username: { 
      type: 'string', 
      unique: true 
    },
    email: { 
      type: 'string',  
      unique: true 
    },
    phone: {
      type: 'string',
      unique: true
    },
    emailConfirmationStatus: {
      type: 'string',
      defaultsTo: 'unconfirmed'
    },
    phoneConfirmationStatus: {
      type: 'string',
      defaultsTo: 'unconfirmed'
    },
    passports : { 
      collection: 'Passport', 
      via: 'user' 
    },
    posts: {
      collection: 'post',
      via: 'owner'
    },
    likes: 'int',
    comments: 'int',
    rawResponse: 'JSON',
    token: 'string',
    vp_token: 'string', //Sent when the user signs up via a phone number. This token is sent along with a text message
    ve_token: 'string' //Sent along with an email and allows the url to verify their email 
  },
   
  /**
   * Callback to be run before creating a User.
   *
   * @param {Object}   user The soon-to-be-created user
   * @param {Function} next
   */
  /*beforeCreate: function (user, next) {

    user.id = uuid.v4(); //Create the uuid

    delete user.ip;
    
    next(null, user);

  },*/

	// Hook that gets called after the default publishUpdate is run.
	// We'll use this to tell all public chat rooms about the user update.
	/*afterPublishUpdate: function (id, changes, req, options) {

		// Get the full user model, including what rooms they're subscribed to
		User.findOne(id).populate('rooms').exec(function(err, user) {
			// Publish a message to each room they're in.  Any socket that is 
			// subscribed to the room will get the message. Saying it's "from" id:0
			// will indicate to the front-end code that this is a systen message
			// (as opposed to a message from a user)
			sails.util.each(user.rooms, function(room) {
				var previousName = options.previous.name == 'unknown' ? 'User #'+id : options.previous.name;
				Room.message(room.id, {room:{id:room.id}, from: {id:0}, msg: previousName+" changed their name to "+changes.name}, req);		
			});
			
		});
	
	}*/

};

