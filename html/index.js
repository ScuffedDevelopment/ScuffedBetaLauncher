const { app, ipcRenderer, shell } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const https = require("https");
const extract = require("extract-zip");
const querystring = require("querystring");

const platform = process.platform;

function homePath() {
	if (os.homedir) return os.homedir();

	if (platform == "win32")
		return path.resolve(process.env.USERPROFILE);
}

function DesktopBhop() {
	if (platform == "win32")
		return path.resolve(homePath() + "\\Desktop\\Bhop Beta\\bhop.exe");
}

//const BhopDownload = "https://bwsecondary.ddns.net/uploads/Blocksworld.zip";

function FailedToLaunch() {
	ipcRenderer.send("failed-to-launch");
}

function openRegisterWindow() {
	ipcRenderer.send("open-register-window");
}
ipcRenderer.send("open-register-window");


function StartBhop() {
	child(executablePath, function(err, data) {
		if(err){
			FailedToLaunch()
		}
	});
}

function LaunchBhop() {

	if (platform == "darwin") {

		https.get(BhopDownload, function (res) {

			$("#downloadModal").modal();

			const length = parseInt(res.headers["content-length"]);

			fs.mkdirSync(bwPath, { recursive: true });

			var out = fs.createWriteStream(bwPath + "/download.zip");

			var progressBar = document.getElementById("download-progress");

			var downloaded = 0;

			res.on("data", async function (data) {
				out.write(data);

				downloaded += data.length;

				requestAnimationFrame(function () {

					var percent = (downloaded / length) * 100;

					progressBar.style.width = Math.floor(percent) + "%";

					progressBar.innerText = Math.floor(downloaded / 1024 / 1024) + "MiB / " + Math.floor(length / 1024 / 1024) + "MiB";
				});

				if (downloaded == length) {

					out.end();

					await extract(bwPath + "/download.zip", {

						dir: bwPath, onEntry: function (entry, zipFile) {

							progressBar.innerText = entry.fileName;
						}
					});
					fs.unlinkSync(bwPath + "/download.zip");


					let replaced = false;

					$("#downloadModal").modal("hide");

					document.getElementById("player").innerText = "Launching via account";

					document.getElementById("play-button").innerText = "Play";

					launchPlatform = "self";

					LaunchBhop();
				}
			});
		});
	}

	if (platform == "win32") {

		https.get(BhopDownload, function (res) {

			$("#downloadModal").modal();

			const length = parseInt(res.headers["content-length"]);

			fs.mkdirSync(bwPath, { recursive: true });

			var out = fs.createWriteStream(bwPath + "/download.zip");

			var progressBar = document.getElementById("download-progress");

			var downloaded = 0;

			res.on("data", async function (data) {
				out.write(data);
				downloaded += data.length;
				requestAnimationFrame(function () {
					var percent = (downloaded / length) * 100;
					progressBar.style.width = Math.floor(percent) + "%";
					progressBar.innerText = Math.floor(downloaded / 1024 / 1024) + "MiB / " + Math.floor(length / 1024 / 1024) + "MiB";
				});

				if (downloaded == length) {
					out.end();
					await extract(bwPath + "/download.zip", {
						dir: bwPath, onEntry: function (entry, zipFile) {
							progressBar.innerText = entry.fileName;
						}
					});
					fs.unlinkSync(bwPath + "/download.zip");
					let modJson = {
						"id": 0,
						"version": "0.4.1"
					};
					let replaced = false;
					for (key in installedMods.mods) {
						if (installedMods.mods[key].id == 0) {
							installedMods.mods[key] = modJson;
							replaced = true;
							break;
						}
					}
					if (!replaced) installedMods.mods.push(modJson);
					if (currentMod && currentMod.id == 0)
						loadMod(0);
					fs.writeFileSync(bwPath + "/mods.json", JSON.stringify(installedMods));
					$("#downloadModal").modal("hide");
					document.getElementById("player").innerText = "Launching via account";
					document.getElementById("play-button").innerText = "Play";
					LaunchBhop();
				}
			});
		});
	}
}


const dateText = document.getElementById("date-text");
const date = new Date();
dateText.innerText = " Scuffed Bhop Simulator";

