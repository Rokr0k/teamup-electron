import { ipcRenderer } from "electron";

process.once('loaded', () => {
    window.ipc = ipcRenderer;
});