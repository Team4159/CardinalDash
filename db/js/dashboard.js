/* dependencies */
const ipcRenderer = require('electron').ipcRenderer;
      $ = require('jquery');

$('#connect-btn').click(function() {
  global.ip = $('#ip-textbox').val();
});

const main = () => {
  if(global.ip == null) {
    $('#connection-text').html("<h2>You are NOT connected.</h2>");
  } else {
    $('#connection-text').html("<h2>You ARE connected.</h2>");
  }
}

const update = setInterval(main,100);
