/**
	Blocksworld Launcher
    Copyright (C) 2020 zenith391

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
