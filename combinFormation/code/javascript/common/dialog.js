var dialog;

/**
 * Class to display a semi-modal dialog box with the provided text, buttons, and button
 * actions.
 * @param {Object} text The text (in HTML) to render as the body.
 * @param {Object} button_texts An array of button labels or a single label.
 * @param {Object} button_actions An array of (or single) button actions which
 * map to the button_texts.
 */
function DialogDisplay(text, button_texts, button_actions)
{
	//if it's not an array, make it one
	if(!isArray(button_texts))
	{
		button_texts 	= new Array(button_texts);
	}
	if (!isArray(button_actions))
	{
		button_actions	= new Array(button_actions);
	}
	
	this.$html 				= text;
	this.$button_texts 		= button_texts;
	this.$button_actions 	= button_actions;
}

DialogDisplay.prototype.width 	= "400px";
DialogDisplay.prototype.height 	= "200px";
DialogDisplay.prototype.left 	= "250px";
DialogDisplay.prototype.top 	= "50px";
DialogDisplay.prototype.bgColor	= "#fdf2ab";


DialogDisplay.prototype.setWidth = function(width)
{
	DialogDisplay.prototype.width = width;
}

DialogDisplay.prototype.setHeight = function(height)
{
	DialogDisplay.prototype.height = height;
}

DialogDisplay.prototype.setLeft = function(left)
{
	DialogDisplay.prototype.left = left;
}

DialogDisplay.prototype.setTop = function(top)
{
	DialogDisplay.prototype.top = top;
}

DialogDisplay.prototype.setBgColor = function(bgColor)
{
	DialogDisplay.prototype.bgColor = bgColor;
}

/**
 *  Display the dialog
 */
DialogDisplay.prototype.displayNow = function()
{
	var containerDiv = document.createElement("div");
	containerDiv.style.width 	= DialogDisplay.prototype.width;
	containerDiv.style.height 	= DialogDisplay.prototype.height;
	containerDiv.style.left 	= DialogDisplay.prototype.left;
	containerDiv.style.top 		= DialogDisplay.prototype.top;
	containerDiv.style.backgroundColor = DialogDisplay.prototype.bgColor;
	
	containerDiv.style.color	= "black";
	containerDiv.style.textAlign= "center";
	containerDiv.setAttribute('id', "dialog");
	containerDiv.style.position	= "absolute";
	containerDiv.style.padding	= "4px";
	
	var buttonHtml = "<div>";
	for(var i=0; i<this.$button_texts.length; i++)
	{
		buttonHtml += "<input type='button' onClick=\"" + this.$button_actions[i] + "\" " + 
					" value=\"" + this.$button_texts[i] + "\"></input>";
	}
	buttonHtml += "</div>";
	//alert(buttonHtml);
	
	var finalHtml = "<p>" + this.$html + "</p>" + 
					buttonHtml;
					
	containerDiv.innerHTML = finalHtml;
	
	//our node container will be appended to the body, but as the first element.
	var body = document.getElementsByTagName('body')[0];
	
	//center the container
	containerDiv.style.marginLeft 	= "auto";
	containerDiv.style.marginRight	= "auto";
	
	containerDiv.style.zIndex		= "15";
	
	//TODO move this to a member field so that it can be changed
	containerDiv.style.border 		= "1px solid";
	
	body.appendChild(containerDiv);
}

DialogDisplay.prototype.close = function()
{
	var dialog 	= document.getElementById("dialog");
	var body 	= document.getElementsByTagName('body')[0];
	body.removeChild(dialog);
}
