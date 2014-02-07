var MAX_WAIT = 5000;
var debugDiv;
var baseMsgDir	= location.protocol + "//" + location.host + rel(rootDir);
var intervalId;

function ApplicationLauncher(name, serverAddress, msgDir, pingWaitTime, initialPingResponseUrl, pingResponseUrl, launchFunction, startJNLPFunction, debug)
{
	/* msg construction variables */
	this.name = name;
	this.serverAddress = serverAddress;
	this.msgDir = msgDir;
	
	/* ping related variables */
	//this.pingIFrame = pingIFrame;
	this.pingWaitTimeCookie = getCookie(name + "_Ping_Wait");
	
	this.pingWaitTime = (this.pingWaitTimeCookie == "") ? pingWaitTime : parseInt(this.pingWaitTimeCookie);
	this.initialPingResponseUrl = initialPingResponseUrl;
	this.pingResponseUrl = pingResponseUrl;
	
	this.pingDone = false;
	this.initialPingRequest = null;
	this.pingRequest = null;
	this.cookieLoaded = false;
	
	/* launch variables */
	this.launch = launchFunction;
	this.startJNLP = startJNLPFunction;

/*	if (debug)
		this.debug = debug
	else
		this.debug = false;	
 */
	this.debug = false;	

	this.prefsMessage = null;
}

var applicationLauncher;

ApplicationLauncher.prototype.absoluteInitialPingResponseUrl = function()
{
	return this.msgDir + this.initialPingResponseUrl;
}

ApplicationLauncher.prototype.absolutePingResponseUrl = function()
{
	return this.msgDir + this.pingResponseUrl;
}

ApplicationLauncher.prototype.buildPingRequest = function(okResponseFile, errorResponseFile)
{
	var pingRequest = '<ping_request ';
	if (okResponseFile)
		pingRequest += 'ok_response_url="' + this.msgDir + okResponseFile + '"';
	if (errorResponseFile)
		pingRequest += ' error_response_url="' + this.msgDir + errorResponseFile + '"';
	pingRequest += '/>';
	
	return pingRequest;
}

ApplicationLauncher.prototype.launchWithJavascript = function(initialPingResponseUrl, pingResponseUrl)
{
   this.pingDone = false;
   
   if (initialPingResponseUrl)
     this.initialPingResponseUrl = initialPingResponseUrl;
     
   if (pingResponseUrl)
     this.pingResponseUrl = pingResponseUrl;
     
   this.initialPingRequest 	= this.buildPingRequest(this.initialPingResponseUrl); 
   this.pingRequest 		= this.buildPingRequest(this.pingResponseUrl);
     
   attemptInitialPing();
}

/*ApplicationLauncher.prototype.buildPingRequest = function(okResponseFile, errorResponseFile)
{
	var pingRequest = URL + '<ping_request ok_response_url="';
	if (okResponseFile)
		pingRequest += this.msgDir + okResponseFile;
	pingRequest += '" error_response_url="';
	if (errorResponseFile)
		pingRequest += this.msgDir + errorResponseFile;
	pingRequest += '"/>';
	
	return pingRequest;
}*/

function attemptInitialPing()
{
	ping.location.href = "about:blank";
	//ping.location.href = applicationLauncher.initialPingRequest;
	setRequestXML(applicationLauncher.initialPingRequest);
	launchForm.submit();
	
	applicationLauncher.pingWaitTimeCookie = getCookie(applicationLauncher.name + "_Ping_Wait");
	
	if (applicationLauncher.pingWaitTimeCookie != "")
		applicationLauncher.pingWaitTime = parseInt(applicationLauncher.pingWaitTimeCookie);
	//if (applicationLauncher.pingWaitTimeCookie.loadCookie(initPingWaitTime) && !applicationLauncher.cookieLoaded)
	//{
	//	applicationLauncher.pingWaitTime = initPingWaitTime;   
	//	applicationLauncher.cookieLoaded = true;
	//}
    
    intervalId = setTimeout(initialPing, applicationLauncher.pingWaitTime);
}

function startJNLPWhilePing()
{
	if (!applicationLauncher.pingDone)
	{
	    appendToConsole("Loading jnlp...");
		//launch the application launcher via JNLP
 		applicationLauncher.startJNLP();
	}
}
// where control flows to in the first non-linear shift! (from setTimeout())
function initialPing()
{
	try
	{  
		if (applicationLauncher.pingWaitTime > 2000)
		{	// this code is for webkit browsers cause they don't throw the exception :-(
		    setCookie(applicationLauncher.name + "_Ping_Wait", applicationLauncher.pingWaitTime.toString());
			startJNLPWhilePing();
		}
		else
		{
			if (ping.location.href != applicationLauncher.absoluteInitialPingResponseUrl())
			{
				if (applicationLauncher.pingWaitTimeCookie == "")
				{
					applicationLauncher.pingWaitTime += 500;
					appendToConsole(" [increase ping wait to " + applicationLauncher.pingWaitTime + "] ");
				}
				attemptInitialPing();
				return;
			}
			setConsole(applicationLauncher.name + " is ALREADY RUNNING! ");
		}
	}
	catch(e)
	{
	    //alert("yo 3!");
	    setCookie(applicationLauncher.name + "_Ping_Wait", applicationLauncher.pingWaitTime.toString());
	   	startJNLPWhilePing();
	   	
	   	//appendToConsole(" " + ping.location+"<br/>");
//   		ping.location.href  = "about:blank";
//   		//ping.location.href	= applicationLauncher.pingRequest;
   		setRequestXML(applicationLauncher.pingRequest);
//		launchForm.submit();
   		intervalId	= setInterval(tryPing, applicationLauncher.pingWaitTime);
	}
}

function tryPing()
{
   var msg;
   if (applicationLauncher.pingDone)
   {
	  clearInterval(intervalId);
	  return;
   }
   try
   {
	  msg		= "Connection to application services server established. " + ping.location.href;
	  var bod	= ping.document.getElementsByTagName("body")[0];
	  msg	   += "|" + bod.innerHTML + "|";
	  clearInterval(intervalId);
   } catch (e)
   {
   	  var debugLaunch = applicationLauncher.debug;
	  msg		= debugLaunch ? "Permission denied." : "-";
	  ping.location.href	= "about:blank";
	  msg		+= debugLaunch ? " Retrying. " : ">";
	  
	  //ping.location.href	= applicationLauncher.pingRequest;
	  launchForm.submit();
   }
   appendToConsole(msg);
}

function clearStatus()
{
	  clearInterval(intervalId);
} 

function progressConsole()
{
   return document.getElementById("progress_console");
}

function appendToConsole(msg)
{
//	if (applicationLauncher.debug)
//	{
   		var console	= progressConsole();
   		console.innerHTML	+= " " + msg;
//	}
}
function setConsole(msg)
{
   var console	= progressConsole();
   console.innerHTML	= msg;
}
function clearConsole()
{
   setConsole("&nbsp;");
}

function setRequestXML(value)
{
	launchForm.requestXML.value = value;
}
