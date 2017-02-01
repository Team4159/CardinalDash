const WebSocketServer = require('ws').Server,
      ip = require('ip');
      wss = new WebSocketServer({port: 8080});

console.log(ip.address() + ":" + 8080);

var tick = 0;
var uhh;

const update = setInterval( () => {
  try {
    uhh.send(tick);
  } catch (e) {
  }
  console.log(tick);
  tick++;
}, 500);

wss.on('connection', function(ws) {
  uhh = ws;
});
