const {ipcRenderer} = require("electron")

const showModal = () => {
  const modal = window.open("./modal.html")
  modal.onload = () => {
    const browserWindow = modal.require("electron").remote.getCurrentWindow()
    const okButton = modal.document.getElementById("ok")
    const cancelButton = modal.document.getElementById("cancel")
    okButton.addEventListener("click", () => {
      resultDiv.innerText = "OK"
      // modal.close() or browserWindow.close() doesn't work now
      ipcRenderer.send("closeModal")
    })
    cancelButton.addEventListener("click", () => {
      resultDiv.innerText = "Cancel"
      ipcRenderer.send("closeModal")
    })
  }
}

const showModalButton = document.getElementById("show-modal")
const resultDiv = document.getElementById("result")
showModalButton.addEventListener("click", showModal)
