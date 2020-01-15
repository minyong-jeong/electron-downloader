const request = require('request');
const fs = require('fs');

function downloadFile(win, fileURL, downPath) {
    function getFilenameFromUrl(url){
        return url.substring(url.lastIndexOf('/') + 1);
    }
    let filename = getFilenameFromUrl(fileURL);
    let targetPath = downPath + "\\" + filename;

    fs.mkdirSync(downPath, { recursive: true })

    let received_bytes = 0;
    let total_bytes = 0;

    let req = request({
        method: 'GET',
        uri: fileURL
    });

    let out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', (data) => {
        total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', (chunk) => {
        received_bytes += chunk.length;
        let percent = (received_bytes * 100) / total_bytes;
        // console.log(percent);
        win.webContents.send('download-percent', percent)
        win.setProgressBar(received_bytes/total_bytes);
    });

    req.on('end', () => {
        console.log("File succesfully downloaded");
    });
}

module.exports = { downloadFile };