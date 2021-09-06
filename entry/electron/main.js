const {app, BrowserWindow} = require('electron')
const cluster = require('cluster');
const access = require('./data/access');

if (cluster.isMaster) {
    const worker = cluster.fork();

    //
    // Main electron process
    //
    let win = null;

    function createWindow() {
        // Initialize the window to our specified dimensions
        win = new BrowserWindow({
            width: 1000, 
            height: 600,
            webPreferences: {
                nodeIntegration: true,       // blueprintjs expects a process object
                contextIsolation: false
            }
        });

        // Specify entry point
        win.loadFile('index.html');

        // Show dev tools
        // Remove this line before distributing
        win.webContents.openDevTools()

        // Remove window once app is closed
        win.on('closed', function () {
            win = null;
        });
    }

    app.on('ready', function () {
        createWindow();
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow()
        }
    })

    app.on('window-all-closed', function () {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('quit', function() {
        worker.kill();
    });

} else {
    //
    // Our database httpd server
    //
    access.service(8000);
}