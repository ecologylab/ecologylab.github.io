function toggleNavBar() {
	var navbar = document.getElementById("navBar");
	var toggleIcon = document.getElementById("navBarToggleIcon");
	if (navbar.style.height == "0px") {
		//show everything
		navbar.style.height = "40px";
		toggleIcon.style.transform = "rotate(180deg)";
		siteLogo.style.opacity = 1;

		var element = document.getElementById("navList");
		element.style.transform = "translateY(0px)";
		var sound = document.getElementById("soundContainer");
		sound.style.transform = "translateY(0px)";
		var settings = document.getElementById("settingsContainer");
		settings.style.transform = "translateY(0px)";
	}
	else {
		//hide everything
		navbar.style.height = "0px";
		toggleIcon.style.transform = "rotate(0deg)";
		siteLogo.style.opacity = 0;
		
		var element = document.getElementById("navList");
		element.style.transform = "translateY(-50px)";
		var sound = document.getElementById("soundContainer");
		sound.style.transform = "translateY(-50px)";
		var settings = document.getElementById("settingsContainer");
		settings.style.transform = "translateY(-50px)";
	}
}

function toggleContextBar() {
	var bar = document.getElementById("contextBar");
	var contextBarToggleIcon = document.getElementById("contextBarToggleIcon");
	var contextToggleDiv = document.getElementById("contextToggleDiv");
	if (bar.style.width == "0%") {
		bar.style.fontSize = "16px";
		bar.style.width = "0%";
		bar.style.width = "80%";
		contextBarToggleIcon.style.transform = "rotate(180deg)";
	}
	else {
		bar.style.width = "0%";
		contextBarToggleIcon.style.transform = "rotate(0deg)";
		setTimeout(function() {
			console.log("hiding");
			var bar = document.getElementById("contextBar");
			bar.style.fontSize = "1px";
		}, 400);
	}
}

function toggleSound() {
	var icon = document.getElementById("soundIcon");
	if (icon.src.indexOf("sound.png") != -1) {
		//Mute the sound
		icon.src = "sound_mute.png";

		document.getElementById("audioplayer").pause();
	}
	else {
		//unmute the sound
		icon.src = "sound.png";

		document.getElementById("audioplayer").play();
	}
}

function changeAudio(selection) {
	var player = document.getElementById("audioplayer");
	var playing;
	if (!player.paused) {
		playing = true;
	}

	if (selection == 1) {
		player.src = "comma.mp3";
	}
	else if (selection == 2) {
		player.src = "emergency_broadcast.mp3";
	}
	else if (selection == 3) {
		player.src = "a_news_program.mp3";
	}

	if (playing) {
		player.play();
	}
}

function toggleTransitionSpeed() {
	var slider = document.getElementById("speedInput");
	transitionSpeed = 100 - (slider.value - 25);
	console.log(transitionSpeed);
}