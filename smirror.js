const {app, BrowserWindow} = require("electron")
const path = require ("path");
const url = require("url");

function creatmainwindow (){
    const mainWindow = new BrowserWindow(
        {
            title: 'Smart-Mirror',
            width: 1000,
            height: 600,
            webPreferences: {nodeIntegration: true}
        }
       
    );
    const startUrl = url.format({
        pathname: path.join(__dirname,"./mirror-app/build/index.html"),

        protocol: 'file',
    })

    mainWindow.loadFile( path.join(__dirname,"./mirror-app/build/index.html"));
}

app.whenReady().then(creatmainwindow);