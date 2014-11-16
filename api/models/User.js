/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
  schema: true,

  // Subscribers only get to hear about update and destroy events.
  // This lets us keep our "users online" list accurate, while avoiding
  // sending private messages to anyone but the intended recipient.
  // To get chat messages for a user, you subscribe to the `message`
  // context explicitly.
  autosubscribe: ['destroy', 'update'],
  attributes: {
  	provider: 'STRING',
  	name: 'string',
  	displayName: 'string',
  	password: 'STRING',
  	emailConfirmationStatus: {
  		type: 'STRING',
        defaultsTo: 'UNCONFIRMED'
  	},
  	username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    rooms: {
		collection: 'room',
		via: 'users',
		dominant: true
	},
	rawResponse: 'JSON'

  },

    // Lifecycle Callbacks
/*    beforeCreate: function(values, next) {
      if (values.provider && values.provider === "local"){
        bcrypt.hash(values.password, 10, function(err, hash) {
          if(err) return next(err);
          values.password = hash;
          next();
        });
      }else{
        next();
      }
   }*/
   

	// Hook that gets called after the default publishUpdate is run.
	// We'll use this to tell all public chat rooms about the user update.
	afterPublishUpdate: function (id, changes, req, options) {

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
	
	}

};

