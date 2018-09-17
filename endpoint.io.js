console.log('START OF SCRIPT ', typeof io);

function inject (req, res, next) {
  console.log('injecting, wrapper is ', typeof io);
  if (!io) {
    throw new Error('io not implemented');
  }
  res.io = io;
  next();
}

function io(http) {

  io = require('socket.io')(http);
  return io;
}
io.get = getio;

function getio() {
  if (!io) {
    return null;
  }
  return io;
}

module.exports = {io, inject, getio};