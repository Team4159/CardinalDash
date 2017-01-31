const WebSocketServer = require('ws').Server,
      ip = require('ip');
      wss = new WebSocketServer({port: 8080});

console.log(ip.address() + ":" + 8080);

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      ws.send('something');
    });
});
