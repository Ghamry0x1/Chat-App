const express = require('express');
const socket = require('socket.io');

let app = express();

let port = 4000;

let server = app.listen(port, () => {
  console.log('- Server running and listening to requests on port ' + port);
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', socket => {
  console.log('- Made a new socket connection with id: ' + socket.id);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

});
