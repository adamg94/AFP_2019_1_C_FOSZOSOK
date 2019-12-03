const { remote } = require("electron")
const minimize = document.querySelector("#minimize")
const close = document.querySelector("#close")

closeWindow = () => {
    
    remote.getCurrentWindow().close()
}

minimizeWindow = () => {
    remote.getCurrentWindow().minimize()
}

minimize.addEventListener("click", minimizeWindow)
close.addEventListener("click", closeWindow)