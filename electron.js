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


  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

function menuSetup() {
    const menuTemplate = [
      {
        label: "jenabetime",
        submenu: [
          {
            label: "About",
            click: () => {
              dialog.showMessageBox(mainWindow, {
                type: "info",
                title: "About",
                message: "jenabe time is built by @mahdigosyan",
                detail:
                  "You can find her on GitHub @mahdigosyan and Twitter as @mrbackdev.",
                icon: path.join(__dirname, "assets/png/64x64.png")
              });
            }
          },
          {
            label: "Contribute (v" + version + ")",
            click: () => {
              shell.openExternal("https://github.com/mahdigosyan/jenabe-time");
            }
          },
          {
            type: "separator"
          },
          {
            label: "Quit",
            accelerator: "CommandOrControl+Q",
            click: () => {
              app.quit();
            }
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { role: "delete" },
          { role: "selectall" }
        ]
      },
      {
        label: "View",
        submenu: [
