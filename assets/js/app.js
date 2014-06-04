/**
 * Chat Room
 */

(function($) {
  var messageDiv = $('#messages'),
    newMessage = $('#new-message'),
    chatWindow = $('#chat'),
    userList = $('#users ul'),
    sendButton = $('#send-message');

  io.socket.request('/message');
  io.socket.request('/user');

  io.socket.on('message', function (msg) {
    console.log('message', msg);
    if (msg.data) {
      if (msg.data.body) {
        renderMessage(msg.data);
      } else if (msg.data.loggedIn !== undefined) {
        if (msg.data.loggedIn) {
          var username = msg.data.username;
          userList.append(
            '<li id="user-' + msg.data.id + '">' + username + '</li>'
          );
        } else {
          userList.find('#user-' + msg.data.id).remove();
        }
      } else {
        console.log(msg);
      }
    } else {
      console.log(msg);
    }
  });

  var setChatHeight = function () {
    var height = $(window).height();
    chatWindow.height(height - 130);
  };

  setInterval(setChatHeight, 100);

  var getPastMessages = function () {
    io.socket.get('/message', function (messages) {
      for (var i = 0, len = messages.length; i < len; i++) {
        renderMessage(messages[i]);
      }
    });
  };

  var getUsers = function () {
    io.socket.get('/user', function (users) {
      console.log('users');
      console.log(users);
      console.log('end users');
      for (var i = 0; i < users.length; i++) {
        if (users[i].loggedIn === true) {
          userList.append(
            '<li id="user-' + users[i].id + '">' + users[i].username + '</li>'
          );
        }
      }
    });
  };

  getPastMessages();
  getUsers();


  var renderMessage = function (msg) {
    var time = moment(msg.createdAt).format('YYYY-MM-DD HH:mm');
    messageDiv.append(
      '<p><strong>' + msg.username + ': </strong> ' + msg.body
      + '<br /><span class="time">' + time + '</span>'
      + '</p>'
    );
  };
  var sendMessage = function () {
    io.socket.post('/message', { body: newMessage.val() },
    function (data) {
      renderMessage(data);
    });
    newMessage.val('');
  };

  sendButton.click(sendMessage);
  newMessage.keydown(function (e) {
    if (e.which === 13) sendMessage();
  });
})(jQuery);