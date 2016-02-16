/* NEEDED WORDS */
var VERB_1 = "";// present tense verb
var VERB_2 = "";// present tense verb
var VERB_3 = "";// must end in S
var VERB_4 = "";// must end in ING
var VERB_5 = "";// must end in ING
var VERB_6 = "";// present tense verb
var VERB_7 = "";// past tense

var NOUN_1 = "";
var NOUN_2 = "";
var NOUN_3 = "";
var NOUN_4 = "";

var PLURAL_NOUN_1 = "";
var PLURAL_NOUN_2 = "";
var PLURAL_NOUN_3 = "";
var PLURAL_NOUN_4 = "";

var THING_TO_SAY = "";

var ADJECTIVE_1 = "";
var ADJECTIVE_2 = "";
var ADJECTIVE_3 = "";
var ADJECTIVE_4 = "";

var CURRENT_SCREEN = 0;

function initMadLib()
{
	attemptToReloadWords();
	putWordsInInputs();
	
	// position screens
	var screens = document.getElementsByClassName("screen");
	
	for(var i = 0; i < screens.length; i++)
	{
		var midX = document.body.clientWidth / 2;
		
		screens[i].style.left = ((midX - 300) + (600 * i)) + 'px'; 
	}
}

function clickNext()
{
	// check all filled out
	if(areAllWordsFilledOut())
	{
		// check for first screen
		if(CURRENT_SCREEN == 0)
		{
			assignWordsAndSaveThem();
			replaceWordsInMadLibs();
			
			// put madlibs in screens
			var screens = document.getElementsByClassName("screen");
			
			// dim all screens and move all screens over			
			for(var i = 1; i < screens.length; i++)
			{
				console.log(screens[i]);
				screens[i].childNodes[3].innerHTML = MADLIBS[i - 1];
			}
		}
		
		
		// check for end
		if(CURRENT_SCREEN == 3)
		{
			alert("The End. Refresh and play again.");
		}
		else
		{
			// show next
			CURRENT_SCREEN++;
			
			var screens = document.getElementsByClassName("screen");
			
			// dim all screens and move all screens over			
			for(var i = 0; i < screens.length; i++)
			{
				var screen = screens[i];
				screen.style.opacity = "0.32";
				screen.style.webkitTransform = "scale(0.8)";
				
				
				var midX = document.body.clientWidth / 2;		
				screen.style.left = ((midX - 300) + (600 * (i-CURRENT_SCREEN))) + 'px';
				
				// dont dim the current screen
				if(i == CURRENT_SCREEN)
				{
					screen.style.opacity = "1";
					screen.style.webkitTransform = "scale(1)";
				}
			}
		}
		
		
	}
	else
	{
		alert("Please fill out all words.");
	}
	
}

function attemptToReloadWords()
{
	VERB_1 = possiblyLoadFromStorage("VERB_1");
	VERB_2 = possiblyLoadFromStorage("VERB_2");
	VERB_3 = possiblyLoadFromStorage("VERB_3");
	VERB_4 = possiblyLoadFromStorage("VERB_4");
	VERB_5 = possiblyLoadFromStorage("VERB_5");
	VERB_6 = possiblyLoadFromStorage("VERB_6");
	VERB_7 = possiblyLoadFromStorage("VERB_7");
	
	NOUN_1 = possiblyLoadFromStorage("NOUN_1");
	NOUN_2 = possiblyLoadFromStorage("NOUN_2");
	NOUN_3 = possiblyLoadFromStorage("NOUN_3");
	NOUN_4 = possiblyLoadFromStorage("NOUN_4");
	
	PLURAL_NOUN_1 = possiblyLoadFromStorage("PLURAL_NOUN_1");
	PLURAL_NOUN_2 = possiblyLoadFromStorage("PLURAL_NOUN_2");
	PLURAL_NOUN_3 = possiblyLoadFromStorage("PLURAL_NOUN_3");
	PLURAL_NOUN_4 = possiblyLoadFromStorage("PLURAL_NOUN_4");
	
	THING_TO_SAY = possiblyLoadFromStorage("THING_TO_SAY");
	
	ADJECTIVE_1 = possiblyLoadFromStorage("ADJECTIVE_1");
	ADJECTIVE_2 = possiblyLoadFromStorage("ADJECTIVE_2");
	ADJECTIVE_3 = possiblyLoadFromStorage("ADJECTIVE_3");
	ADJECTIVE_4 = possiblyLoadFromStorage("ADJECTIVE_4");
}

function possiblyLoadFromStorage(key)
{
	if(localStorage[key] != null && localStorage[key] != "" )
	{
		return localStorage[key];
	}
	return "";
}

function areAllWordsFilledOut()
{
	return true;
	
	var inputs = document.getElementsByClassName("word-input");
	for(var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].value == "")
			return false;
	}
	return true;
}

function assignWordsAndSaveThem()
{
	var inputs = document.getElementsByClassName("word-input");
	for(var i = 0; i < inputs.length; i++)
	{
		switch(inputs[i].id)
		{
			case "VERB_1": 	VERB_1 = inputs[i].value;
							break;
							
			case "VERB_2": 	VERB_2 = inputs[i].value;
							break;
							
			case "VERB_3": 	VERB_3 = inputs[i].value;
							break;
							
			case "VERB_4": 	VERB_4 = inputs[i].value;
							break;
							
			case "VERB_5": 	VERB_5 = inputs[i].value;
							break;
							
			case "VERB_6": 	VERB_6 = inputs[i].value;
							break;
							
			case "VERB_7": 	VERB_7 = inputs[i].value;
							break;
							
							
			case "NOUN_1": 	NOUN_1 = inputs[i].value;
							break;
							
			case "NOUN_2": 	NOUN_2 = inputs[i].value;
							break;
							
			case "NOUN_3": 	NOUN_3 = inputs[i].value;
							break;
							
			case "NOUN_4": 	NOUN_4 = inputs[i].value;
							break;
							
							
			case "PLURAL_NOUN_1": 	PLURAL_NOUN_1 = inputs[i].value;
							break;
							
			case "PLURAL_NOUN_2": 	PLURAL_NOUN_2 = inputs[i].value;
							break;
							
			case "PLURAL_NOUN_3": 	PLURAL_NOUN_3 = inputs[i].value;
							break;
							
			case "PLURAL_NOUN_4": 	PLURAL_NOUN_4 = inputs[i].value;
							break;
							
							
			case "THING_TO_SAY": 	THING_TO_SAY = inputs[i].value;
							break;
							
							
			case "ADJECTIVE_1": 	ADJECTIVE_1 = inputs[i].value;
							break;
							
			case "ADJECTIVE_2": 	ADJECTIVE_2 = inputs[i].value;
							break;
							
			case "ADJECTIVE_3": 	ADJECTIVE_3 = inputs[i].value;
							break;
							
			case "ADJECTIVE_4": 	ADJECTIVE_4 = inputs[i].value;
							break;
							
		}
	}
	
	// save words to storage
	localStorage["VERB_1"] = VERB_1;
	localStorage["VERB_2"] = VERB_2;
	localStorage["VERB_3"] = VERB_3;
	localStorage["VERB_4"] = VERB_4;
	localStorage["VERB_5"] = VERB_5;
	localStorage["VERB_6"] = VERB_6;
	localStorage["VERB_7"] = VERB_7;
	
	localStorage["NOUN_1"] = NOUN_1;
	localStorage["NOUN_2"] = NOUN_2;
	localStorage["NOUN_3"] = NOUN_3;
	localStorage["NOUN_4"] = NOUN_4;
	
	localStorage["PLURAL_NOUN_1"] = PLURAL_NOUN_1;
	localStorage["PLURAL_NOUN_2"] = PLURAL_NOUN_2;
	localStorage["PLURAL_NOUN_3"] = PLURAL_NOUN_3;
	localStorage["PLURAL_NOUN_4"] = PLURAL_NOUN_4;
	
	localStorage["THING_TO_SAY"] = THING_TO_SAY;
	
	localStorage["ADJECTIVE_1"] = ADJECTIVE_1;
	localStorage["ADJECTIVE_2"] = ADJECTIVE_2;
	localStorage["ADJECTIVE_3"] = ADJECTIVE_3;
	localStorage["ADJECTIVE_4"] = ADJECTIVE_4;		
}

function replaceWordsInMadLibs()
{
	for(var i = 0; i < MADLIBS.length; i++)
	{
		var lib = MADLIBS[i];
		
		lib = lib.replaceAll("VERB_1", "<span class='mad-word'>"+VERB_1+"</span>");
		lib = lib.replaceAll("VERB_2", "<span class='mad-word'>"+VERB_2+"</span>");
		lib = lib.replaceAll("VERB_3", "<span class='mad-word'>"+VERB_3+"</span>");
		lib = lib.replaceAll("VERB_4", "<span class='mad-word'>"+VERB_4+"</span>");
		lib = lib.replaceAll("VERB_5", "<span class='mad-word'>"+VERB_5+"</span>");
		lib = lib.replaceAll("VERB_6", "<span class='mad-word'>"+VERB_6+"</span>");
		lib = lib.replaceAll("VERB_7", "<span class='mad-word'>"+VERB_7+"</span>");
		
		lib = lib.replaceAll("PLURAL_NOUN_1", "<span class='mad-word'>"+PLURAL_NOUN_1+"</span>");
		lib = lib.replaceAll("PLURAL_NOUN_2", "<span class='mad-word'>"+PLURAL_NOUN_2+"</span>");
		lib = lib.replaceAll("PLURAL_NOUN_3", "<span class='mad-word'>"+PLURAL_NOUN_3+"</span>");
		lib = lib.replaceAll("PLURAL_NOUN_4", "<span class='mad-word'>"+PLURAL_NOUN_4+"</span>");
		
		lib = lib.replaceAll("NOUN_1", "<span class='mad-word'>"+NOUN_1+"</span>");
		lib = lib.replaceAll("NOUN_2", "<span class='mad-word'>"+NOUN_2+"</span>");
		lib = lib.replaceAll("NOUN_3", "<span class='mad-word'>"+NOUN_3+"</span>");
		lib = lib.replaceAll("NOUN_4", "<span class='mad-word'>"+NOUN_4+"</span>");
				
		lib = lib.replaceAll("THING_TO_SAY", "<span class='mad-word'>"+THING_TO_SAY+"</span>");
		
		lib = lib.replaceAll("ADJECTIVE_1", "<span class='mad-word'>"+ADJECTIVE_1+"</span>");
		lib = lib.replaceAll("ADJECTIVE_2", "<span class='mad-word'>"+ADJECTIVE_2+"</span>");
		lib = lib.replaceAll("ADJECTIVE_3", "<span class='mad-word'>"+ADJECTIVE_3+"</span>");
		lib = lib.replaceAll("ADJECTIVE_4", "<span class='mad-word'>"+ADJECTIVE_4+"</span>");
		
		
		MADLIBS[i] = lib;
		
	}
}

function putWordsInInputs()
{
	var inputs = document.getElementsByClassName("word-input");
	for(var i = 0; i < inputs.length; i++)
	{
		switch(inputs[i].id)
		{
			case "VERB_1": 	inputs[i].value = VERB_1;
							break;
							
			case "VERB_2": 	inputs[i].value = VERB_2;
							break;
							
			case "VERB_3": 	inputs[i].value = VERB_3;
							break;
							
			case "VERB_4": 	inputs[i].value = VERB_4;
							break;
							
			case "VERB_5": 	inputs[i].value = VERB_5;
							break;
							
			case "VERB_6": 	inputs[i].value = VERB_6;
							break;
							
			case "VERB_7": 	inputs[i].value = VERB_7;
							break;
							
							
			case "NOUN_1": 	inputs[i].value = NOUN_1;
							break;
							
			case "NOUN_2": 	inputs[i].value = NOUN_2;
							break;
							
			case "NOUN_3": 	inputs[i].value = NOUN_3;
							break;
							
			case "NOUN_4": 	inputs[i].value = NOUN_4;
							break;
							
							
			case "PLURAL_NOUN_1": 	inputs[i].value = PLURAL_NOUN_1;
							break;
							
			case "PLURAL_NOUN_2": 	inputs[i].value = PLURAL_NOUN_2;
							break;
							
			case "PLURAL_NOUN_3": 	inputs[i].value = PLURAL_NOUN_3;
							break;
							
			case "PLURAL_NOUN_4": 	inputs[i].value = PLURAL_NOUN_4;
							break;
							
							
			case "THING_TO_SAY": 	inputs[i].value = THING_TO_SAY;
							break;
							
							
			case "ADJECTIVE_1": 	inputs[i].value = ADJECTIVE_1;
							break;
							
			case "ADJECTIVE_2": 	inputs[i].value = ADJECTIVE_2;
							break;
							
			case "ADJECTIVE_3": 	inputs[i].value = ADJECTIVE_3;
							break;
						
			case "ADJECTIVE_4": 	inputs[i].value = ADJECTIVE_4;
							break;
							
		}
	}
}

String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}
