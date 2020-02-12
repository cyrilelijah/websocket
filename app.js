const { app, BrowserWindow, Menu, screen } = require('electron');
const esje = require('ejs-electron');
const path = require('path');
const url = require('url');
let server = require('./server.js');

Menu.setApplicationMenu(false);
app.allowRendererProcessReuse = true;
app.on('ready', () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    let mainForm = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: { nodeIntegration: true },
        title: "Test WebSocket"
    });

    mainForm.loadURL(url.format({
        pathname: path.join(__dirname, 'views', 'index.ejs'),
        protocol: 'file',
        slashes: true
    }));

    mainForm.webContents.openDevTools();

    mainForm.on('close', () => {
        mainForm = null;
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){ 
        app.quit();
    }
});
