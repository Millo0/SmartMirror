const {contextBridge} = require ("electron");

const os = require("os");

contextBridge.exposeInMainWorld("electron", {
    homeDir:()=> os.homedir(),
    //os: os
});