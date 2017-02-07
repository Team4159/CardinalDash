/* Dependencies */
var el = require('electron').ipcRenderer,
    $ = require('jquery'),
    interact = require('interact.js');

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

var everything, pdpVoltage;

el.on('robot-data', (event, data) => {

  $('#log-content').append(data + '<br/>');
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);

  everything = JSON.parse(data);

  pdpVoltage = everything.data.PDP.Voltage;

  updateData();

});

el.on('error', (event, data) => {
  $('#log-content').append(data + '<br/>');
  /* Keep match logs scrolled down */
  $("#log-content").scrollTop($("#log-content")[0].scrollHeight);
});

var updateData = () => {
  $('#pdpVoltage').html('PDP Voltage'<br>pdpVoltage);
}

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

  // target elements with the "draggable" class
  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function (event) {
        // uncomment if you want to display pixels moved
        // var textEl = event.target.querySelector('p');
        //
        // textEl && (textEl.textContent =
        //   'moved a distance of '
        //   + (Math.sqrt(event.dx * event.dx +
        //                event.dy * event.dy)|0) + 'px');
      }
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

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
