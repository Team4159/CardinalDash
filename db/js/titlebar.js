const remote = require('electron').remote;
$ = require('jquery');

const loadPage = (page) => {
  $("#contents").html("");
  $("#loading").addClass("fill");
  $("#loading").load("loading.html", () => {
    $("#contents").load(page, () => {
      $("#loading").html("");
      $("#loading").removeClass("fill");
    });
  });
};

const init = () => {
  document.getElementById("dev-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    window.toggleDevTools();
  });

  document.getElementById("min-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    window.minimize();
  });

  document.getElementById("max-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  });

  document.getElementById("close-btn").addEventListener("click", function (e) {
    const window = remote.getCurrentWindow();
    var dialog = require('electron').remote.dialog;
    var choice = dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
    type: 'question',
    buttons: ['Yes', 'No'],
    title: 'Confirm',
    message: 'Are you sure you want to close?'
    });

    if(choice === 0 )
      window.close();
  });
};

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    $('#nav').load("templates/nav.html", () => {
      init();
    });
    $('#contents').load("dashboard.html");
  }
};
