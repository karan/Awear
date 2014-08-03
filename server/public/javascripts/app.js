$(function() {

  var socket = io.connect('http://localhost:3001');
  var Uuid = utils.randUuid();

  $('body').css('background', 'yellow');

  socket.on('someoneConnected', function (connectedUuid) {
    if (connectedUuid === Uuid) {
      $('body').css('background', 'green');
    } else {
      $('body').css('background', 'yellow');
    }
  });

  socket.on('gesture', function (gesture, uuid) {
    console.log(gesture);
  });

});
