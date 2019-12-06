const { app, BrowserWindow } = require("electron")
const request = require('request')
let bwindow
createWindow = () =>
{
    bwindow = new BrowserWindow({
        width: 1600,
        height: 900,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }

    })
    bwindow.loadURL("http://localhost:3000/")
    bwindow.on("close", (e) => {
        e.preventDefault()
        if(bwindow.webContents.getURL() != "http://localhost:3000/"){
            bwindow.webContents.executeJavaScript('localStorage.getItem("afp_falu");', true)
                .then((obj) => {
                    let x = JSON.parse(obj)
                    if(x && x.username && x.token){   
                        request.post("http://localhost:5000/village/logout",
                        {
                            json: {
                                username: x.username, 
                                token: x.token
                            }
                        }, (err, result) => {
                                
                                if(err)
                                {
                                    console.log(`VillageLogout call Error: '${err}'!`)
                                    res.json({"success" : false, "message" : `Server Error! 'c002''`})
                                    return
                                }
                                if(result.body.success)
                                {
                                    request.post("http://localhost:5000/users/logout", 
                                    {
                                        json : 
                                        {
                                            username : result.body.username,
                                            token : result.body.token
                                        }}, (err3, response) => {
                                            
                                            if (err3) {
                                                console.log(`logoutRequest Error: '${err3}'`);
                                                res.json({ "success": false, "message": `Server Error! 'c003'` });
                                                return;
                                            }

                                            if(response.body.success)
                                            {
                                                e.returnValue = true
                                                bwindow.destroy()
                                            }

                                    })
                                }
                            }
                        )
                    }
                })
            }
            else{
                e.returnValue = true
                bwindow.destroy()
            }
    })

    bwindow.on("closed", _ =>{
        bwindow = null
    })

}

app.on("ready", createWindow)