var currentHTML;
var currentImageLink = 0;
var shown = false;
var currentPageLinks;
var currentImageLinks = [];
var title;

var success = false;

var displayedData = [];

var paused = false;
var transitionSpeed = 50;

function fadein() {
	console.log("fadein");
	var element = document.getElementById("explorationContent").style.opacity = "1";
	setTimeout(fadeout, 100*transitionSpeed);
}

function updateExploration() {
	//If there are no more images for the page, switch the page
	if (shown) {
		console.log("Switching page!");
		var whichLink = Math.floor(Math.random()*currentPageLinks.length);
		var title = currentPageLinks[whichLink].title;
		title = title.replace(/\s/g, "_");
		console.log(title);
		console.log("http://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&section=0&format=json&callback=?");

		//Reset globals
		currentPageLinks = 0;
		currentImageLinks = 0;
		shown = false;
		retrieveWiki(title);
	}
	else {
		var image = document.getElementById("explorationImage");
		image.src = currentImageLinks[currentImageLink];
		image.style.width = "50%";
		displayedData[displayedData.length-1]["text"] = currentImageLinks[currentImageLink];
		setTimeout(fadein, 1000);
	}
}

function fadeout() {
	if (paused) {
		setTimeout(fadeout, 50);
		return;
	}
	var element = document.getElementById("explorationContent").style.opacity = "0";

	//increment sentence if it can
	if(shown == false) {
		shown = true;
	}

	setTimeout(updateExploration, 2000);
}

function retrieveWiki(titleParam) {
	console.log("retrieveWiki()");
	$.getJSON("http://en.wikipedia.org/w/api.php?action=parse&page=" + titleParam + "&prop=text&section=0&format=json&callback=?", 
		function (data, status, xhr) {
			foundPage = true;
			if (!data.parse) {
				console.log("no data.parse!");
				document.getElementById("titleInput").style.display = "block";
				document.getElementById("loading").style.display = "none";	
				document.getElementById("results").style.display = "block";
				document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
				return;
			}
			for (text in data.parse.text) {
				var text = data.parse.text[text].split("<p>");

				//text[0] is a bunch of formatting. It can tell us if there was a redirect. It also includes image links. Git 'em!
				if (text[0].indexOf("redirectMsg") != -1) {
					//It's a redirect. Retrieve wiki at the new link!
					console.log("Redirected!");
					redirectLink = text[1].match(/<a[^>]*>([\s\S]*?)<\/a>/g);
					links = document.createElement("links");
					links.innerHTML = redirectLink[0];
					links = links.getElementsByTagName("a");
					links = links[0];
					var newtitle = links.title;
					newtitle = newtitle.replace(/\s/g, "_");
					retrieveWiki(newtitle);
					return;
				}

				//Not a full article
				if (text.length <= 1) {
					console.log("Not a full article!");
					document.getElementById("titleInput").style.display = "block";
					document.getElementById("loading").style.display = "none";	
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
					return;
				}

				//Extract images
				var array_of_images = text[0].match(/src="[^"]+"/g);
				console.log(array_of_images);
				for (i in array_of_images) {	//Then refine them
					array_of_images[i] = array_of_images[i].replace("src=", "");
					array_of_images[i] = array_of_images[i].replace(/\"/g, '');
					array_of_images[i] = "https:" + array_of_images[i];
				}
				if (array_of_images != null) {
					for (var i = array_of_images.length-1; i >= 0; --i) {
						if (array_of_images[i].indexOf("Question_book-new") != -1 || 
							array_of_images[i].indexOf("Ambox_important") != -1 ||
							array_of_images[i].indexOf("Edit-clear") != -1 ||
							array_of_images[i].indexOf("Information_icon") != -1 || 
							array_of_images[i].indexOf("red_question_mark") != -1 ||
							array_of_images[i].indexOf("Wiktionary-logo") != -1 ||
							array_of_images[i].indexOf("Gnome_globe_current") != -1) {
							array_of_images.splice(i, 1);
						}
					}
					shown = false;
				}
				else {
					shown = true;
				}

				currentImageLinks = array_of_images;

				//Extract text
				var pText = "";
				for (p in text) {
					//Remove html comment
					text[p] = text[p].split("<!--");
					if (text[p].length > 1) {
						text[p][0] = text[p][0].split(/\r\n|\r|\n/);
						text[p][0] = text[p][0][0];
						text[p][0] += "</p> ";
					}
					text[p] = text[p][0];

					//Construct a string from paragraphs
					if (text[p].indexOf("</p>") == text[p].length - 5 || text[p].indexOf("</p>") == text[p].length - 9) {
						pText += text[p];
					}
				}

				currentHTML = pText;

				//Extract page links
				var pageLinks = currentHTML.match(/<a[^>]*>([\s\S]*?)<\/a>/g);
				var wikiLinks = [];
				for (i in pageLinks) {	//Refine to just wiki links
					if (pageLinks[i].indexOf("wiki") != -1 && pageLinks[i].indexOf("wikimedia") == -1) {
						wikiLinks.push(pageLinks[i]);
					}
				}

				//Extract link texts
				var htmlLinks = document.createElement("links");
				for (i in wikiLinks) {
					htmlLinks.innerHTML += wikiLinks[i];
				}
				currentPageLinks = htmlLinks.getElementsByTagName("a");

				//found a page we like
				var item = { "title": "", "text": ""};
				displayedData.push(item);
				displayedData[displayedData.length-1]["title"] = titleParam;

				//Display the exploration and remove the loading sign
				document.getElementById("loading").style.display = "none";
				document.getElementById("explorationContent").style.display = "block";
				document.getElementById("explorationControls").style.display = "block";

				updateExploration();
			}
		}
	);
}

//submit button callback function
function onSubmit() {
	//Switch to loading screen
	document.getElementById("titleInput").style.display = "none";
	document.getElementById("loading").style.display = "block";
	document.getElementById("results").style.display = "none";

	//Perform some manipulation of input to make it play well with Wikipedia
	title = $("#titleInputBox").val();
	title = title.split(" ");
	for (word in title) {
		title[word] = title[word][0].toUpperCase() + title[word].slice(1);
	}
	title = title.join("_");

	foundPage = false;
	retrieveWiki(title);

	setTimeout(
		function() {
			if (!foundPage) {
				document.getElementById("titleInput").style.display = "block";
				document.getElementById("loading").style.display = "none";	
				document.getElementById("results").style.display = "block";
				document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
			}
		}, 2000);
}

function onReady() {
	var bar = document.getElementById("contextBar");
	bar.style.width = "0%";
	
	toggleContextBar();

	$("#titleSubmitButton").click(onSubmit);

	sessionStorage.clear();
	sessionStorage["pageType"] = "image_exploration";

	toggleSound();
}

$(document).ready(onReady);