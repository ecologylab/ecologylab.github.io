// @package creating.js.ecology
/**
 * JavaScript for running Java applets such as CollageMachine.
 * Generates appropriate html for built-in jvm or plugin in
 * appropriate browser.
 * 
 * Includes fundamental infrastructural stuff, as well as convenient JavaScript
 * for seeding web pages, including offering options for screen size.
 * 
 * Copyright 1998-2002 by Andruid Kerne.  All rights reserved.
 */
///////////////////////////// applets /////////////////////////////////////
host	= self.location.protocol + "//" + self.location.host;
var inStudy = false;

/**
 * Browsers that are able to download from arbitrary urls.
 */
var bounce	= 0;

var debug	= 0;

/**
 * @return	0 means no plugin
 * @return	1 means mozilla w sun plugin
 * @return	2 means ie w sun plugin
 */
var javaPlugin	= 0;		   // int
var javaPlugin1_3 = 0;

var javaVersion;

var needDownloadMessage = "";
var downloadLocation = "";

var appletParameters = "";

if (mac) {
  needDownloadMessage = "You need Java 1.5 (which requires Mac OS 10.2+) to launch combinFormation\n\nWould you like to download it now!?";
  downloadLocation	= "http://www.apple.com/java/";
}
else {
  needDownloadMessage = "You need Java 1.5 to launch combinFormation.\n\nWould you like to download it now!?";
//  downloadLocation	= "http://java.sun.com/j2se/1.4.1/download.html";
  downloadLocation	= "http://www.java.com/en/download/windows_automatic.jsp";
}

// need to test for mac os < 10.2.3

if (ie &&
    (versionAgent.indexOf("98") > -1) || (versionAgent.indexOf("95") > -1))
{  // plugin sense may crash that platform, so pray its there
   javaPlugin	= 2;
}
else
{
   setupCheckPlugin();
//   if (ie && !mac)
//      javaPlugin1_3= checkPlugin("application/x-java-applet",
//				 "JavaPlugin");

   javaPlugin	= checkPlugin("application/x-java-applet",
			      "JavaWebStart.isInstalled");
 //   alert(javaPlugin1_3 +" "+ javaPlugin);
   
   if (javaPlugin == 2)		   // i.e. w JavaWebStart
      javaVersion	= 1.4;
   else if (javaPlugin == 1)	   // mozilla w some version of Java
   {
      if (!mac)
      {
//	 alert("checking java version");
	 javaVersion	= java.lang.System.getProperty("java.version");
//	 alert("checked java version");
	 underscore = javaVersion.indexOf("_");
	 if (underscore != -1)
	    javaVersion	= javaVersion.substring(0,underscore);
	 dot	 = javaVersion.indexOf(".");
	 lastDot	 = javaVersion.lastIndexOf(".");
	 if (dot != lastDot)
	    javaVersion	= javaVersion.substring(0,lastDot);
      }
   }
//   alert ("javaVersion="+javaVersion);
//			      "JavaPlugin");
//			      "JavaSoft.JavaBeansBridge.1");
// alert("javaPlugin="+javaPlugin + " 1-3="+javaPlugin1_3);
}
//alert("javaVersion="+javaVersion);
   
var popupArgs = "height=300,width=800,scrollbars,status,resizable";
var downloadWin;

function getJava(location)
{
   if (!location)
      location	= downloadLocation;
   downloadWin = popup4(location, "download_java", popupArgs);
}

if ((javaPlugin == 0) && confirm(needDownloadMessage))
      getJava();
      
//      location.replace(downloadLocation);

if (this.autoPrefs)
      autoPrefs.javaplugin		= (javaPlugin > 0);


// force it back to the applet tag!
javaPlugin = 0;

//alert("javaPlugin="+javaPlugin);

var inlinePossible	= 0;

/**
 * Pages set this if the user is IE, doesnt have the plugin yet, and
 * wants to rock.
 */
var useIePlugin	= !mac;		   // boolean

var singleStep;			   // boolean

/**
 * Detect a plugin.
 * setupCheckPlugin() must be called once before calls here.
 * @return	0 if no such plugin. 1 if netscape w plugin. 2 if ie w plugin.
 */
function checkPlugin(desiredMime, desiredActiveX) // int(String)
{
  //  alert("top of checkPlugin()");
   var result = 0;
  if (ie5)
  {
     //      alert("calling vbActiveXDetect");
      if (!mac)
      {
	 if (vbActiveXDetect(desiredActiveX))
	    result	= 2;
      }
      else
      {
	 // !!! dont know how to detect on ie mac
      }
   }
   else if (gecko)
   {
//      alert("checking for plugin " + desiredMime);
      
      for (i = 0; i < navigator.plugins.length; i++)
      {
	 var plugin	= navigator.plugins[i];
	 for (j = 0; j < plugin.length; j++)
	 {
	    var mime = plugin[j];
	    if (mime)
	    {
	       var mimeName	= mime.type;
	       if (mimeName.indexOf(desiredMime) != -1)
	       {
		  result= 1;
		  break;
	       }
	    }
	 }
	 if (result)
	    break;
      }
   }
   return result;
}

/**
 * Must be executed once, at init time.
 */
function setupCheckPlugin()
{
   if (ie4 && !mac)
   {
      document.writeln('<SCRIPT LANGUAGE=VBScript>');
      document.writeln('Function vbActiveXDetect(desiredActiveX)');
      document.writeln('  on error resume next');
      document.writeln('  result = False');
      document.writeln('  result = IsObject(CreateObject(desiredActiveX))');
//      document.writeln('  MsgBox "vbActiveXDetect = " & result');
      document.writeln('  vbActiveXDetect = result');
      document.writeln('End Function');
      document.writeln('</' + 'script>');
   }
}
function noJavaMsg(that, appletName)
{
   // help message for non-Java browsers
   with (that.document)
   {
      writeln('<a target="_top"');
      writeln(' href="/ecology/techSupport/javaSupport.html"><img');
      writeln('alt="tech support"');
      writeln('align=left src="/ecology/Images/techSupportSmall.GIF"');
      writeln('width=60 height=39  hspace=6 border=0></a>');

      writeln('<font size=-1>Sorry, you need a Java browser');
      writeln('to experience ' + appletName + '.<br>');
      writeln('Help is <a target="_top"');
      writeln(' href="/ecology/techSupport/javaSupport.html">here</a>.<br>');
      writeln('</font>');
      writeln('');
   }
}

DELICIOUS_URL	= "http://del.icio.us/rss/andruid/";

CF_URL		= "http://localhost:10010/";

URL		= DELICIOUS_URL;
URL		= CF_URL;
var seedMsg = '<set_seeds><seed_set><curated_seeding name="news"/></seed_set></set_seeds>';

var REQUEST	= URL + seedMsg;
function launchCFApplet(seedingSpecs, bgcolor, bgimage, that)
{
   if (!that)
      that	= launch_applet;

   goApplet(that, "CMShell", "cf.app.CMShell.class", seedingSpecs,
			bgcolor, bgimage, otherPrefs.cfArchiveSet);
}

/* begin code for launching combinformation through javascript and iframes */

var launchCF = launchCFWebStart;
//var launchCF = launcherAndBrowserServices;
var intervalId;
var pingRequest;
var initialPingRequest;
var pingDone = false;
var seedingDone = false;
var preferencesAndSeedingRequest; // cfSetPreferencesAndSeeding
var msgDir		= location.protocol + "//" + location.host + rel(rootDir) +
				"code/javascript/combinformation/messageResponses/";
var initialPingResponseFile = "cfAlreadyStarted.html";
var pingResponseFile = "pingResponse.html";
var setPrefsAndSeedsOkFile = "cfSetPreferencesAndSeedsOkResponse.html";
var setPrefsAndSeedsErrorFile = "cfSetPReferencesAndSeedsError.html";
var debugDiv;
var enableLaunch;
var disableLaunch;
var cancelButtonId = "cancel_launch_button";
var pingWaitTime = 1000;
var pingWaitTimeCookie = new Cookie(document, "Ping_Wait", 240, "/");
var debugLaunch	= true;
var MAX_WAIT = 5000;

function buildPingRequest(okResponseFile, errorResponseFile)
{
	return CF_URL + '<ping_request ok_response_url="' + msgDir + okResponseFile + '" />';
}

function disableLaunchButton()
{
	document.forms[0].launch_button.disabled = true;
	
	displayCancelLaunchButton();
}

function enableLaunchButton()
{
	document.forms[0].launch_button.disabled = false;
	
	hideCancelLaunchButton();
}

function disableCuratedLaunchButtons()
{
	displayCancelLaunchButton();
}

function enableCuratedLaunchButtons()
{
	hideCancelLaunchButton();
}

function displayCancelLaunchButton()
{
	var launchControls = document.getElementById("launch_controls");
	if (!document.getElementById(cancelButtonId))
	{
		var cancelLaunchButton = createCancelButton("  Cancel Launch  ");
		launchControls.appendChild(cancelLaunchButton);
	}
}

function hideCancelLaunchButton()
{
	var launchControls = document.getElementById("launch_controls");
	var cancelLaunchButton = document.getElementById(cancelButtonId);
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

function cancelLaunch(isCurated)
{
	ping.location = "white.html";
	seeding.location = "white.html";
	pingDone = false;
	seedingDone = false;
	enableLaunch();
}
				
function launchCFWebStart(seedingSpecs, bgcolor, isCurated)
{
   //launchBrowserServer(bgcolor, bgimage);
   //launcherAndBrowserServices(seedingSpecs, bgcolor, bgimage);
   preferencesAndSeedingRequest = 	CF_URL + '<cf_set_preferences_and_seeds_http_request ok_response_url="' + 
   									msgDir + setPrefsAndSeedsOkFile + '" error_response_url="' + msgDir + 
   									setPrefsAndSeedsErrorFile + '">' + 
   									buildCfSetPreferencesAndSeedsXml(seedingSpecs) + 
     								'</cf_set_preferences_and_seeds_http_request>';
     					
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
   launchWithJavascript(initialPingResponseFile, pingResponseFile);
}

function launchWithJavascript(initialPingResponseFile, pingResponseFile)
{  
   debugDiv	= document.getElementById("debug");
   
   pingDone = false;
   seedingDone = false;
   
   initialPingRequest 	= buildPingRequest(initialPingResponseFile);
   pingRequest			= buildPingRequest(pingResponseFile);
   
   attemptInitialPing();
   //alert(pingRequest);
}

function attemptInitialPing()
{
	ping.location.href = "about:blank";
	ping.location.href = initialPingRequest;
	var initPingWaitTime = pingWaitTime;
	if (pingWaitTimeCookie.loadCookie(initPingWaitTime))
		pingWaitTime = initPingWaitTime;   
    setTimeout(initialPing, pingWaitTime);
}

function initialPing()
{
	try
	{  
		//alert(navigator.userAgent);
		/*if (navigator.userAgent.indexOf("Safari") != -1)
		{	
			//alert("safari");
			throw new Exception("safari"); 	
		} */
		if (ping.location.href != msgDir + initialPingResponseFile)
		{
			pingWaitTime += 500;
			debugDiv.innerHTML += " [increase ping wait to " + pingWaitTime + "] ";
			attemptInitialPing();
			return;
		}
		var msg		= "cf already running! ";
		if (debugLauch)
			msg		+= ping.location.href;
		debugDiv.innerHTML += + msg; 
		    	
	}
	catch(e)
	{
		debugDiv.innerHTML += /* e.message + */ "Start loading jnlp";
	   	startCFJNLPWhilePinging();
	   	
	   	//debugDiv.innerHTML	+= " " + ping.location+"<br/>";
   		ping.location.href  = "about:blank";
   		ping.location.href	= pingRequest;
   		intervalId	= setInterval(tryPing, pingWaitTime);
	}
   
   	pingWaitTimeCookie.storeCookie(pingWaitTime);
}

function generatePrefsXml(prefs) // void(Hashtable, boolean)
{
   var result		= "";
   for (var thisParamName in prefs)
   {
      var thisParam	= prefs[thisParamName];
      var thisName	= thisParamName;
		 result		+= '<preference name="' + thisName + '" value="' + thisParam + '"/>';
//		 appletParameters += "," + thisName + "=" + thisParam;
   }
   return result;
}

function buildCfSetPreferencesAndSeedsXml(seedingSpecs)
{
	var preferencesSet = generatePrefsXml(autoPrefs);
	preferencesSet = '<preferences_set>'+ preferencesSet + '</preferences_set>';
	var xmlString = '<cf_set_preferences_and_seeds>' + xmlToString(seedingSpecs) + // preferencesSet + 
					'</cf_set_preferences_and_seeds>';
	return xmlString;
}

function pingResponse()
{
   if (!pingDone)
   {
      pingDone  = true; // ? is there anything like a synchronized in javascript??? 
      seeding.location.href = preferencesAndSeedingRequest;
   }
}

function cfAlreadyStarted()
{
	alert("An instance of combinFormation is already running.");
	if (!pingDone)
	{
		pingDone = true;
		clearInterval(intervalId);
		enableLaunchButton();
	}
	seeding.location.href = preferencesAndSeedingRequest;
}

function cfSetPreferencesAndSeedsError()
{
	alert("Error launching cF while sending preferences and seeeds.");
	enableLaunch();
}

function cfSetPreferencesAndSeedsOkResponse()
{
	//alert("ok response");
	if (!seedingDone)
	{
		seedingDone = true;
		enableLaunch();
	}
}

function tryPing()
{
   var msg;
   if (pingDone)
   {
	  clearInterval(intervalId);
	  return;
   }
   try
   {
	  msg		= "Connection to cF established. " + ping.location.href;
	  var bod	= ping.document.getElementsByTagName("body")[0];
	  msg	   += "|" + bod.innerHTML + "|";
	  clearInterval(intervalId);
   } catch (e)
   {
	  msg		= debugLaunch ? "Permission denied." : "-";
	  ping.location.href	= "about:blank";
	  msg		+= debugLaunch ? " Retrying. " : ">";
	  ping.location.href	= pingRequest;
   }
   var debugDiv	= document.getElementById("debug");
   debugDiv.innerHTML	= debugDiv.innerHTML+" " + msg;
}
function clearStatus()
{
	  clearInterval(intervalId);
} 
/* end of launch cf with javascript and iframes code */
  
function launcherAndBrowserServices(seedingSpecs, bgcolor, bgimage, that)
{
   if (!that)
      that	= seeding;

   goApplet(that, "CFLauncherAndBrowserServices", "cf.app.CFLauncherAndBrowserServices.class", 
   			seedingSpecs, bgcolor, bgimage, otherPrefs.cfArchiveSet);
}
function goCollage2(seedingSpecs, that, bgcolor, bgimage)
{
   /*
   if (!that)
      that	= applets;
  */
  	goCollage(seedingSpecs, false, false, false, bgcolor, bgimage, that);
//   goApplet(that, "CollageMachine", "cm.ecology.CMShell.class",
//   goApplet(that, "CollageMachine", "cf.app.CMShell.class", //old working version
//	    seedingSpecs, bgcolor, bgimage);
} 
//function goApplet(that, appletName, appletCode,
//		  seedingSpecs, netPrivs,
//		  justFollow, search, bgcolor, bgimage)
function goApplet(that, appletName, appletCode,
		  seedingSpecs, bgcolor, bgimage, archive)
{
   //alert("goApplet: that=" + that + " appletName=" + appletName + " appletCode=" + appletCode + 
   //			" seedingSpecs=" + seedingSpecs + " bgcolor=" + bgcolor + " bgimage=" + bgimage);
   
   top.defaultStatus	= "Configuring combinFormation runtime environment.";
	
   if (bounce)			   // look out for quick double click
      return;
   bounce	= 1;
   
   if (mac)
   {
      if (ie)
      {
	 if (window.confirm("IE does not support Java//Javascript properly.\nYou need Safari (Panther version or newer) or perhaps Firefox.\nWould you like to download Safari 1.2?"))
	    getJava("http://www.apple.com/safari/");
	 bounce	= 0;
	 return;
      }
      else if (badSafari)
      {
	 if (window.confirm("Sorry, that version of Safari is not compatible.\n Would you like to upgrade to 1.2."))
	    getJava("http://www.apple.com/safari/");
	 bounce	= 0;
	 return;
      }
      else if (!mac_osx)
      {
	 if (window.confirm("I'm sorry.\nYour browser is not able to do this.\nI'd like to explain.\nCan I please take you to tech support?"))
	    location = "/ecology/combinFormation/support.html";
	 bounce	= 0;
	 return;
      }
   }

      //thatDocument.open("text/html", "replace");
      var thatDocument	= that.document;
      if (!bgcolor)
		 bgcolor	= "ff0000";
//	 bgcolor	= "000000";
      bg		= attrVal("bgcolor", bgcolor);

      if (!bgimage)
		 bgimage = "";
		 
      var ga = '<html><BODY gen="yes" ' + bg + bgimage + '>\n';
      thatDocument.writeln(ga);
   
   var base = (rootDir.indexOf("http://") == -1) ?
	  otherPrefs.startURL + rel(rootDir)
	  : rootDir;
//   alert(rootDir+", " + base);

      var codebase	= base + otherPrefs.codebase;
    //alert(rootDir +" -> " + codebase);
//	alert(otherPrefs.cmjar);
      doApplet(thatDocument, appletCode, codebase, archive);

      if (appletName == "CFSessionLauncher" 	|| 
      	  appletName == "CFLauncherAndBrowserServices")
      {
	 	collageSpecific(thatDocument, seedingSpecs, bgcolor);
	  }
      else if (appletName == "CMShell")
      {
	 	collageSpecific(thatDocument, seedingSpecs, bgcolor, true);
	  }
      thatDocument.writeln(closeApplet());
//      if (javaPlugin != 1)
//      {
	 thatDocument.writeln(scrFunc +
			       "doit() {collageError(rootDir);}"
			       + scriptOff);
	 thatDocument.writeln(scriptOn + "\n" +
			      "var popup3Win;\n" +
			      "function feedback(page) { feedback(rootDir,page);}\n"
			       + popupFuncs
			       + scriptOff);
	 thatDocument.writeln('<br><br><br>\n\n\n');
//      }
      thatDocument.writeln('<iframe name="interlude" src="/blankNav.html" width=10 height=10></iframe>');
      thatDocument.writeln('</body></html>');
      thatDocument.writeln('\n\n\n');
      thatDocument.close();
      top.defaultStatus	= 
	"Downloading combinFormation jar file, then starting up.";
      top.setTimeout("top.defaultStatus	= '';", 60000);
//   }
   bounce	= 0;
}
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
/**
 * @param attrs	Attributes for size and alignment only.
 */
function openApplet(attrs)		   // String(String)
{
  //  alert("openApplet( javaPlugin="+javaPlugin);
   var  o = (javaPlugin == 0) ? '<applet mayscript="true"'
      : (javaPlugin == 1) ?
'<embed type="application/x-java-applet;version=1.5" scriptable="true" mayscript="true" ' + attrVal('pluginspage',downloadLocation)

      : '<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"' +
      attrVal("codebase",downloadLocation)
;
   o	+= '\n ' + attrs;
   if (javaPlugin == 2) // IE object syntax
   {
      o	+= '>';
   }
   o	+= '\n ';
   //alert(o);
   return o;
}
function closeApplet()		   // String()
{
   var c = '\n';
   c    += javaPlugin ? (ns4) ? "></embed>" : '</object>' : '</applet>';
   c    += '\n';
   return c;
}
function doApplet(thatDocument, appletCode, codebase, archive)
{
   var firstClose	= (javaPlugin != 2) ? "\n" : ">\n";
//   var firstClose	= (javaPlugin == 1) ? "\n" : ">\n";

   var scriptTags	= (javaPlugin != 2) ? "" :
      param("scriptable", "true") + param("mayscript", "true");

   // function for code, codebase, and archive parameters
   var locParam		= (javaPlugin != 2) ? attrVal : param;
   
   var inLine;

   if (autoPrefs)
       inLine	= (autoPrefs.screenSize == 1000);
   
   var width	= attrVal("width", inLine ? 356 : 20);
   var height	= attrVal("height", inLine ? 315 : 20);
   
   
   var a = openApplet('align="baseline" ' + width + height);

   a	+= locParam("code", appletCode);
   appletParameters += "code=" + appletCode;

   
   if (host.indexOf("http://") == -1)
	  codebase = host + codebase;
   
  if (javaPlugin != 2)
  {
	 a    += locParam("codebase", codebase);
	 appletParameters += ",codebase=" + codebase;
  }

   var codeLocation= "";
   if (archive)
   {
//      codebase	+= "/";
//      var toArchive	= host + codebase + archive;
//      codeLocation	= locParam("archive", toArchive + ".jar");
      codeLocation	= locParam("archive", archive);
      appletParameters += ",archive=" + archive;
   }
   
   if (javaPlugin != 2)
      codeLocation     += "\n>\n";
   
   if (javaPlugin == 2)
   {
      a    += param("codebase", codebase);
      appletParameters += ",codebase=" + codebase;
   }

   a +=  codeLocation + scriptTags;

//   alert(a);
   thatDocument.writeln(a);
}
function param(name, val)
{
   var para;
   if ((javaPlugin == 1) && ns4)
      para	=  "\n" + attrVal(name,val);
   else
      para	= '<param' + attrVal("name",name) + "\t" +
	 	  attrVal("value",val)+">\n";
   return para;
}
var Q = '"';
var QUOTED_Q = '&#34;';
var qMark		= QUOTED_Q;
function preference(name, val)
{
   return '<preference name=' + 
	  qMark + name + qMark + " value=" + qMark + val+ qMark + "/>"
//   return '<preference name=&#34;' + name + "&#34; value=&#34;" + val+"&#34;/>"
//   return '<preference name="' + attrVal("name",name) + +attrVal("value",val)+"/>";
}
function getSeed(type, value)
{
   return '<seed type=&#34;' + type + "&#34; value=&#34;" + value+"&#34;/>"
}

function grooveSpecific(that)
{
   var gs = param("guiclass","GUI") +
      param("groovewidth", "300") +
      param("grooveheight", "320") +
      param("toolbarx","0") +
      param("toolbary","0") +
      param("toolbarheight",60) +
      param("toolbarcolor","ccff99") +
      param("ostakesx"	,"6") +
      param("ostakesy"	,"28");
   that.document.writeln(gs);
}
function weavingSpecific(that, seedingSpecs)
{
   var ws = param("sleep", 40) +
      param("toolbarx","0") +
      param("toolbary","0") +
      param("toolbarheight",60) +
      param("toolbarcolor","ccff99") +
   that.document.writeln(ws);
   if (seedingSpecs)
      that.document.writeln(param("bgimage", seedingSpecs[0]));
}
function collageSpecific(thatDocument, seedingSpecs, bgcolor, emitAll)
{
   var whichFrame	= ie4 ? "interlude" : "_blank";
   var as = param("frame", whichFrame) +
      param("bgcolor",bgcolor) + param("rootDir", rootDir);
   
   thatDocument.writeln(as);
   
   var seedSet;
   if (seedingSpecs instanceof Array)
   {
	  seedSet	= "<seed_set>";
	  for (var i=0; i!=seedingSpecs.length; i++)
		 seedSet	= seedSet + seedingSpecs[i];

	  seedSet	   += "</seed_set>";
   }
   else
   {
	  seedSet		= xmlToString(seedingSpecs);
	  seedSet		= seedSet.replace(/"/g, '&#34;');
   }
   //alert(seedSet);
   seedSet		= param('seed_set', seedSet);
   thatDocument.writeln(seedSet);

   autoPrefs.big_images	= otherPrefs.abstracted;
   autoPrefs.pixelation	= otherPrefs.abstracted;

   if (emitAll)
   {
	  emitParameterArray(thatDocument, autoPrefs);
   }
   else
   {
	  var preferencesSet = generateParameterArray(autoPrefs);
	  preferencesSet = '<preferences_set>'+ preferencesSet + '</preferences_set>';
	  //   alert(preferencesSet);
	  thatDocument.writeln(param("preferences_set", preferencesSet));
   }
}

//----------------- collage machine javascript urls ------------------------
function argsCollage()
{
   goCollage2(argsCollage.arguments);
}
function arsCollage()
{
   goCollage(arsCollage.arguments, "yes", null, null, "020B4A","");
}
function openStacksCollage()
{
   stacksCollage();
}
function goWeave(seedingSpecs)
{
   goApplet(applets, "Weaving", "VisualMusic.RainShell.class", seedingSpecs);
}
function stacksCollage()
{
   var i = 0;
   var collageArgs	= new Array();
   var content		= content.location + "";
//   alert("checking " + content);
   if (content.indexOf("webdriver") >= 0)
   {
//      alert("collage to include " + content);
      collageArgs[i++]	= content;
   }
   collageArgs[0]	="/cgi-bin/webBlade/webdriver.exe?MIval=allCitations";
   goCollage(collageArgs);
}
function chainsCollage()
{
   var collageArgs	= new Array();
   collageArgs[0]	="/chains/greet.html";
   goCollage(collageArgs);
}
//-------------------- weaving rain javascript urls -------------------------
function rain()
{
   goWeave();
}
function selfPortrait()
{
   var weaveRefs	= new Array();
   weaveRefs[0]		= "/andruid/Images/andruidDance.JPG";
   goApplet(applets, "Self-Portrait", "VisualMusic/RainShell.class", weaveRefs);
}
//--------------------- groove thang javascript url ------------------------
function grooveThang()
{
   goApplet(applets, "Groove Thang #1", "VisualMusic/GrooveShell.class");
}
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
function labelSpan(text)
{
   var result =  document.createElement("span");
   result.style.textAlign = "right";
   result.style.marginLeft = "12px";
   result.innerHTML = text;
   return result;
}

function addSizeParams(sizeIndex)
{
   var prior =  document.getElementById("topwidth");
//   alert("addSizeParams("+prior+" "+sizeIndex);
   
   if ((sizeIndex == 0) && (prior == null))
   {
      var thatH5 = document.getElementById("oollage_size_h5");
//      alert("addSizeParams() "+ thatH5);
      
      thatH5.appendChild(labelSpan("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width"));
      thatH5.appendChild(sizeInputElement("topwidth"));
      thatH5.appendChild(labelSpan("height"));
      thatH5.appendChild(sizeInputElement("topheight"));
   }
}
function collageSize() // String()
{
   var h5 = document.getElementById("oollage_size_h5");
//   alert("h5="+h5);
   
   generatePrefSelect(h5, "screen_size", autoPrefs, "autoPrefs", addSizeParams);
//   generatePrefSelect(h5, "screen_size", autoPrefs, "autoPrefs", "addSizeParams(this.selectedIndex)");
//   alert("autoPrefs.screen_size="+autoPrefs.screen_size);
   
   if (autoPrefs.screen_size == 0)
      addSizeParams(0);
}

function specCollage(specs, bgcolor, that) // void (String,String)
{
   var seedingSpecs		= new Array();

   parseSpecs(specs, seedingSpecs);
//   goCollage2(seedingSpecs, that, bgcolor);
   //for (var i=0; i<seedingSpecs.length; i++)
   	  //alert(seedingSpecs[i]);
   launchCF(seedingSpecs, bgcolor);
   //goCollage2(seedingSpecs, that, bgcolor);
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
/**
 * Parse an associative array of interface specifications.
 * Entries are of the form name/value, or they may be nested associative
 * arrays, in which case, they are processed with recursive descent.
 * In the case of nested arrays, the attribute name of the enclosing array
 * entry will be prepended to the interior attrribute names that are emitted.
 * 
 * Output resulting html -- in the form param name/value specs for an applet --
 * to the etarget window.
 */
function emitParameterArray(targetWindow, thisDictionary, prepend) // void(Hashtable, boolean)
{
   if (!prepend)
      prepend		= "";
   for (var thisParamName in thisDictionary)
   {
      var thisParam	= thisDictionary[thisParamName];
      var thisName	= prepend + thisParamName;
//    alert(thisParamName+" '"+ (typeof thisParam)+"'");
      if ((typeof thisParam) == "object")
      {
		 emitParameterArray(targetWindow, thisParam, thisName + "-");
      }
      else
      {
		 targetWindow.write(param(thisName, thisParam));
//		 appletParameters += "," + thisName + "=" + thisParam;
	  }
   }
}
function generateParameterArray(thisDictionary, prepend) // void(Hashtable, boolean)
{
   var result		= "";
   if (!prepend)
      prepend		= "";
   for (var thisParamName in thisDictionary)
   {
      var thisParam	= thisDictionary[thisParamName];
      var thisName	= prepend + thisParamName;
//	  alert(thisParamName+" '"+ (typeof thisParam)+"'");
      if ((typeof thisParam) == "object")
      {
		 result		+= generateParameterArray(thisParam, thisName + "-");
      }
      else
      {
		 result		+= preference(thisName, thisParam);
//		 appletParameters += "," + thisName + "=" + thisParam;
	  }
   }
   return result;
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
function startCFJNLPWhilePinging()
{
	if (!pingDone)
	{
		//launch the application launcher via JNLP
 		startCFJNLP();
	}
}

function startCFJNLP()
{
	cf_jnlp.location.href = rootDir + 'code/java/cf/cF.jnlp';
}

/**
 * Grab the applet parameters. These should already be assembled when called.
 */
function getAppletParameters()
{
	return appletParameters;
}

//alert(msgDir);
