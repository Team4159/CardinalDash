/* Dependencies */
const e = require('electron').ipcRenderer;
      $ = require('jquery');

$('#connect-btn').click(()=> {
  var ip = $('#ip-textbox').val();
  e.send('ip-address', ip);
  $('#connection-text').html('<h2>You are listening to ' + ip + '</h2>')
});

$('#rec-btn').click(()=> {
  e.send('canReceive', null);
});

$('#sav-btn').click(()=> {
  e.send('save', null);
});
