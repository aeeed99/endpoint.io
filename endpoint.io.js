function main(http) {
  io = require('socket.io')(http);
  return io;
}

function inject (req, res, next) {

  if (!io) {
    throw new Error('io not implemented');
  }

  res.io = io;

  res.emit = (eventName, ...data) => {
    try {
      io.emit(eventName, ...data);
      res.status(200).send({eventName, data});
    }
    catch (e) {
      res.status(500).send(e);
    }
  };

  next();
}

function get() {
  if (!io) {
    return null;
  }
  return io;
}

main.inject = inject;
main.get = get;
main.endpointio = main;
module.exports = main;