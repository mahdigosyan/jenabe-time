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
  