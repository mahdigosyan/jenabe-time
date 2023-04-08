const {
    app,
    BrowserWindow,
    Menu,
    dialog,
    powerMonitor,
    shell,
    Notification
  } = require("electron");
  const Store = require("electron-store");
  const isDev = require("electron-is-dev");
// ---------------------------
  const path = require("path");
  const { version } = require("../package.json");
  
  const store = new Store();  

global.notificationSettings = {
    resetNotification: store.get("reset") || true,
    reminderNotification: store.get("reminder") || "hour"
  };

  let mainWindow = {
    show: () => {
      console.log("show");
    }
  }; // temp object while app loads
  let willQuit = false;


function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      minWidth: 320,
      height: 600,
      fullscreenable: true,
      backgroundColor: "#403F4D",
      icon: path.join(__dirname, ""),
      webPreferences: {
        nodeIntegration: true
      }
    });
    
