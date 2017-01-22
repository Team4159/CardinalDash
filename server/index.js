const express = require('express'),
      http = require('http'),
      url = require('url'),
      ip = require('ip'),
      fs = require('fs'),
      WebSocket = require('ws');

var port = 5800,
    canConnect = true;
    sessionData = [];

const app = express(),
      server = http.createServer(app),
      wss = new WebSocket.Server({
        server: server,
        verifyClient: function() {
          if (canConnect) {
            canConnect = false;
            return true;
          }
          return false;
        }
      });

wss.on('connection', function connection(ws) {

  cAlert('Robot connected')
  ws.send('Connected to ws server!');

  ws.on('message', function incoming(data) {
    sessionData.push(data);
    ws.send('You sent: ' + data);
    cAlert('Received: ' + data);
  });

  ws.on('close', function close() {
    dataDump(sessionData);
    cInfo('Robot disconnected');
    sessionData = [];
    canConnect = true;
  });
});

function dataDump(jsonData) {
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return cError(err);
    }
    cAlert(fileName + " saved!");
  });
}

function getDate() {
  var d = new Date();
  var m = d.getMonth()+1,
      day = d.getDate(),
      y = d.getFullYear(),
      h = d.getHours(),
      t = d.getMinutes();
  return m + "-" + day + "-" + y + "-" + h + ":" + t;
}

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
