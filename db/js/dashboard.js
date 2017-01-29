/* load templates */
$('#nav').load("templates/nav.html");

/* dependencies */
const Plotly = require('plotly.js'),
      ipcRenderer = require('electron').ipcRenderer;
      $ = require('jquery');

var everything, value; // from raw json
var time, pdpVoltage; // from everything["values"]

// On receiving robot data from main process (index.js)
ipcRenderer.on('robot-data', function (event, data) {

    everything = JSON.parse(data);
    time = new Date(everything["time"] * 1000);
    values = everything["values"];
    pdpVoltage = values["PDP Voltage"];

    console.log(time);
    console.log(pdpVoltage);

    $('#side-content-content').append(data);
    updateMain();

});

function updateMain() {

}

function getPDPCurrent(num) {
  return values["PDP Current " + num];
}

function getVictorSP(num) {
  return values["VictorSP " + num];
}