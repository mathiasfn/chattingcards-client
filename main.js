const path = require("path");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    nodeIntegration: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Open the DevTools.
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3200");
    win.webContents.openDevTools();
  } else {
    //win.removeMenu();
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
