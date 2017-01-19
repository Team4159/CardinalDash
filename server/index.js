// dependencies
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var ip = require('ip');

// ports 5800 - 5810 available for fms
var port = 5800;

// On Connect
io.on('connection', function (socket) {

  var jsonData = {};
  console.log("Robot connected!")

  // On receiving data
  socket.on('sendData', function (data) {
    jsonData.push(data);
  });

  // On disconnect
  socket.on('disconnect', function () {
    dataDump(jsonData);
  });
});

function dataDump(jsonData) {
  var fileName = "data/" + getDate() + ".json";
  fs.writeFile(fileName, jsonData, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Connection ended. " + fileName + " saved!");
  });
}

function getDate() {
  var d = new Date();
  var m = d.getMonth()+1,
      day = d.getDate(),
      y = d.getFullYear(),
      h = d.getHours(),
      t = d.getMinutes();
  return m + "-" + day + "-" + y + "-" + h + ":" + t;
}

server.listen(port, function() {
  console.log("server started on " + ip.address() + ":" + port);
});
