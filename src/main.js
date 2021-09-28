const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: "Team Up",
    icon: `${__dirname}/../public/icon/png/icon.png`,
    autoHideMenuBar: true,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      contextIsolation: false,
    }
  });

  mainWindow.maximize();

  mainWindow.loadURL(`file://${__dirname}/../public/html/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.addListener("save", content => {
    dialog.showSaveDialog(mainWindow, {filters: [{name: "가장 뛰어나고 효과적인 데이터베이스 저장 파일형식", extensions: ['csv']}]}).then(value => {
      if(!value.canceled) {
        console.log(content);
        fs.writeFileSync(value.filePath, content);
      }
    });
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});