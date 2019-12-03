const { app, BrowserWindow } = require('electron')

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // transparent: true,   // transparent background
        // frame: false,        // frameless window
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    // DevTools
    win.webContents.openDevTools();

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

const { ipcMain } = require('electron');
const request = require('request');
const fs = require('fs');

function downloadFile(file_url, targetPath) {
    let received_bytes = 0;
    let total_bytes = 0;

    let req = request({
        method: 'GET',
        uri: file_url
    });

    let out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', (data) => {
        total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', (chunk) => {
        received_bytes += chunk.length;
        let percent = (received_bytes * 100) / total_bytes;
        console.log(percent);
        win.webContents.send('download-percent', (received_bytes*100)/total_bytes)
        win.setProgressBar(received_bytes/total_bytes); // Taskbar progress
    });

    req.on('end', () => {
        console.log("File succesfully downloaded");
    });
}

ipcMain.on('request-test', (event) => {
    let fileURL = "https://github.com/minyong-jeong/minyong-jeong.github.io/raw/master/images/ryan.jpg";
    let filename = getFilenameFromUrl(fileURL);
    let downloadsFolder = "C:\\test";
    function getFilenameFromUrl(url){
        return url.substring(url.lastIndexOf('/') + 1);
    }
    let finalPath = downloadsFolder + "\\" + filename;
    downloadFile(fileURL, finalPath);
});
