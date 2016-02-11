var currentHTML;
var currentSentence = 0;
var currentCleanSentence;
var currentPageLinks;
var title;
var maxSentence;

var foundPage = true;

var displayedData = [];

var linkNumbers;
var contentText;
var hiLinkInSentence;

var paused = false;

var transitionSpeed = 50;

function calculateDisplayTime() {
	displayTime = currentCleanSentence.length*transitionSpeed;
	return displayTime;
}

function fadein() {
	var element = document.getElementById("explorationContent").style.opacity = "1";
	setTimeout(fadeout, calculateDisplayTime());
}

function updateExploration() {
	//If there are no more links after this sentence, follow a link on this sentence
	if (hiLinkInSentence != null && hiLinkInSentence >= currentPageLinks.length - 1) {
		console.log("Switching page! 1");
		var whichLink = Math.floor(Math.random()*linkNumbers.length);
		console.log(whichLink);
		title = currentPageLinks[parseInt(linkNumbers[whichLink])].title;
		title = title.replace(/\s/g, "_");
		console.log(title);
		console.log("http://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&section=0&format=json&callback=?");

		//Reset globals
		currentSentence = 0;
		currentPageLinks = 0;
		maxSentence = 0;
		hiLinkInSentence = null;
		linkNumbers = null;
		retrieveWiki(title);
	}
	//Else check if there are current links in this sentence to follow and roll the dice.
	else if (linkNumbers != null && currentSentence > 2 && Math.floor(Math.random()*100)%3) {
		var whichLink = Math.floor(Math.random()*linkNumbers.length);
		console.log(whichLink);
		title = currentPageLinks[parseInt(linkNumbers[whichLink])].title;
		title = title.replace(/\s/g, "_");
		console.log(title);
		console.log("http://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&section=0&format=json&callback=?");

		//Reset globals
		currentSentence = 0;
		currentPageLinks = 0;
		maxSentence = 0;
		hiLinkInSentence = null;
		linkNumbers = null;
		retrieveWiki(title);
	}
	//Else just update
	else {
		//Process current sentence
		contentText = currentHTML[currentSentence];

		linkNumbers = contentText.match(/\s*WIKILINK:\d+/g);
		for (i in linkNumbers) {
			linkNumbers[i] = linkNumbers[i].replace("WIKILINK:", "");
		}
		//Strip sentence of linkNumbers
		contentText = contentText.replace(/\s*WIKILINK:\d+/g, "");
		currentCleanSentence = contentText;

		if (linkNumbers == null) {
			hiLinkInSentence = 0;
		}
		else {
			hiLinkInSentence = parseInt(linkNumbers[linkNumbers.length - 1]);
		}
		//Update page content and displayed content
		var content = document.getElementById("explorationContent");
		content.innerHTML = currentCleanSentence;
		displayedData[displayedData.length-1]["text"] += currentCleanSentence + " ";

		fadein();
	}
}

function fadeout() {
	if (paused) {
		setTimeout(fadeout, 50);
		return;
	}
	var element = document.getElementById("explorationContent").style.opacity = "0";

	//increment sentence if it can
	if(currentSentence < maxSentence) {
		currentSentence++;
	}

	setTimeout(updateExploration, 2000);
}

function retrieveWiki(title) {
	$.getJSON("http://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=text&section=0&format=json&callback=?", 
		function (data, status, xhr) {
			foundPage = true;
			if (!data.parse) {
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
					redirectLink = text[1].match(/<a[^>]*>([\s\S]*?)<\/a>/g);
					links = document.createElement("links");
					links.innerHTML = redirectLink[0];
					links = links.getElementsByTagName("a");
					links = links[0];
					title = links.title;
					title = title.replace(/\s/g, "_");
					retrieveWiki(title);
					return;
				}

				console.log(text);

				//Not a full article
				if (text.length <= 1) {
					document.getElementById("titleInput").style.display = "block";
					document.getElementById("loading").style.display = "none";	
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
					return;
				}

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

				//Replace wiki links in page with special identifier
				for (i in wikiLinks) {
					currentHTML = currentHTML.replace(wikiLinks[i], currentPageLinks[i].text + "WIKILINK:" + i);
				}

				currentHTML = currentHTML.replace(/<(?:.|\n)*?>/gm, ''); //Remove HTML
				currentHTML = currentHTML.replace(/\([^)]*\)/gm, ''); //Remove parenthetical text. It is often distracting and unimportant
				currentHTML = currentHTML.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)	
				currentHTML = currentHTML.match(/\S.*?\."?(?=\s|$)/gm); //Split into sentences
				if (currentHTML == null) {
					document.getElementById("titleInput").style.display = "block";
					document.getElementById("loading").style.display = "none";	
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
					return;
				}
				maxSentence = currentHTML.length - 1;
				
				//found a page we like
				var item = { "title": "", "text": ""};
				displayedData.push(item);
				displayedData[displayedData.length-1]["title"] = title;

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
	$("#titleSubmitButton").click(onSubmit);

	sessionStorage.clear();
	sessionStorage["pageType"] = "free_explore";

	toggleSound();
}

$(document).ready(onReady);