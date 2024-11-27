const {app, BrowserWindow} = require("electron")
const path = require ("path");
const url = require("url");
//const pre = require("./Preload/preload")
function creatmainwindow (){
    const mainWindow = new BrowserWindow(
        {
            title: 'Smart-Mirror',
            width: 1000,
            height: 600,
            webPreferences: {
                //webContents: true,
                preload: path.resolve(__dirname,'./Preload/preload.js'),
      contextIsolation: true, // Secure the context
      nodeIntegration: false, // Disable Node.js in the renderer
           sandbox: false,    
            }
        }
    );
    const startUrl = url.format({
        pathname: path.join(__dirname,"./mirror-app/build/index.html"),

        protocol: 'file',
    })

    mainWindow.loadURL(startUrl);
    console.log("heloooooooo"+path.join(__dirname, './Preload/preload.js'));

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(creatmainwindow);