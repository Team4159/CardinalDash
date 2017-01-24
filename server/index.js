/* dependencies */
const express = require('express'),
      http = require('http'),
      ip = require('ip'),
      fs = require('fs'),
      WebSocket = require('ws');

/* server vars */
var port = 5800, /* 5800 - 5810 available for FRC fms */
    canConnect = true;
    sessionData = [];

const app = express(),
      server = http.createServer(app),
      wss = new WebSocket.Server({
        server: server,
        /* only allow one client at a time */
        verifyClient: function() {
          if (canConnect) {
            canConnect = false;
            return true;
          }
          return false;
        }
      });

wss.on('connection', function connection(ws) {
  /* on new connection */
  cAlert('Robot connected')
  ws.send('CONNECTED TO ' + ip.address() + ':' + port);

  /* on receiving data */
  ws.on('message', function incoming(data) {
    sessionData.push(data);
    ws.send(Date.now() + 'RECEIVED');
    cAlert('Received: ' + data);
  });

  /* on disconnect */
  ws.on('close', function close() {
    dataDump(sessionData);
    cInfo('Robot disconnected');
    sessionData = [];
    canConnect = true;
  });
});

/* saves json titled with current date */
function dataDump(jsonData) {
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return cError(err);
    }
    cAlert(fileName + " saved!");
  });
}

/* returns string in m-d-yr-h:min format */
function getDate() {
  var d = new Date();
  var m = d.getMonth()+1,
      day = d.getDate(),
      y = d.getFullYear(),
      h = d.getHours(),
      t = d.getMinutes();
  return m + "-" + day + "-" + y + "-" + h + ":" + t;
}

/* custom log functions */
function cInfo(data) {
  console.log("[INFO] " + data);
}
function cAlert(data) {
  console.log("[ALERT] " + data);
}
function cError(data) {
  console.log("[Error] " + data);
}

server.listen(port, function listening() {
  cInfo('Listening on ' + ip.address() + ':' + port);
});
