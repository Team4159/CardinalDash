'use strict';

/* dependencies */
const ip = require('ip'),
      os = require('os'),
      fs = require('fs'),
      WebSocket = require('ws'),
      electron = require('electron'),
      ws = new WebSocket('ws://ROBORIO'); // change this

var sessionData = [],
    id = 0;

global.canReceive = false;
global.save = false;

ws.on('message', function incoming(data, flags) {
  if(global.canReceive) {
    sessionData.push(id.toString() + ":" + data); // if cole adds id then remove this
    id++;
  }
});


if(global.save) {
  if(sessionData != null) {
    dataDump(sessionData);
    sessionData = [];
    id = 0;
    global.canReceive = false;
    global.save = false;
  } else {
    // tell electron you're saving an empty json idiot
  }
}

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

/* ELECTRON STUFF */

const app = electron.app,  // Module to control application life.
BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var mainWindow = null;

// called when electron is done initializing
app.on('ready', function() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width, height, fullscreenable: true, title: "CardinalDash", frame: false});
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
