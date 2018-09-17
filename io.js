

function main(http) {

  io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log('a new user connected');
    io.emit('test');
  })
}

main.get = function() {
  try {
    return io;
  }
  catch (e) {
  }
};

module.exports = main;