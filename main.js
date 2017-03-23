const {app, BrowserWindow, ipcMain} = require("electron")

let win = null
let modal = null

app.on('ready', () => {
  ipcMain.on("closeModal", () => {
    if (modal) {
      modal.close()
    }
  })
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true
    }
  })
  win.on("closed", () => {
    win = null
  })
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (url.endsWith("modal.html")) {
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: win,
        width: 100,
        height: 100
      })
      modal = new BrowserWindow(options)
      modal.on("closed", () => {
        modal = null
      })
      event.newGuest = modal
    }
  })
  win.loadURL("file://" + __dirname + "/index.html")
  win.openDevTools()
})
