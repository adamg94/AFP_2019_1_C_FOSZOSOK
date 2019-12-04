const { app, BrowserWindow } = require("electron")
const request = require('request')
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
    window.loadURL("http://localhost:3000/")
    window.on("close", (e) => {
        e.preventDefault()
        
        window.webContents.executeJavaScript('localStorage.getItem("afp_falu");', true)
              .then((obj) => {
                let x = JSON.parse(obj)
                if(x && x.username && x.token){   
                    request.post("http://localhost:5000/users/logout",
                    {
                        json: {
                            username: x.username, 
                            token: x.token
                        }
                    }, (err, result) => {
                            
                            if(err)
                            {
                                console.log(`logoutRequest Error: '${err}'!`)
                                res.json({"success" : false, "message" : `Server couldn't perform a logout'`})
                                return
                            }
                            if(result.body.success)
                            {
                               
                                e.returnValue = true
                                window.destroy()

                            }
                        }
                    )
                }
              })
    })
    window.on("closed", _ =>{
        window = null
    })

}

app.on("ready", createWindow)