import xr from "xr";
import ipcRenderer from "electron";

const robot = {
    connect: (address) => {
        const connect = {address};
        ipcRenderer.send("connect", connect);
        return apiOn("connect_res");
    },
    disconnect: () => {
        ipcRenderer.send("disconnect");
        return apiOn("disconnect_ack");
    },
    listen: () => {
        ipcRenderer.send("disconnect");
        return apiOn("disconnect_ack");
    }
};

function * getResponse(event) {
    ipcRenderer.on(event, (response) => {
        return(response)
    });
}

export default robot;
