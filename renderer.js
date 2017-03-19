const win = window.open("./popup.html")
win.onload = () => {
  win.document.body.innerHTML = "from opener"
  const browserWindow = win.require("electron").remote.getCurrentWindow()
  browserWindow.maximize()
}
