let app = require('express')();
let http = require('http').Server(app);
let path = require('path');

let io = require('./io')(http);

app.get('/', (req, res) => {

  res.status(200).sendFile(path.join(__dirname, './index.html'));

});

app.post('/', (req, res) => {
  io = require('./io').get();

});

http.listen(4444, () => {
  console.log("server is listening on 4444")
});