const { app, BrowserWindow } = require("electron")

let window
createWindow = () =>
{
    window = new BrowserWindow({
        width: 1600,
        height: 900,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }

    })
    window.loadFile(__dirname + "/views/login.html")
    window.on("closed", () => {
        window = null
    })
}

app.on("ready", createWindow)