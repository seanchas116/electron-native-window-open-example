const {app, BrowserWindow} = require("electron")

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   webSecurity: false,
    //   sandbox: false, 
    // },
  })
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    console.log(options)
    event.preventDefault()
    let win = new BrowserWindow(options)
    win.loadURL(url)
    event.newGuest = win
  })
  win.loadURL("file://" + __dirname + "/index.html")
  win.openDevTools()
})
