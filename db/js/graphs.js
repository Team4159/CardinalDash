/* dependencies */
const Plotly = require('plotly.js'),
      $ = require('jquery'),
      app = require('electron').remote,
      dialog = app.dialog,
      fs = require('fs');

/* load templates */

$('#load-btn').click(function() {
  dialog.showOpenDialog(function (fileNames) {
    // fileNames is an array that contains all the selected
   if(fileNames === undefined){
    console.log("No file selected");
   } else {
    readFile(fileNames[0]);
   }
  });
});

var everything;

function readFile(filepath){
  fs.readFile(filepath, 'utf-8', function (err, data) {
    if(err){
      alert("An error ocurred reading the file :" + err.message);
      return;
    }
    everything = JSON.parse(JSON.stringify(data));
    console.log(everything);
  });
}
