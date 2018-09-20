# endpoint.io - socket emitting everywhere!

endpoint.io is [express](https://expressjs.com) middleware that wraps around [socket.io](socket.io), which manages
the socket object as a singleton, and exposes it

> installing this package also installs socket.io and opens its connection when the main function is invoked, so there is no need to install socket.io directly. If you prefer to manage socket.io yourself and just use the endpoint.io wrapper, try using [endpoint-wrapper.io](https://www.npmjs.com/package/endpoint-wrapper.io)

## Usage (high-level)

Attach `http` to `endpoint.io`. **This must be done before using `inject`**, so add it near the top of your file, ususaly `app.js`

```javascript
let http = require('http');
let io = require('endpoint.io')(http);
// `io` is the same object socket.io returns.
```

You can then inject `io` into express middleware in any files (even seperate route files), and gain access to it via `res`

```javascript

let { inject } = require('endpoint.io');


router.post('/notify', inject, (req, res) => {

    res.io.emit('event-from-endpoint', ...req.body);

    res.status(200).send('data emitted via socket');
});
```

### res.emit

This method emits an event _and_ sends a 200 status if it succeeds (and 500 if it fails);

```javascript

let { inject } = require('endpoint.io');

router.post('/notify', inject, (req, res) => {

    res.emit('socket-response', ...req.body);

});
```

In the body of the response, the information emitted by the method is also made available.


### endpointio.get

You can also get your `io` outside of express middleware in arbitrary context via `get`

```javascript
let endpointio = require('endpoint.io');

setTimeout(() => {
    io = endpointio.get();
    io.emit('another-socket-event', 'hello from yet another file!');
});
```

Enjoy emitting events from everywhere!

## Usage (alternate setup)

Rather than requiring in endpoint.io and invoking it to get setup, you can additionally deconstruct the main function as `endpointio`. This might be useful if you want to use both the main function and `inject`/`get` in the same file, and really, really hate requiring in the same module twice.

```javascript
let http = require('http');
let { endpointio, inject, get } = require('endpoint.io');
let io = endpointio(http);

app.post('/emit', inject, (req, res) => {
    res.emit('event', {id: 1234});
});
```

