const ipcRenderer = require("electron").ipcRenderer;

import * as a from "../store/actions.js";

const robot = {
    connect: (address) => getResponse("connect", "updateStatus", address),
    disconnect: () => getResponse("disconnect", "updateStatus"),
    listen: (enabled) => getResponse("listen", "updateStatus", enabled),
    updateStateHandler: (cb) => {
        ipcRenderer.on("updateStatus", (event, data) => {
            cb(a.setStatus(data));
        });
    },
    errorHandler: (cb) => {
        ipcRenderer.on("error", (event, data) => {
            cb(a.setError(data));
        });
    },
    dataHandler: (cb) => {
        ipcRenderer.on("data", (event, data) => {
            const parsedData = JSON.parse(data);
            cb(a.setData(parsedData[ Object.keys(parsedData)[ 0 ] ].data));
        });
    }
};

const getResponse = (send, res, ...data) => {
    return new Promise(resolve => {
        ipcRenderer.send(send, ...data);
        ipcRenderer.once(res, response => {
            resolve(response);
        });
    });
};

export default robot;
