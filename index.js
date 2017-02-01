'use strict';

/* dependencies */
const ip = require('ip'),
      os = require('os'),
      fs = require('fs'),
      WebSocket = require('ws'),
      electron = require('electron'),
      {app, BrowserWindow, ipcMain} = electron;

// client vars
var sessionData = [],
    id = 0,
    ws;

ipcMain.on('ip_address', (event, data) => {

  try {
    ws = new WebSocket('ws://' + data.substring(1,data.length-1));

    // on receiving message from server
    ws.on('message', function incoming(data, flags) {
      if(global.canReceive) {
        sessionData.push(id.toString() + ":" + data); // if cole adds id then remove this
        id++;
        mainWindow.webContents.send('robot-data', data);
        cAlert("Received " + sizeOf(data));
        ws.send("ACK " + sizeOf(data));
      }
    });
    console.log("connected to " + data);

  } catch (e) {
    cError("Could not connect to " + data);
  }

});

ipcMain.on('save', (event, data) => {

  if(sessionData != null) {
    dataDump(sessionData);
    sessionData = [];
    id = 0;
  } else {
    console.log("Idiot you're saving an empty array");
  }

});

/* saves json titled with current date */
const dataDump = (jsonData) => {
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return cError(err);
    }
    cAlert(fileName + " saved!");
  });
}

/* returns string in m-d-yr-h:min format */
const getDate = () => {
  var d = new Date();
  var m = d.getMonth()+1,
      day = d.getDate(),
      y = d.getFullYear(),
      h = d.getHours(),
      t = d.getMinutes();
  return m + "-" + day + "-" + y + "-" + h + ":" + t;
}

// Credits to http://stackoverflow.com/questions/1248302/javascript-object-size
const sizeOf = (object) => {
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
const cInfo = (data) => {
  console.log("[INFO] " + data);
}
const cAlert = (data) => {
  console.log("[ALERT] " + data);
}
const cError = (data) => {
  console.log("[Error] " + data);
}

/* ELECTRON STUFF */
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
