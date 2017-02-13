const ipcRenderer = require("electron").ipcRenderer;

import { dispatch } from "react-redux";

import * as a from "../store/actions.js";

const robot = {
    connect: (address) => getResponse("connect", "updateState", address),
    disconnect: () => getResponse("disconnect", "updateState"),
    listen: (enabled) => getResponse("listen", "updateState", enabled),
    updateStateHandler: (cb) => {
        ipcRenderer.on("updateState", (event, data) => {
            cb(a.setStatus(data));
        });
    },
    errorHandler: (cb) => {
        ipcRenderer.on("error", (event, data) => {
            cb(a.setError(data));
        });
    }
};

const getResponse = (send, res, ...data) => {
    return new Promise(resolve => {
        ipcRenderer.send(send, ...data);
        ipcRenderer.once(res, response => {
            resolve(response)
        });
    });
}

export default robot;
