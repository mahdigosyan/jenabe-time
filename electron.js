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

  