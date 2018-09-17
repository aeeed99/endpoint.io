function inject (req, res, next) {
  if (!io) {
    throw new Error('ioWrapper not implemented');
  }
  req.io = io;
  next();
}

function wrapper(http) {
  io = require('socket.io')(http);
  return io;
}

function getSocket() {
  if (!io) {
    return null;
  }
  return io;
}

module.exports = {wrapper, inject};