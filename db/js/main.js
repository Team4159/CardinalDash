const Plotly = require('plotly.js'),
      ipcRenderer = require('electron').ipcRenderer;
      $ = require('jquery');

ipcRenderer.on('robot-data', function (event, data) {
    console.log(data);
    $('#side-content-content').append(data);
    updateMain();
});

function updateMain() {

}
