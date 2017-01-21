const express = require('express'),
      http = require('http'),
      url = require('url'),
      ip = require('ip'),
      fs = require('fs'),
      WebSocket = require('ws'),
      port = 5800; // 5800 - 5810 for FRC fms

const app = express(),
      server = http.createServer(app),
      wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {

  var sessionData = {};
  cInfo('Robot connected')
  ws.send('Connected to ws server!');

  ws.on('data', function incoming(data) {
    sessionData.push(data);
    ws.send('received' + data);
    cInfo('received: ' + data);
  });

  ws.on('close', function close() {
    dataDump(sessionData);
    cInfo('Robot disconnected');
  });
});

function dataDump(jsonData) {
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return console.log(err);
    }
    cInfo(fileName + " saved!");
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

function cWarning(data) {
  console.log("[Warning] " + data);
}

function cError(data) {
  console.log("[Error] " + data);
}

server.listen(port, function listening() {
  cInfo('Listening on ' + ip.address() + ':' + port);
});
