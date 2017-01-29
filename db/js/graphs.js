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
    //readFile(fileNames[0]);
    makeGraph(fileNames[0]);
   }
  });
});

// function readFile(filepath){
//   fs.readFile(filepath, 'utf-8', function (err, data) {
//     if(err){
//       alert("An error ocurred reading the file :" + err.message);
//       return;
//     }
//     makeGraphs(data);
//   });
// }
//
// var everything;
//
// function makeGraphs(data) {
//   everything = JSON.parse(JSON.stringify(data));
// }

function makeGraph(jsonFile) {
  Plotly.d3.json(jsonFile, function(figure){
    console.log(figure);
  });
}
