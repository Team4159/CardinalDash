'use strict';

/* dependencies */
const express = require('express'),
      http = require('http'),
      ip = require('ip'),
      os = require('os'),
      fs = require('fs'),
      WebSocket = require('ws'),
      electron = require('electron');

/* ws vars */
var port = 5800, /* 5800 - 5810 available for FRC fms */
    canConnect = true,
    sessionData = [],
    time = 0,
    delayTimer;
    
const expressApp = express(),
      server = http.createServer(expressApp),
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

  /* On new connection */
  cInfo('Robot connected')
  ws.send('CONNECTED TO ' + ip.address() + ':' + port);

  // Checks for timeout every one second
  delayTimer = setInterval(function() {
    if(time <= 5) {
      time++;
    } else {
      // If timeout is more than 5 seconds
      ws.terminate();
      time = 0;
      clearInterval(delayTimer);
    }
  }, 1000);

  /* on receiving data */
  ws.on('message', function incoming(data) {
    time = 0;
    sessionData.push(data);
    ws.send('ACK ' + roughSizeOfObject(data));
    cAlert(data);
  });

  ws.on('close', function close() {
    dataDump(sessionData);
    cInfo('Robot disconnected');
    sessionData = [];
    canConnect = true;  });
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

// Credits to http://stackoverflow.com/questions/1248302/javascript-object-size
function roughSizeOfObject(object) {
  var objectList = [];
  var stack = [ object ];
  var bytes = 0;
  while ( stack.length ) {
    var value = stack.pop();

    if ( typeof value === 'boolean' ) {
      bytes += 4;
    }
    else if ( typeof value === 'string' ) {
      bytes += value.length * 2;
    }
    else if ( typeof value === 'number' ) {
      bytes += 8;
    }
    else if
    (
      typeof value === 'object'
      && objectList.indexOf( value ) === -1
    )
    {
      objectList.push( value );

      for( var i in value ) {
        stack.push( value[ i ] );
      }
    }
  }
  return bytes;
}

server.listen(port, function listening() {
  cInfo('Listening on ' + ip.address() + ':' + port + ' or ' + os.hostname() + ":" + port);
});

/* ELECTRON STUFF */

const app = electron.app,  // Module to control application life.
      BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var mainWindow = null;

// called when electron is done initializing
app.on('ready', function() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({width, height});
  mainWindow.loadURL('file://' + __dirname + '/db/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// osx on quit
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
