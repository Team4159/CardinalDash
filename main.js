/* Dependencies */
const WebSocket = require('ws'),
      electron = require('electron'),
      fs = require('fs');

/* Declare server and its variables and initialize electron */
var ws;
var {app, BrowserWindow, ipcMain} = electron;
var mainWindow = null;
var sessionData = [],
    canReceive = false,
    isListening = false,
    id = 0;

/* On receiving a new ip address, connect to it */
ipcMain.on('ip-address', (event, ip) => {

  if(isListening) ws.terminate(); /* End previous connection */

  ws = new WebSocket('ws://' + ip);
  cInfo('Listening to ' + ip);
  isListening = true;

  ws.on('message', (newData, flags) => {
    if(canReceive) {

      /* Log and ack it */
      mainWindow.webContents.send('robot-data', newData);
      cInfo('Rec ' + sizeOf(newData) + ' bytes');
      ws.send('ACK ' + sizeOf(newData));

      /* Add id in front of each data packet */
      newData = "{\"" + id + "\":" + newData + "}";
      sessionData.push(JSON.parse(newData));
      id++
    }
  });

  ws.on('error', (e) => {
    cError(e);
  });

  /* If robot server closes, save and reset */
  ws.on('close', () => {
    if(sessionData.length > 0) dataDump(sessionData);
    sessionData = [];
    canReceive = false;
  });

});

ipcMain.on('canReceive', (event, bleh) => {
  canReceive = !canReceive;
  cAlert("Receiving is " + canReceive);
});

ipcMain.on('save', (event, meh) => {
  if(sessionData.length > 0) dataDump(sessionData);
  sessionData = [];
  canReceive = false;
});

/* Called when electron is done initializing */
app.on('ready', function() {

  /* Get display width, height */
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width, height, fullscreenable: true, title: "CardinalDash", frame: false});

  /* Load initial page */
  mainWindow.loadURL('file://' + __dirname + '/dash/static/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});

// OSX only on close
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
      app.quit();
  }
});

/* Custom log functions */
const cInfo = (data) => {
  console.log("[INFO] " + data);
}
const cAlert = (data) => {
  console.log("[ALERT] " + data);
}
const cError = (data) => {
  mainWindow.webContents.send('error', data);
  console.log("[ERROR] " + data);
}

/* Saves json titled with current date */
function dataDump(jsonData) {
  id = 0;
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return cError(err);
    }
    cAlert(fileName + " saved!");
  });
}

/* Returns string in m-d-yr-h-min format */
function getDate() {
  var d = new Date();
  var m = d.getMonth()+1,
      day = d.getDate(),
      y = d.getFullYear(),
      h = d.getHours(),
      t = d.getMinutes();
  return m + "-" + day + "-" + y + "-" + h + "-" + t;
}

/* Credits to http://stackoverflow.com/questions/1248302/javascript-object-size */
function sizeOf(object) {
  var objectList = [];
  var stack = [ object ];
  var bytes = 0;
  while ( stack.length ) {
    var value = stack.pop();
    if ( typeof value === 'boolean' ) {
      bytes += 4;
    } else if ( typeof value === 'string' ) {
      bytes += value.length * 2;
    } else if ( typeof value === 'number' ) {
      bytes += 8;
    } else if (typeof value === 'object' && objectList.indexOf( value ) === -1) {
      objectList.push( value );
      for( var i in value ) {
        stack.push( value[ i ] );
      }
    }
  }
  return bytes;
}
