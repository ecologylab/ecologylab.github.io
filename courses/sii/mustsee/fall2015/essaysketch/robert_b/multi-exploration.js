var currentHTML = ["", ""];
var currentSentence = [0, 0];
var currentCleanSentence = ["", ""];
var currentPageLinks = ["", ""];
var title = [];

var maxSentence = [0, 0];

var foundPage = [false, false];

var displayedData = [[], []];

var linkNumbers = ["", ""];
var contentText = ["", ""];
var hiLinkInSentence = ["", ""];

var paused = false;
var transitionSpeed = 50;

function calculateDisplayTime(expNum) {
	displayTime = currentCleanSentence[expNum].length*transitionSpeed;
	return displayTime;
}

function fadein(expNum) {
	var element = document.getElementById("explorationContent" + String(expNum)).style.opacity = "1";
	setTimeout(fadeout, calculateDisplayTime(expNum), expNum);
}

function updateExploration(expNum) {
	//If there are no more links after this sentence, follow a link on this sentence
	if (hiLinkInSentence[expNum] != null && hiLinkInSentence[expNum] >= currentPageLinks[expNum].length - 1) {
		console.log("Switching page! 1");
		var whichLink = Math.floor(Math.random()*linkNumbers.length);
		title[expNum] = currentPageLinks[expNum][parseInt(linkNumbers[expNum][whichLink])].title;
		title[expNum] = title[expNum].replace(/\s/g, "_");
		console.log(title[expNum]);
		console.log("http://en.wikipedia.org/w/api.php?action=parse&page=" + title[expNum] + "&prop=text&section=0&format=json&callback=?");

		//Reset globals
		currentSentence[expNum] = 0;
		currentPageLinks[expNum] = 0;
		maxSentence[expNum] = 0;
		hiLinkInSentence[expNum] = null;
		linkNumbers[expNum] = null;
		retrieveWiki(title[expNum], expNum);
	}
	//Else check if there are current links in this sentence to follow and roll the dice.
	else if (linkNumbers[expNum] != null && currentSentence[expNum] > 2 && Math.floor(Math.random()*100)%3) {
		console.log("Switching page! 2");
		var whichLink = Math.floor(Math.random()*linkNumbers[expNum].length);
		title[expNum] = currentPageLinks[expNum][parseInt(linkNumbers[expNum][whichLink])].title;
		title[expNum] = title[expNum].replace(/\s/g, "_");
		console.log(title[expNum]);
		console.log("http://en.wikipedia.org/w/api.php?action=parse&page=" + title[expNum] + "&prop=text&section=0&format=json&callback=?");

		//Reset globals
		currentSentence[expNum] = 0;
		currentPageLinks[expNum] = 0;
		maxSentence[expNum] = 0;
		hiLinkInSentence[expNum] = null;
		linkNumbers[expNum] = null;
		retrieveWiki(title[expNum], expNum);
	}
	//Else just update
	else {
		//Process current sentence
		contentText[expNum] = currentHTML[expNum][currentSentence[expNum]];
		linkNumbers[expNum] = contentText[expNum].match(/\s*WIKILINK:\d+/g);
		for (i in linkNumbers[expNum]) {
			linkNumbers[expNum][i] = linkNumbers[expNum][i].replace("WIKILINK:", "");
		}

		//Strip sentence of linkNumbers
		contentText[expNum] = contentText[expNum].replace(/\s*WIKILINK:\d+/g, "");
		currentCleanSentence[expNum] = contentText[expNum];

		if (linkNumbers[expNum] == null) {
			hiLinkInSentence[expNum] = 0;
		}
		else {
			hiLinkInSentence[expNum] = parseInt(linkNumbers[expNum][linkNumbers.length - 1]);
		}
		//Update page content
		var content = document.getElementById("explorationContent" + String(expNum));
		content.innerHTML = currentCleanSentence[expNum];
		displayedData[expNum][displayedData[expNum].length-1]["text"] += currentCleanSentence[expNum] + " ";
		fadein(expNum);
	}
}

function fadeout(expNum) {
	if (paused) {
		setTimeout(fadeout, 50);
		return;
	}
	var element = document.getElementById("explorationContent" + String(expNum)).style.opacity = "0";

	//increment sentence if it can
	if(currentSentence[expNum] < maxSentence[expNum]) {
		currentSentence[expNum]++;
	}

	setTimeout(updateExploration, 2000, expNum);
}

function retrieveWiki(titleParam, expNum) {
	$.getJSON("http://en.wikipedia.org/w/api.php?action=parse&page=" + titleParam + "&prop=text&section=0&format=json&callback=?", 
		function (data, status, xhr) {
			foundPage[expNum] = true;
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
					redirectLink = text[1].match(/<a[^>]*>([\s\S]*?)<\/a>/g);
					links = document.createElement("links");
					links.innerHTML = redirectLink[0];
					links = links.getElementsByTagName("a");
					links = links[0];
					newTitle = links.title;
					newTitle = newTitle.replace(/\s/g, "_");
					retrieveWiki(newTitle, expNum);
					return;
				}

				//Not a full article
				if (text.length <= 1) {
					console.log("not a full article!");
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

				currentHTML[expNum] = pText;

				//Extract page links
				var pageLinks = currentHTML[expNum].match(/<a[^>]*>([\s\S]*?)<\/a>/g);
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
				currentPageLinks[expNum] = htmlLinks.getElementsByTagName("a");

				//Replace wiki links in page with special identifier
				for (i in wikiLinks) {
					currentHTML[expNum] = currentHTML[expNum].replace(wikiLinks[i], currentPageLinks[expNum][i].text + "WIKILINK:" + i);
				}

				currentHTML[expNum] = currentHTML[expNum].replace(/<(?:.|\n)*?>/gm, ''); //Remove HTML
				currentHTML[expNum] = currentHTML[expNum].replace(/\([^)]*\)/gm, ''); //Remove parenthetical text. It is often distracting and unimportant
				currentHTML[expNum] = currentHTML[expNum].replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)	
				currentHTML[expNum] = currentHTML[expNum].match(/\S.*?\."?(?=\s|$)/gm); //Split into sentences

				if (currentHTML == null) {
					console.log("no currentHTML!");
					document.getElementById("titleInput").style.display = "block";
					document.getElementById("loading").style.display = "none";	
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML = "Wikipedia Article not found. Please try again.";
					return;
				}

				maxSentence[expNum] = currentHTML[expNum].length - 1; //Store maxSentences. It may be useful in later processing

				console.log("adding new title");
				//found a page we like
				var item = { "title": "", "text": ""};
				displayedData[expNum].push(item);
				displayedData[expNum][displayedData[expNum].length-1]["title"] = titleParam;
				console.log(displayedData);

				//Display the exploration and remove the loading sign
				document.getElementById("loading").style.display = "none";
				document.getElementById("explorationContent" + String(expNum)).style.display = "inline-block";
				document.getElementById("explorationControls").style.display = "block";
				updateExploration(expNum);
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
	input = $("#titleInputBox").val();
	input = input.split(" ");
	for (word in input) {
		input[word] = input[word][0].toUpperCase() + input[word].slice(1);
	}
	title[0] = input.join("_");
	title[1] = input.join("_");

	foundPage[0] = false;
	foundPage[1] = false;
	retrieveWiki(title[0], 0);
	retrieveWiki(title[1], 1);

	setTimeout(
		function() {
			if (!foundPage[0]) {
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
	sessionStorage["pageType"] = "multi_exploration";

	toggleSound();
}

$(document).ready(onReady);