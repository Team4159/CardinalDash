/* dependencies */
const ipcRenderer = require('electron').ipcRenderer;
      $ = require('jquery');

var canConnect;

/* electron data event handlers */
ipcRenderer.on('canConnect', (event, data) => {
  canConnect = data;
});
ipcRenderer.on('robot-data', (event, data) => {
  console.log("received " + data);
});

/* button event handlers */
$('#connect-btn').click(function() {
  ipcRenderer.send('ip_address', $('#ip-textbox').val());
});
$('#rec-btn').click(function() {
  if(canConnect) {
    ipcRenderer.send('canConnect', false);
  } else {
    ipcRenderer.send('canConnect', true);
  }
});
$('#save-btn').click(function() {
  ipcRenderer.send('save', true);
});

/* main loop */
const main = () => {

}

/* update timer */
const update = setInterval(main,100);
