function freeExploreParse() {
	var data = JSON.parse(sessionStorage["data"]);

	var results = document.getElementById("explorationResults");

	var item = document.createElement("heading");
	item.className = "resultsItem";

	var title = document.createElement("h2");
	title.className = "itemTitle";
	title.innerHTML = "Wikipedia Page Title";

	var text = document.createElement("h2");
	text.className = "itemImage";
	text.innerHTML = "Page Image";

	lineBreak = document.createElement("div");
	lineBreak.className = "filler";

	item.appendChild(title);
	item.appendChild(text);

	results.appendChild(item);
	results.appendChild(lineBreak);

	for (i in data) {
		var item = document.createElement("item"+String(i));
		item.className = "resultsItem";

		var title = document.createElement("title"+String(i));
		title.className = "itemTitle";
		title.innerHTML = data[i]["title"];

		var text = document.createElement("text"+String(i));
		text.className = "itemText";
		text.innerHTML = data[i]["text"];

		lineBreak1 = document.createElement("div");
		lineBreak1.className = "filler";

		item.appendChild(title);
		item.appendChild(text);

		results.appendChild(item);
		results.appendChild(lineBreak1);
	}
}

function imageExplorationParse() {
	var data = JSON.parse(sessionStorage["data"]);

	var results = document.getElementById("explorationResults");

	var item = document.createElement("heading");
	item.className = "resultsItem";

	var title = document.createElement("h2");
	title.className = "itemTitle";
	title.innerHTML = "Wikipedia Page Title";

	var text = document.createElement("h2");
	text.className = "itemImage";
	text.innerHTML = "Page Image";

	lineBreak = document.createElement("div");
	lineBreak.className = "filler";

	item.appendChild(title);
	item.appendChild(text);

	results.appendChild(item);
	results.appendChild(lineBreak);

	for (i in data) {
		//var item = document.createElement("item"+String(i));
		var item = document.createElement("item");
		item.className = "resultsItem";

		var title = document.createElement("p");
		title.className = "itemTitle";
		title.innerHTML = data[i]["title"];

		var text = document.createElement("text");
		text.className = "itemImage";
		var image = document.createElement("img");
		image.src = data[i]["text"];
		console.log(data[i]["text"]);
		image.style.width = "50%";
		text.appendChild(image);

		lineBreak1 = document.createElement("div");
		lineBreak1.className = "filler";

		item.appendChild(title);
		item.appendChild(text);

		results.appendChild(item);
		results.appendChild(lineBreak1);
	}
}

function multiExplorationParse() {
	var data = JSON.parse(sessionStorage["data"]);
	var results = document.getElementById("explorationResults");

	var item = document.createElement("heading");
	item.className = "resultsItem";

	var title = document.createElement("h2");
	title.className = "itemTitle";
	title.innerHTML = "Wikipedia Page Title";

	var text = document.createElement("h2");
	text.className = "itemImage";
	text.innerHTML = "Page Image";

	lineBreak = document.createElement("div");
	lineBreak.className = "filler";

	item.appendChild(title);
	item.appendChild(text);

	results.appendChild(item);
	results.appendChild(lineBreak);

	for (i in data) {
		console.log("i = " + i);
		//indicate which exploration
		var expHeader = document.createElement("heading");
		expHeader.className = "resultsItem";

		var whichExp = document.createElement("h3");
		whichExp.className = "itemTitle";
		var num = parseInt(i) + 1;
		whichExp.innerHTML = "Exploration " + String(num);

		var filler = document.createElement("h3");
		filler.className = "itemImage";
		filler.innerHTML = "";

		lineBreak1 = document.createElement("div");
		lineBreak1.className = "filler";

		expHeader.appendChild(whichExp);
		expHeader.appendChild(filler);
		results.appendChild(expHeader);
		results.appendChild(lineBreak1);

		for (j in data[i]) {
			var item = document.createElement("item"+String(i) + String(j));
			item.className = "resultsItem";

			var title = document.createElement("title"+String(i) + String(j));
			title.className = "itemTitle";
			title.innerHTML = data[i][j]["title"];

			var text = document.createElement("text"+String(i) + String(j));
			text.className = "itemText";
			text.innerHTML = data[i][j]["text"];

			lineBreak2 = document.createElement("div");
			lineBreak2.className = "filler";	

			item.appendChild(title);
			item.appendChild(text);

			results.appendChild(item);
			results.appendChild(lineBreak2);
		}
	}
}

function layoutExplorationParse() {
	var data = JSON.parse(sessionStorage["data"]);

	var results = document.getElementById("explorationResults");

	var item = document.createElement("heading");
	item.className = "resultsItem";

	var title = document.createElement("h2");
	title.className = "itemTitle";
	title.innerHTML = "Wikipedia Page Title";

	var text = document.createElement("h2");
	text.className = "itemImage";
	text.innerHTML = "Page Image";

	lineBreak = document.createElement("div");
	lineBreak.className = "filler";

	item.appendChild(title);
	item.appendChild(text);

	results.appendChild(item);
	results.appendChild(lineBreak);

	for (i in data) {
		var item = document.createElement("item"+String(i));
		item.className = "resultsItem";

		var title = document.createElement("title"+String(i));
		title.className = "itemTitle";
		title.innerHTML = data[i]["title"];

		var text = document.createElement("text"+String(i));
		text.className = "itemText";
		text.innerHTML = data[i]["text"];

		lineBreak1 = document.createElement("div");
		lineBreak1.className = "filler";

		item.appendChild(title);
		item.appendChild(text);

		results.appendChild(item);
		results.appendChild(lineBreak1);
	}
}

function onReady() {
	var bar = document.getElementById("contextBar");
	bar.style.width = "0%";
	
	toggleContextBar();

	if (sessionStorage["pageType"] == "free_explore") {
		freeExploreParse();
	}
	else if (sessionStorage["pageType"] == "image_exploration") {
		imageExplorationParse();
	}
	else if (sessionStorage["pageType"] == "multi_exploration") {
		multiExplorationParse();
	}
	else if (sessionStorage["pageType"] == "layout_exploration") {
		layoutExplorationParse();
	}
	//don't do anything if an invalid pageType is sent in
}

$(document).ready(onReady);