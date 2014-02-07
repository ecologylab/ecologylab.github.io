//<script language=JavaScript>
/**
 * JavaScript functionality for the Creating Media public Internet site.
 */
// @package creating.js.common

/**
 * Sense the users's browser, and setup variables for easy decision
 * making thereupon later.
 * 
 * Copyright 1998-2002 by Creating Media LLC.  All rights reserved.
 * All rights reserved.  Company confidential.  Non-disclosure applies.
 */
////////////////////////////// BrowserSense /////////////////////////////////

/**
 * Browser appVersion.
 */
var version	= navigator.appVersion;	// String
var userAgent	= navigator.userAgent;
//alert("before setupCheckPlugin();");
var versionAgent	= version + userAgent;


/**
 * Browser claims "mozilla compatability".
 */
var mozilla;				// boolean

/**
 * Browser release level.
 */
var browserV;				// int

ie	= (version.indexOf("MSIE") != -1);
if (ie)
{
   var msie	= navigator.userAgent.indexOf("MSIE ") + 5;
   browserV	= parseInt(navigator.userAgent.substring(msie));
}
else
   browserV	= parseInt(version);
safari = (userAgent.indexOf("Safari") != -1);
opera = (userAgent.indexOf("Opera") != -1);
mozilla = (navigator.appCodeName == "Mozilla");
ie3	= (version.indexOf("MSIE 3") >= 0);
gecko	= (userAgent.indexOf("Gecko") != -1);
//alert(userAgent+" "+gecko);
var browser = safari ? "Safari" : opera ? "Opera" : gecko ? "Mozilla" : ie ? "IE" : "Unknown";

/**
 * Indicates Windows 3.11
 */
var win31	= version.indexOf("16") != -1; // boolean
//alert(version+" - "+userAgent);

/**
 * Version 4 browser identified.  Upward compatible for v5.
 */
var v4	= 0;		   // boolean
v4	= browserV >= 4;
var v5	= browserV >= 5;
var v6	= browserV >= 6;
var v7	= browserV >= 7;

/**
 * Version 3 browser identified.
 */
var v3	= 0;		   // boolean
var v3	= browserV == 3;

/**
 * Microsoft IE 4 identified.
 */
var ie4	= ie && v4;		   // boolean
/**
 * Microsoft IE 5 identified.
 */
var ie5	= ie && v5;		   // boolean
/**
 * Microsoft IE 6 identified.
 */
var ie6	= ie && v6;		   // boolean
/**
 * Netscape Navigator identified.
 */
var ns	= mozilla && !ie;	   // boolean
/**
 * Netscape Navigator Version 3 aka Communicator identified.
 */
var ns4	= ns && v4;		   // boolean
/**
 * Netscape Navigator Version 3.
 */
var ns3	= ns && v3;		   // boolean
/**
 * Macintosh user.
 */
var mac	= (version.indexOf("Macintosh") != -1);	// boolean
var mac_osx = mac && (userAgent.indexOf("OS X") != -1);
var safariNum = -1;
var safariStart = version.indexOf("Safari/");
if (safariStart > -1)
      safariNum	= parseInt(version.substring(safariStart + 7));
//alert("safariNum="+safariNum);      
var badSafari =  mac_osx && (safariNum < 100 && !mozilla); // this is Safari 1.0
// Safari 1.0 is 85.7 or some other numbers...
// Safari 1.1 is Safari/100
// it seems Safari 1.2 can be Safari/125.8

var ie45mac = mac && (version.indexOf("MSIE 4.5") != -1); // boolean
var ie5mac = mac && (version.indexOf("MSIE 5") != -1); // boolean
var iemac   = ie45mac || ie5mac;		       // boolean
/**
 * 68000-based Macintosh user. <i>Very</i> slow.
 */
var oldMac	= (version.indexOf("68K") != -1);	// boolean

/**
 * SGI user.
 */
var sgi	= (version.indexOf("SGI") != -1);	// boolean

var solaris = (version.indexOf("Solaris") != -1);	// boolean

/**
 * Browsers before Version 3.  The stone age of JavaScript.
 */
var old	= (browserV < 3);	   		// boolean

/**
 * Let us know if the browser's javascript is up to snuff.
 */
var strongBrowser = browserV >= 4;

var noScript = ie3;

String.prototype.contains = function(shorter)
{
   return this.indexOf(shorter) != -1;
}

var win_2k = userAgent.contains("Windows NT 5.0");
var win_xp = userAgent.contains("Windows NT 5.1");
var win_nt = userAgent.contains("Windows NT 4.");
var win_9x = userAgent.contains("Windows 98") || userAgent.indexOf("Windows ME");
var windows = win_2k || win_xp || win_nt || win_9x;

var linux  = userAgent.contains("Linux");

var os = mac_osx ? "Mac OS X" : mac ? "Mac OS ?" : win_xp ? "Windows XP" : win_2k ? "Windows 2000"  :
  win_nt ? "Windows NT" : win_9x ? "Windows 9x" : linux ? "Linux" :
  solaris ? "Solaris" : sgi ? "Irix" : "Unknown";

//</script>

