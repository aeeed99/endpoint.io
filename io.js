
function main(http) {

  io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log('a new user connected');
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