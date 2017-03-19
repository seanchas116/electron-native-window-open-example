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
  win.loadURL("file://" + __dirname + "/index.html")
  win.openDevTools()
})
