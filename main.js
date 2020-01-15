const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron');
const { downloadFile } = require('./modules/utils')
let downPath = "C:\\test";

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 370,
        // transparent: true,   // transparent background
        frame: false,        // frameless window
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    // DevTools
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('request-test', (event) => {
    let fileURL = "https://github.com/minyong-jeong/minyong-jeong.github.io/raw/master/images/ryan.jpg";
    downloadFile(win, fileURL, downPath);
});