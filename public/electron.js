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
            {
                type: "separator"
              },
              { role: "reload" },
              { role: "togglefullscreen" },
              { role: "minimize" },
              { role: "close" }
            ]
          },
          {
            label: "Notifications",
      submenu: [
        {
          label: "Enable reset notification",
          type: "checkbox",
          checked: store.get("reset"),
          click: e => {
            global.notificationSettings.resetNotification = e.checked;
            store.set("reset", e.checked);
          }
        },
        {
          label: "Reminder notifications",
          submenu: [
            {
              label: "Never",
              type: "radio",
              checked: store.get("reminder") === "never",
              click: e => {
                if (e.checked) {
                  global.notificationSettings.reminderNotification = "never";
                  store.set("reminder", "never");
                }
              }
            },
            {
                label: "Every 15 minutes",
              type: "radio",
              checked: store.get("reminder") === "quarterhour",
              click: e => {
                if (e.checked) {
                  global.notificationSettings.reminderNotification = "quarterhour";
                  store.set("reminder", "quarterhour");
                }
              }
            },
            {
              label: "Every 30 minutes",
              type: "radio",
              checked: store.get("reminder") === "halfhour",
              click: e => {
                if (e.checked) {
                  global.notificationSettings.reminderNotification = "halfhour";
                  store.set("reminder", "halfhour");
                }
              }
            },
            {
              label: "Every hour",
              type: "radio",
              checked: store.get("reminder") === "hour",
              click: e => {
                if (e.checked) {
                  mainWindow.reminderNotification = "hour";
                  store.set("reminder", "hour");
                }
              }
            }
          ]
        },
        {
            label: "Show example notification",
          click: e => {
            let exNotification = new Notification({
              title: "todometer reminder!",
              body: "Here's an example jenabe time notification!"
            });
            exNotification.show();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.on("ready", () => {
    createWindow();
    menuSetup();
  
    powerMonitor.on("resume", () => {
      mainWindow.reload();
    });
    mainWindow.on("close", e => {
        if (willQuit || process.platform === "win32") {
          mainWindow = null;
          app.quit();
        } else {
          e.preventDefault();
          mainWindow.hide();
        }
      });
    });
    
    app.on("activate", () => mainWindow.show());
    app.on("before-quit", () => (willQuit = true));
