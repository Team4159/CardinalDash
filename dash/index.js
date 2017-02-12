// Load Libraries
import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

// Load jquery
window.$ = window.jQuery = require('./static/themes/js/jquery.min.js');

// Load Styles
import "./index.scss";

// Setup Redux
import configureStore from "./store/configureStore";
import { saveState, loadState } from "./store/localState";
const state = loadState();
let basicHistory;
if (process.env.NODE_ENV === "development") {
    basicHistory = hashHistory;
} else {
    basicHistory = browserHistory;
}
const store = configureStore(basicHistory, state);
store.subscribe(() => saveState(store.getState()));
const history = syncHistoryWithStore(basicHistory, store);

// Create and append a div
const appDiv = document.createElement("div");
appDiv.className = "fill";
document.body.appendChild(appDiv);

document.body.className = "fill";
document.documentElement.className = "fill";

// Render the page
import Root from "./ui/root";
ReactDOM.render(
    <Root history={history} store={store} />,
    appDiv
);
