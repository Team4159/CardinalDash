/* Dependencies */
var el = require('electron').ipcRenderer,
    $ = require('jquery'),
    interact = require('interact.js');

$('#ip-textbox').val("ROBORIO-4159-FRC.local:5800");

$('#connect-btn').click(()=> {

  var ip = $('#ip-textbox').val();

  /* Only send if ip address is not empty */
  if(ip != "") {
    el.send('ip-address', ip);
    $('#connection-text').html('<h2>You are listening to ' + ip + '</h2>');
  }

});

$('#rec-btn').click(()=> {
  el.send('canReceive', null);
});

$('#sav-btn').click(()=> {
  el.send('save', null);
});

var everything, pdpVoltage, pdp0, pdp1, pdp2;

el.on('robot-data', (event, data) => {

  /* Keep match logs scrolled down */
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);

  everything = JSON.parse(data);
  console.log(everything);

  pdpVoltage = everything.data.PDP.Voltage;
  pdp0 = everything.data.PDP.Current[0];
  pdp1 = everything.data.PDP.Current[1];
  pdp2 = everything.data.PDP.Current[2];

  updateData();

});

el.on('error', (event, data) => {
  $('#log-content').append(data + '<br/>');
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);
});

var updateData = () => {
  
  $('#pdpVoltage').html('PDP Voltage<br>' + pdpVoltage);
  $('#pdp0').html('PDP 0 Current<br>' + pdp0);
  $('#pdp1').html('PDP 1 Current<br>' + pdp1);
  $('#pdp2').html('PDP 2 Current<br>' + pdp2);

}

/* ignore interact.js stuff below */

interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // uncomment if you want to display size in pixels
    //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
  });

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

//this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
