function onPlayPause() {
	var playPause = document.getElementById("playPauseButton");
	if (playPause.src.indexOf("play_button.png") != -1) {
		playPause.src = "pause_button.png";
		paused = false;
	}
	else {
		playPause.src = "play_button.png";
		paused = true;
	}
}

function showControls() {
	var controls = document.getElementById("explorationControls");
	controls.style.visibility = "visible";
	controls.style.opacity = "1";
}

function hideControls() {
	var controls = document.getElementById("explorationControls");
	if (controls.style.visibility == "visible" && controls.style.opacity == "1") {
		controls.style.visibility = "hidden";
		controls.style.opacity = "0";
	}
}

function onStop() {
	sessionStorage["data"] = JSON.stringify(displayedData);
}