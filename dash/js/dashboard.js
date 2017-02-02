/* Dependencies */
const e = require('electron').ipcRenderer;
      $ = require('jquery');

$('#connect-btn').click(()=> {

  var ip = $('#ip-textbox').val();

  /* Only send if ip address is not empty */
  if(ip != "") {
    e.send('ip-address', ip);
    $('#connection-text').html('<h2>You are listening to ' + ip + '</h2>');
  }

});

$('#rec-btn').click(()=> {
  e.send('canReceive', null);
});

$('#sav-btn').click(()=> {
  e.send('save', null);
});

var everything, pdpVoltage;

e.on('robot-data', (event, data) => {

  $('#log-content').append(data + '<br/>');
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);

  everything = JSON.parse(data);
  pdpVoltage = everything.PDP.Voltage; // Hope this works. If 'undefined', we need to change data structure
  console.log(pdpVoltage);

  updateData();

});

e.on('error', (event, data) => {
  $('#log-content').append(data + '<br/>');
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);
});

const updateData = () => {
  $('#pdpVoltage').html('PDP Voltage: ' + pdpVoltage);
}
