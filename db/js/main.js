const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('store-data', function (event, data) {
    console.log(data);
});
