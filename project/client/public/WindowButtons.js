const { remote } = require("electron");
const minimize = document.querySelector("#minimize");
const close = document.querySelector("#close");

const loadingDiv = document.querySelector("#loading");
const message = document.querySelector("#message");

closeWindow = () => {
  loadingDiv.style.display = "block";
  close.setAttribute("disabled", true);
  remote.getCurrentWindow().close();
};

minimizeWindow = () => {
  remote.getCurrentWindow().minimize();
};

minimize.addEventListener("click", minimizeWindow);
close.addEventListener("click", closeWindow);
