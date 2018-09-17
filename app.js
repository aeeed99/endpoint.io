let app = require('express')();
let http = require('http').Server(app);
let path = require('path');

console.log('gonna require io');
let io = require('./endpoint.io').wrapper(http);

setTimeout(() =>require('./io'), 2000);

app.get('/', (req, res) => {

  res.status(200).sendFile(path.join(__dirname, './index.html'));

});

app.post('/', require('./io').inject, (req, res) => {
  res.io.emit('test');
  res.status(204).send();
});

http.listen(4444, () => {
  console.log("server is listening on 4444")
});