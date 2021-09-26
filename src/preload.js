const {ipcRenderer} = require("electron");

process.once('loaded', () => {
    window.ipc = ipcRenderer;
});