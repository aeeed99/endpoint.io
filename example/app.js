let app = require('express')();
let http = require('http').Server(app);
let path = require('path');

let { endpointio, inject } = require('../endpoint.io');
let io = endpointio(http);


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.post('/', inject, (req, res) => {
  res.io.emit('test');
  res.status(204).send();0
});

http.listen(4444, () => {
  console.log("server is listening on 4444")
});