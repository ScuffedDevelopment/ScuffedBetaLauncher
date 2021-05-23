/**
	Under the MIT lisense
**/

const { app, nativeTheme, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
let win = undefined;
let registerWin = undefined;

function createWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 780,
		icon: "html/img/ddc.png",
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.setMenuBarVisibility(false);
	win.loadFile("html/index.html");
	win.webContents.on("did-finish-load", function() {
		win.webContents.send("change-dark-theme", nativeTheme.shouldUseDarkColors);
	});
	console.log("Main Menu Launched.")
}
function createErrorWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 780,
		icon: "html/img/ddc.png",
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.setMenuBarVisibility(false);
	win.loadFile("html/index.html");
	win.webContents.on("did-finish-load", function() {
		win.webContents.send("change-dark-theme", nativeTheme.shouldUseDarkColors);
	});
	console.log("Main Menu Launched.")
}
// ipcMain.on("failed-to-launch", function() {
// 	registerWin = new BrowserWindow({
// 		width: 300,
// 		height: 50,
// 		icon: "html/img/ddc.png",
// 		webPreferences: {
// 			nodeIntegration: true
// 		}
// 	});
// 	registerWin.setMenuBarVisibility(false);
// 	registerWin.loadFile("html/index.html");
// 	registerWin.webContents.on("did-finish-load", function() {
// 		registerWin.webContents.send("change-dark-theme", nativeTheme.shouldUseDarkColors);
// 	});
// 	console.log("Failed Menu Launched.")
// });

function main() {
	createWindow();
}

app.whenReady().then(main);

app.on("window-all-closed", function() {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function() {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

nativeTheme.on("updated", function() {
	win.webContents.send("change-dark-theme", nativeTheme.shouldUseDarkColors);
});

ipcMain.on("close-register-window", function() {
	registerWin.close();
});
