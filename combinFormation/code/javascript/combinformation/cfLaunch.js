
// @package creating.js.ecology
/**
 * Launch by starting a .jnlp file, and then:
 *		1) wait for a server in the application, using ping (and an iframe).
 *		2) send preferences (for now) and seeds via xml message to that server
 * 
 * Copyright 1998-2002 by Andruid Kerne.  All rights reserved.
 */
host	= self.location.protocol + "//" + self.location.host;
var inStudy = false;

/**
 * Browsers that are able to download from arbitrary urls.
 */
var bounce	= 0;

var debug	= 0;

var needDownloadMessage = "";
var downloadLocation = "";

var inlinePossible	= 0;

var singleStep;			   // boolean

DOWNLOAD_MOZILLA= "http://www.mozilla.com/en-US/";

var badBrowser	= false;

// keep state with this XML element
var seedSet;

function checkBrowser()
{
   
   var result = (!mac || !safari);
   if (!result)
   {
	  badBrowser		= true;
	  result  = !confirm("You must use Firefox on the Macintosh to launch combinFormation.\nWould you like to go download Firefox?");
	  if (!result)
		 location.href	= DOWNLOAD_MOZILLA;
   }
   return result;
}

DELICIOUS_URL	= "http://del.icio.us/rss/andruid/";

CF_URL		= "http://localhost:10010/";

//URL		= DELICIOUS_URL;
URL		= CF_URL;                 
var seedMsg = '<set_seeds><seed_set><curated_seeding name="news"/></seed_set></set_seeds>';

var REQUEST	= URL + seedMsg;

/* begin code for launching combinformation through javascript and iframes */

var launchCF = launchCFiFrames;
//var seedingDone = false;
//var preferencesAndSeedingRequest; // cfSetPreferencesAndSeeding
var setPrefsAndSeedsOkFile = "cfSetPreferencesAndSeedsOkResponse.html";
var setPrefsAndSeedsErrorFile = "cfSetPreferencesAndSeedsError.html";
var enableLaunch;
var disableLaunch;
var cancelButtonId = "cancel_launch_button";
msgDir = location.protocol + "//" + location.host + rel(rootDir) + "code/javascript/combinformation/messageResponses/";

var applicationLauncher = new ApplicationLauncher("cf", CF_URL, msgDir, 500, "cfAlreadyStarted.html", "pingResponse.html", launchCF, startCFJNLP, true);
applicationLauncher.seedingDone = false;

firefoxExtensionInstalled = false;

function disableLaunchHook()
{
//   alert("disableLaunchHook()");
}
function enableLaunchHook()
{
//   alert("enableLaunchHook()");
}

function disableLaunchHook()
{
//   alert("disableLaunchHook()");
}
function enableLaunchHook()
{
//   alert("enableLaunchHook()");
}

function disableLaunchButton()
{
   var launchControls = document.getElementById("launch_controls");
   if (launchControls)
   {
	   var form1	= document.forms[1];
	   if (form1)
	   {
		  var launchButton	= form1.launch_button; 
		  if (launchButton)
			 launchButton.disabled = true;
		
		  displayCancelLaunchButton();
	   }
   }
}

function enableLaunchButton()
{
   enableLaunchHook();
   var form1	= document.forms[1];
   if (form1)
   {
      var launchButton	= form1.launch_button; 
	  if (launchButton)
        launchButton.disabled = false;
   }
   
   	   hideCancelLaunchButton();
}

function disableCuratedLaunchButtons()
{
	disableLaunchHook();
	displayCancelLaunchButton();
}

function enableCuratedLaunchButtons()
{
	hideCancelLaunchButton();
    enableLaunchHook();
}

function displayCancelLaunchButton()
{
	var launchControls = document.getElementById("launch_controls");
	$("#cancel_button").show();
	setTimeout('$("#cancel_button").hide()', 5000);
/*
	if (!document.getElementById(cancelButtonId))
	{
		var cancelLaunchButton = createCancelButton2("  Cancel Launch  ");
		launchControls.appendChild(cancelLaunchButton);
	}
*/
}

function hideCancelLaunchButton()
{
	var launchControls = document.getElementById("launch_controls");
	var cancelLaunchButton = document.getElementById(cancelButtonId);
	if (cancelLaunchButton)
	   	launchControls.removeChild(cancelLaunchButton);
}

function createCancelButton(textLabel)
{
	var cancelButton = document.createElement("input");
	cancelButton.type = "button";
	cancelButton.value = textLabel;
	cancelButton.name = cancelButtonId;
	cancelButton.onclick = cancelLaunch;
	cancelButton.id = cancelButtonId;
	cancelButton.className = "launch_button";
	
	return cancelButton;
}

function createCancelButton2(textLabel)
{
	var cancelButton = document.createElement("input");
	cancelButton.type = "button";
	cancelButton.value = textLabel;
	cancelButton.name = cancelButtonId;
	cancelButton.onclick = cancelLaunch;
	cancelButton.id = cancelButtonId;
	cancelButton.className = "launch_button";
	
	return cancelButton;
}

function cancelLaunch(isCurated)
{
	clearStatus();
	ping.location = "white.html";
	seeding.location = "white.html";
	applicationLauncher.pingDone = false;
	applicationLauncher.seedingDone = false;
	enableLaunch();
}
		
function clearCFIFrames()
{
   //ping.document.body.innerHTML = "";
   //seeding.document.body.innerHTML = "";
   progressConsole().innerHTML = "";
   ping.location = "white.html";
   seeding.location = "white.html";
}

var isCurated;

function launchCFiFrames(dontDetectExtension)
{
   if (badBrowser)
   {
	  alert("Sorry, this browser is not supported.");
	  return;
   }
   
   //install the extension if needed. If it was installed, dont continue the launch because
   //the browser should be restarted to finish the installation.
   if (!dontDetectExtension)
   		if (installExtensionIfNeeded())
   			return;
   
//   alert("trace: " + arguments.caller);

   clearCFIFrames();
   
   if (!isCurated)
   {
   	 disableLaunch = disableLaunchButton;
   	 enableLaunch = enableLaunchButton;
   }
   else
   {
   	 disableLaunch = disableCuratedLaunchButtons;
   	 enableLaunch = enableCuratedLaunchButtons;
   }
   disableLaunch();
   
   applicationLauncher.seedingDone = false;
   
   applicationLauncher.launchWithJavascript();
}

//detect if the cfTools firefox extension is installed
function isFirefoxExtensionInstalled()
{
	var titleElement = document.getElementsByTagName("title")[0];
   var someVersionDetected = false;
   
	//this is how we can detect that our ORIGINAL version is installed 
	//(really detects ANY version)
   if (titleElement.getAttribute("container"))
   		someVersionDetected = true;
   
   firefoxExtensionInstalled = false;
   
   //TODO: put the version number as a constant somewhere else
   if (titleElement.getAttribute("cftoolsversion"))
   		firefoxExtensionInstalled = (titleElement.getAttribute("cftoolsversion") == "0.1.2");
   	 
   	 //alert("Extension installed: " + firefoxExtensionInstalled);
   	
   	//success of either extension detection means success.
   	firefoxExtensionInstalled = firefoxExtensionInstalled || someVersionDetected
   	
   	return firefoxExtensionInstalled;
}

/**
 * Install the cfTools firefox extension if it isn't installed and the user allows it.
 * 
 * @param {Object} calledFromDialog whether or not the function is called from a 
 * 	DialogDisplay callback (or any other callback).
 * @param {Object} dialogResponse This is the value of the DialogDisplay results. This 
 * 	should only be called by callback functions.
 * @return true if we installed the extension.
 */
function installExtensionIfNeeded(calledFromDialog, dialogResponse, displayRestart)
{
	//if the browser is firefox, and the drag'n'drop extension isn't installed,
   //prompt for installation.
   var firefoxExtensionInstalled = isFirefoxExtensionInstalled();
   
   		
   if (browser == "Mozilla" && !firefoxExtensionInstalled && 
   		getCookie("check_for_extension") != "no")
   {
		//if this is called normally from within javascript, display the initial dialog.
		if (!calledFromDialog)
		{
			var htmlText = "<div>" + 
								"<h2 style='color:black'>cftools Firefox Extension</h2>" + 
								"<h4 style='color:black'>" + 
								"<p>" +
									"You do not have the cftools firefox extension installed " + 
									"(or you have an old version). <br/><br/>The cftools extension makes " +
									"drag\'n\'drop from firefox to combinformation much better. " +  
								 "</p>" + 
								"<p>Would you like to install/update it?</p>"
								"</h4>" + 
							"</div>";
			var continueButton 	= "Yes";
			var continueAction 	= "javascript:installExtensionIfNeeded(true, true)";
			
			var cancelButton	= "No";
			var cancelAction	= "javascript:installExtensionIfNeeded(true, false)";
			
			var buttons = new Array(continueButton, cancelButton);
			var actions = new Array(continueAction, cancelAction);
								
			dialog = new DialogDisplay(htmlText, buttons, actions);
			dialog.setHeight("210px");
			dialog.displayNow();
		}
		
		//if the results of the dialog were true, that means we want to install.
		//it also means we are getting called from the dialog callback (button action).
		if (calledFromDialog && dialogResponse)
		{
			dialog.close();
			
			var params = 
			{
    		"cfTools": { URL: "http://ecologylab.cs.tamu.edu/combinFormation/fireFoxDnd/cfTools.xpi",
             IconURL: "http://ecologylab.cs.tamu.edu/images/interfaceEcologyLabLogos7-2004-2WhiteMatte.png",
             toString: function () { return this.URL; }
    					}
  			};
			  	//alert('calling install');
			
			if (!displayRestart)
			{
				//alert("installing extension");
				
			  	InstallTrigger.install(params);
			  	
				var htmlText = "<div>" + 
									"<h2 style='color:black'>You need to 'Allow' plugins from this web page.</h2>" + 
									"<h4 style='color:black'><p>To finish the extension installation:</p>"  + 
										"<ol style='text-align:left'>" +
											"<li>Click 'Edit Options' at the top right of the page." +  
												"<img src='" + rootDir + "combinFormation/images/firefox_edit_options_screenshot.gif' width='350' style='border:1px solid'/>" +
											"</li>" + 
											"<li>Click  'Allow'; Click 'Close'." + 
												"<img src='" + rootDir + "combinFormation/images/firefox_edit_options_screenshot2.png' width='200' style='border:1px solid;margin-left=0px'/>	" +
											"</li>" + 
										"</ol>" +  
									"	When you are finished, click \"Continue\"" +
									"</h4>" +  
								"</div>";
				
				var continueButton 	= "Continue";
				var continueAction 	= "javascript:installExtensionIfNeeded(true, true, true)";
				
				var cancelButton	= "Cancel";
				var cancelAction	= "javascript:dialog.close()";
				
				var buttons = new Array(continueButton, cancelButton);
				var actions = new Array(continueAction, cancelAction);
								
				dialog = new DialogDisplay(htmlText, buttons, actions);
				dialog.setHeight("430px");
				dialog.displayNow();
				//alert("dialog displayed");
			}
			else
			{
				InstallTrigger.install(params);
				var htmlText = "<div>" + 
									"<h2 style='color:black'>You need to restart FireFox</h2>" + 
									"<h4 style='color:black'>To finish the extension installation please click<br/>Install Now, <br/>then exit FireFox and restart it.</h4>" +  
								"</div>";
				
//				var cancelButton	= "Cancel";
				var cancelButton	= "Cancel Launch";
				var cancelAction	= "javascript:dialog.close()";
				
				var buttons = new Array(cancelButton);
				var actions = new Array(cancelAction);
								
				dialog = new DialogDisplay(htmlText, buttons, actions);
				dialog.setHeight("160px");
				dialog.displayNow();
				//alert("dialog displayed");
			}
			
			return true;
		}
		else if (calledFromDialog)
		{
			dialog.close();
			
			var htmlText = "<div>" + 
								"<h2 style='color:black'>cftools Detection Next Startup</h2>" + 
								"<h4 style='color:black'><p>Do you mind if we check next time and prompt you again?</p></h4>" + 
							"</div>";
			var continueButton 	= "I don\'t mind";
			var continueAction 	= "javascript:dialog.close();javascript:launchCFiFrames(true);";
			
			var cancelButton	= "Leave me alone!";
			var cancelAction	= "javascript:dialog.close();javascript:setCookie('check_for_extension', 'no');javascript:launchCFiFrames(true);";
			
			var buttons = new Array(continueButton, cancelButton);
			var actions = new Array(continueAction, cancelAction);
							
			dialog = new DialogDisplay(htmlText, buttons, actions);
			dialog.setHeight("115px");
			dialog.displayNow();
			
			/*
			if (!confirm("Do you mind if we check next time and prompt you again?"))
			{
				//alert("setting cookie to not check next time");
				setCookie("check_for_extension", "no");
			}
			*/
		}
		else
		{
			//if it falls through, we didn't install yet (and we might not).
			return true;
		}
		
		return false;
   }
   //clearCookie("check_for_extension");
}

function generatePrefsXml(prefs, prefTypes)
{
   var result		= "";
   for (var thisParamName in prefs)
   {
      var thisParam	= prefs[thisParamName];
      var thisType	= prefTypes[thisParamName];
      var thisName	= thisParamName;
      if (thisType)
		 result		+= '<pref_' + thisType + ' name="' + thisName + '" value="' + thisParam + '"/>';
   }
   return result;
}

function buildPrefSet(prefs, prefTypes)
{
   
   var prefSet	= xmlDoc.createElement("pref_set");
   for (var thisName in prefs)
   {
      //alert(thisName + " wants to be "+prefs[thisName]);   
      var thisType	= prefTypes[thisName];
	  if (thisType)
	  {
		 var pref		= xmlDoc.createElement("pref_" + thisType);

		 pref.setAttribute("name", thisName);
		 var thisValue	= prefs[thisName];
		 pref.setAttribute("value", thisValue);

		 prefSet.appendChild(pref);
	  }
   }
   
   
   var pref	= xmlDoc.createElement("pref_boolean");

	pref.setAttribute("name", "ignore_pdf");
	pref.setAttribute("value", "false");

	prefSet.appendChild(pref);
   
   return prefSet;
}

/**
 * Now called only where cf is already running.
 */
function buildCfSetPreferencesAndSeedsXML(seedingSpecs)
{
   var msg		= xmlDoc.createElement("cf_set_preferences_and_seeds");

   prefSet		= buildPrefSet(autoPrefs, autoPrefTypes);
   msg.appendChild(prefSet);
   if (seedingSpecs)
	  msg.appendChild(seedingSpecs);

//   var seedingXML		= seedingSpecs ? xmlToString(seedingSpecs) : "";
///   var xmlString = xmlToString(msg);

//   alert(xmlString);
	
   return msg;
}

function cFPingResponse()
{
//   alert("cFPingResponse()");
   
   if (!applicationLauncher.pingDone)
   {
      applicationLauncher.pingDone  = true; // ? is there anything like a synchronized in javascript??? 
      // for new .jsp seeding
	  clearStatus();
	  enableLaunchButton();
   }
//   alert("cFPingResponse:\n" + preferencesAndSeedingRequest);
//   setRequestXML(preferencesAndSeedingRequest);
//   launchForm.submit();
   
}

function cfAlreadyStarted()
{
//	alert("An instance of combinFormation is already running.");
	if (!applicationLauncher.pingDone)
	{
		applicationLauncher.pingDone = true;
		clearStatus();
		enableLaunchButton();
	}
	//seeding.location.href = preferencesAndSeedingRequest;
   var msg = xmlDoc.createElement("cf_set_preferences_and_seeds_http_request");
   msg.setAttribute("ok_response_url", msgDir + setPrefsAndSeedsOkFile);
   msg.setAttribute("error_response_url", msgDir + setPrefsAndSeedsErrorFile);

   if (seedSet)
	  msg.appendChild(buildCfSetPreferencesAndSeedsXML(seedSet));
   
   var preferencesAndSeedingRequest = xmlToString(msg);
   		
   //alert(preferencesAndSeedingRequest);
   setRequestXML(preferencesAndSeedingRequest);
   launchForm.submit();
}

function resendSeedsIfNecessary()
{
	try
   {
	  msg		= "Seeding and Prefs Sent";
	  var bod	= ping.document.getElementsByTagName("body")[0];
	  clearInterval(intervalId);
   } 
   catch (e)
   {
   	  //var debugLaunch = applicationLauncher.debug;
	  //msg		= debugLaunch ? "Permission denied." : "-";
	  //ping.location.href	= "about:blank";
	  //msg		+= debugLaunch ? " Retrying. " : ">";
	  
	  //ping.location.href	= applicationLauncher.pingRequest;
	  launchForm.submit();
   }
}

function cfSetPreferencesAndSeedsError()
{
	alert("Error launching cF while sending preferences and seeeds.");
	enableLaunch();
}

function cfSetPreferencesAndSeedsOkResponse()
{
	//alert("ok response");
	if (!applicationLauncher.seedingDone)
	{
		applicationLauncher.seedingDone = true;
		enableLaunch();
	}
	if (!applicationLauncher.debug)
	{
	   clearConsole(); // clear console -- only if already running
	}
}


/* end of launch cf with javascript and iframes code */
  
function restoreStatus()
{
   top.defaultStatus	= "";
}

var popupFuncs = 
'var popup3Win;\n' +
'function cmPopup(newHref)\n' +
'{\n' +
'//alert("cmPopup("+newHref);\n' +
'  var w = popup3(newHref, "informationResource", 800,600);\n' +
'}\n' +
'function popup3(href, title, width, height)\n' +
'{\n' +
'   var args	= "width=" + width +",height="+ height + ",resizable,scrollbars,location,status";\n' +
'   var w;\n' +
'   if (!popup3Win || popup3Win.closed){\n' +
'      popup3Win	= open("", title, args);\n' +
'   if (!popup3Win) alert("To use the navigate tool, please allow popups from http://"+location.host);';
if (!inStudy)
	  popupFuncs += '      else popup3Win.moveTo(0,0);';
popupFuncs += '   }\n' +
'  else' +
'  {' +
//'     popup3Win		= open("", title, args);' +
'     if (navigator.userAgent.indexOf("Safari") == -1) popup3Win.location= "about:blank";' +
'  }' +
'   w			= popup3Win;\n' +
'   if (w) w.focus();\n' +
'//   alert("set location to "+href);\n' +
'   if (w) w.location	= href;\n' +
'   return w;\n' + 
'}\n';

//--------------------- put the applets frame back ------------------------
function collageError(toDir)
{
//   alert("collageError() from " + self.location + "\nto " + toDir);
   popup(toDir + "collageErrorPopup.html", 570,400, "resizable,scrollbars");
//   replace("blank.html", applets);
}
function doit()
{ collageError(rootDir); }
function feedback(page)
 { feedback(rootDir,page); }

/**
 * Offer (and encourage) the user to download the plugin.
 */
function offerOptions(that, offerLimit, colspan, noForm, where, moreArt, sizeOption,nbsp) // void (Window, boolean, int, boolean, String)
{
    if (!where)
      where		= "top";

   var startForm	= (noForm || ie) ? "" : '<form>';
   var endForm		= noForm ? "" : '</form>';
   colspan		= colspan ? attrVal("colspan",colspan) : "";
   
   // prologue
   that.document.writeln("<tr><td " + colspan + "align=center>" + startForm + table(0,1,6) +"<tr>");

   leftStuff = '<td valign="top">' + collageRadios() + "</td>";
 
   that.document.writeln(leftStuff);

   if (nbsp)
      that.document.writeln("<td>&nbsp;</td>");

   sizeOption	= sizeOption ? sizeOption : (debug ? 3 : 2);

   var rightStuff = '<td valign="top">' +
      table() + "<tr>" + collageSize() + "</tr>\n" +
      pluginStuff;
   if (debug)
      rightStuff       += "<tr><td>" + 
	 spacer(100,5) + "</td></tr>\n<tr><td>" + 
	 generateCheck("single&nbsp;step", where+".singleStep",singleStep) +
		       "</td></tr>\n";
   rightStuff	 +=  "</table>" + "</td>";
//   alert(rightStuff);
   that.document.writeln(rightStuff);
   // epilogue
   that.document.writeln("</tr></table>" + endForm +"</td></tr>");
}




function setTopSize(element)
{
//   alert("setTopSize("+element+" "+element.value+" "+element.id);
   var value = parseInt(element.value);
   if (value)
   {
      element.value	= value;
      setPref("autoPrefs", element.id, element.value);
   }
   else
   {
      element.value	= "";
      setPref("autoPrefs", element.id, null);
   }
}

function sizeInputElement(id)
{
   var result =  document.createElement("input");
   result.onchange = function() {setTopSize(this); };
   result.id	= id;
   result.name	= id;
   result.size = 4;
   var value	= autoPrefs[id];
   if (value)
      result.value	= value;
   result.style.marginLeft = "3px";
   result.style.paddingLeft = "1px";
   
   return result;
}
function labelSpan(text, id)
{
   var result =  document.createElement("span");
   if (id)
	  result.id	= id;
   
   result.style.textAlign = "right";
   result.style.marginLeft = "12px";
   result.innerHTML = text;
   return result;
}

function addOrRemoveHeightWidth(sizeIndex)
{
   var topWidthElement =  document.getElementById("topwidth");
//   alert("addOrRemoveHeightWidth("+topWidthElement+" "+sizeIndex);
   var thatH5 = document.getElementById("oollage_size_h5");
   
   if ((sizeIndex == 0) && (topWidthElement == null))
   {
//      alert("addOrRemoveHeightWidth() "+ thatH5);
      
      thatH5.appendChild(labelSpan("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width","topwidth_label"));
      thatH5.appendChild(sizeInputElement("topwidth"));
      thatH5.appendChild(labelSpan("height", "topheight_label"));
      thatH5.appendChild(sizeInputElement("topheight"));
   }
   else if ((sizeIndex != 0) && (topWidthElement != null))
   {
	  thatH5.removeChild(topWidthElement);
	  var topWidthLabelElement		= document.getElementById("topwidth_label");
	  thatH5.removeChild(topWidthLabelElement);
	  var topHeightElement		= document.getElementById("topheight");
	  thatH5.removeChild(topHeightElement);
	  var topHeightLabelElement		= document.getElementById("topheight_label");
	  thatH5.removeChild(topHeightLabelElement);
   }
}

function collageSize() // String()
{
   var h5 = document.getElementById("oollage_size_h5");
//   alert("h5="+h5);
   
   generatePrefSelect(h5, "screen_size", autoPrefs, "autoPrefs", addOrRemoveHeightWidth);

   var screenSize		= autoPrefs.screen_size;
   if (screenSize == 0)
      addOrRemoveHeightWidth(screenSize);
}

/**
 * Transform an array of specs, some of which may be named collages,
 * to form a flattened array of seeding parameter declarations.
 */
function parseSpecs(specs, results)
{
   for (var i=0; i!=specs.length; i++)
   {
      var entry		= specs[i];
//      alert("got entry " + entry);
      if ((typeof entry) == "object")
	 parseSpecs(entry, results);
      else if (entry.indexOf("curated_collection|") == 0)
      {
	 parseSpecs(collages[entry.substring(19)], results);
      }
      else
	 results[results.length]	= entry;
   }
}

function setupStudyQuestion(userId, questionId)
{
   autoPrefs.userId	= userId;
   autoPrefs.questionId	= questionId;
   inStudy		= true;
   autoPrefs.doingUserStudy	= true;
 }
function setExtent(x, y, width, height)
{
   autoPrefs.topx		= x;
   autoPrefs.topy		= y;
   autoPrefs.topwidth	= width;
   autoPrefs.topheight	= height;
   autoPrefs.screen_size= 0;
}

/**
 * Start combinformation via JNLP
 */
function startCFJNLP()
{
    if( otherPrefs.developmentPartner )
    	cf_jnlp.location.href = otherPrefs.partnerJnlpLoc;
    else
    {
		//Improved pdf parsing increases the download size, so this is an option
		//that is off by default.
		//Use an alternate jnlp file if we're not using just multivalent.
		var codebase	=  fullHost() + rel(rootDir) + "code/java/cf/";
//		alert("codebase = " + codebase);

		var jnlpFilename= "launch.jsp?codebase="+codebase;
//		var jnlpFilename= "foo.html?codebase="+codebase;
		if (autoPrefs["pdf_parsing"] != "multivalent")
			jnlpFilename+= "&better_pdf_parsing=1";
		
		var fullFileName		= codebase + jnlpFilename;
//		alert("startCFJNLP() " + fullFileName);
		
		//window.parent.alert(pdf_parsing);
		cf_jnlp.location.href = fullFileName;
	}
}

/**
 * TODO: THIS NEEDS TO GO SOMEWHERE BETTER!!
 * Determines if a given javascript object is an array.
 * @param {Object} object The object to check.
 * @return True if the object is an array.
 */
function isArray(object)
{
	return object.constructor.toString().indexOf("Array") != -1;
}



