const {app, BrowserWindow, ipcMain} = require("electron")

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  let modal = null
  ipcMain.on("closeModal", () => {
    if (modal) {
      modal.close()
      modal = null
    }
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
      modal.loadURL(url)
      event.newGuest = modal
    }
  })
  win.loadURL("file://" + __dirname + "/index.html")
  win.openDevTools()
})
