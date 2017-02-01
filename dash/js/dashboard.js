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

e.on('robot-data', (event, data) => {
  $('#log-content').append(data);
});

e.on('error', (event, data) => {
  $('#log-content').append(data);
});
