//<script language=JavaScript runat=Server>
// -*-Java-*-
/**
 * JavaScript functionality for the Creating Media public Internet site.
 */
// @package creating.js.common

/**
 * Functionalities useful in many web sites, w tested multi-platform
 * compatability. 
 * 
 * Copyright 1998-2002 by Creating Media LLC.  All rights reserved.
 * All rights reserved.  Company confidential.  Non-disclosure applies.
 */
/////////////////////////// Paths /////////////////////////////////
/**
 * Get the directory portion of the url associated w the current page.
 */
function thisDir()
{
   var  path	= location.pathname + "";
   var lastSlash= path.lastIndexOf('/');
   if (lastSlash >= 0)
   {
      path	= path.substring(0,lastSlash);
   }
   return path;
}

function fullHost()
{
   return location.protocol + "//" + location.host; // + "/";
}

/////////////////////////// ParseArgs /////////////////////////////////
/**
 * Takes a string with values separated by some delimiter
 * 
 * @param	<tt>str</tt>		input String.
 * @param	<tt>splitter</tt>	Delimeter to split around.
 * 
 * @return	An array of Strings that were between the splitters.
 */
function ourSplit(thisStr, splitter)	// String[] (String, char)
{
  if (!thisStr)
      return null;
  if (thisStr.split)
     return thisStr.split(splitter);

  len	= thisStr.length;
  // alert("ourSplit: " + len);
  result	= new Array();
  if (len == 0)
  {	return result; }
  start = 0;
  pozzi	= 0;
  // alert("thisStr="+thisStr + " and splitter=" + splitter + " and " + thisStr.indexOf(splitter));
  
  while (true)
  {
     pozzi	= thisStr.indexOf(splitter, start);
     // alert("ourSplit pozzi=" + pozzi);
     if (pozzi == -1)
     {
	result[result.length] = unescape(thisStr.substring(start, thisStr.length));
	   break;
     }
     // else
     result[result.length]	= thisStr.substring(start, pozzi);
     start			= pozzi + 1;
  }
  pozzi	= 0;
  return result;
}

/**
 * Pull name-value pairs from string into an associative array:
 * First, split input str into an array of Strings, using the parameter
 * delim1 as delimiter.<br>
 * Next, split each of these Strings around '=' into name/value pairs.
 * Add to an associative array, using name as the key, and value
 * as the value.  The values are run through unescape,
 *  so they will no longer be URL encoded, if they were previously.
 * 
 * @param	<tt>str</tt>	Input string to split out.
 * @param	<tt>delim1</tt>	Delimeter for name/value pairs.
 * 
 * @return  The Associative array of name/value pairs.
 */
function doubleSplit(str, delim1, noUnEscape)	// String[] (String, char)
{
   var result	= new Array();	// build associative array of all
   if (str.length == 0)
      return result;
   // alert("doubleSplit:'" + str+"'");
   var set		= str.split(delim1);
//   alert("doubleSplit: set.length=" + set.length)
   for (i in set)
   {
      anArg		= set[i].split("=");
      prop		= unescape(anArg[0]);
      if (prop.indexOf(' ') == 0)
	 prop		= prop.substring(1);
      result[prop]	= noUnEscape ? anArg[1] : unescape(anArg[1]);
//      alert("'"+prop + "' <> " + result[prop]);
  }
  // alert ("result.length="+qq.length + " " + qq.type);
  return result;
}

/**
 * The opposite of double split.
 * Take an associative array of name/value pairs, and repackage it
 * as a single String, to use in a URL.  Values will be URL encoded.<p>
 * 
 * @param	<tt>argArray</tt> Associative array of name/value pairs.
 * @param	<tt>delimiter</tt> Character for separating name/value pairs.<br>
 * 				<I>Optional</I>.  Defaults to '&'
 * @param	<tt>except</tt>, <tt>except2</tt>
 * 		These are names to omit from the final string
 * 				<I>Optional</I>.
 * 
 * @return	URL-encoded String of concatanated name/value pairs.
 */
function unsplit(argArray, delimiter, except, except2, except3) // String (String[], char, String, String, String)
{
  result	= "";
  deli		= defaultVal(delimiter, '&');
  useDeli	= "";
  for (prop in argArray)
  {
//	alert("unsplit prop='" + prop + "' w except='" + except+"'")
     if ((!except || (prop != except)) && (!except2 || (prop != except2))
	 && (!except3 || (prop != except3)))
     {
	val	= argArray[prop];
	if (val && (val != "undefined"))
	{
	   result	+= useDeli + prop + "=" + escape(val);
	   useDeli	=  deli;
	}
     }
  }
  //  alert("unsplit(" + result);
  return result;
}

/**
 * @return the input String capitalized.
 */
function capitalize(str)	   // String(String)
{
   d=str.charAt(0).toUpperCase();
   rest	= str.substring(1, str.length);
   return d + rest;
}

/**
 * Collection of argument processing functions for generating
 * arguments, usually to emit as HTML.
 */
/////////////////////////// EmitArgs /////////////////////////////////
/**
 * @return	return a quoted name value pair or the empty string if
 * 		val is null or undefined or 0.  Suitable for an HTML attribute.
 * @param	<tt>name</tt> Attribute name String.
 * @param	<tt>value</tt> Attribute value. Can be a String or a number.
 */
function nameValStr(name, val)		// String (String, Anything)
{
  if (!val)
     zz = "";
  else
     zz = " " + name + "=" + quote(val);
  return zz;
}
/**
 * @return	return a quoted name value pair.
 * @param	<tt>name</tt> Attribute name String.
 * @param	<tt>value</tt> Attribute value. Can be a String or a number.
 */
function attrVal(name, val)		// String (String, Anything)
{
   return " " + name + "=" + quote(val);
}
nameVal = nameValStr;
/**
 * @return	return a name value pair, with the value quoted, and a
 * space before the name.
 * 		If val is null or undefined or 0, the default value is used.
 * @param	<tt>name</tt> Attribute name String.
 * @param	<tt>val</tt>  Attribute value. Can be a String or a number.
 * @param	<tt>default</tt>
 * 		Default value.Can be a String or a number.Same type.
 */
function nameValDefault(name, val, defaultV) // String (String,Anything,Anything)
{
  v = defaultVal(val, defaultV);
  return " " + name + "=" + quote(v);
}
/**
 * @return	<tt>Val</tt>, if it's not null or undefined.  
 * 		Othewise, <tt>defaultVal</tt>.
 */
function defaultVal(val, defaultV)	// Anything (Anything, Anything)
{
// alert("defaultVal: " + val +","+defaultV)
  if (val || (isNum(val) && (val == 0)))
	vv = val;
  else 			// (!val)
{ 
  if (typeof defaultV == "function")
	vv	= defaultV();
  else
	vv	= defaultV;
}
// alert("return val=" + vv)
  return vv;
}
/**
 * @return	the string passed in, surrounded by double quote marks.
 */
function doubleQuote(s)			// String (String)
{ return '"' + s + '"'; }
/**
 * @return	the string passed in, surrounded by double quote marks.
 */
function singleQuote(s)			// String (String)
{ return "'" + s + "'"; }
var quote	= doubleQuote;
/**
 * isNum needs another class to live in!
 * 
 * @return	True if whatever is passed in is a fixed point number.
 */
function isNum(str)			// boolean (Anything)
{
  str	+= "";
  len	= str.length;
  for (q=0;q!=len;q++)
  {
 	s = str.charAt(q);
	if (((s < "0") || (s > "9")) && (s != "-"))
	{ return false; }
  }
  return true;
}

/**
 * Routines for generating HTML.
 */
/////////////////////////// HTMLGen /////////////////////////////////
/**
 * tail of script tags.
 */
var scriptOn	= "<" + "script>";	   // String
var scriptOff	= "<" + "/script>";	   // String
var scrFunc	= scriptOn + "function ";  // String

/**
 * Generate a transparent spacer GIF.
 */
function spacer(width, height, align, hspace, vspace,whatColor) // String(int,int,String,int,int,String)
{
   fName	= '1x1';
   if (whatColor)
      fName	+= whatColor;
   fName	+= '.GIF';
   if (width && height)
   {
      width	= nameValDefault("width", width, 0);
      height	= nameValDefault("height", height, 0);
      align	= nameValDefault("align", align, "top");
      hspace	= nameValStr("hspace", hspace);
      vspace	= nameValStr("vspace", vspace);
      rrr	= '<img border=\"0\"' +
      nameValStr("src", imageDir + "common/" +fName) + 
      width + height + align + hspace + vspace + '>';
   }
   else
      rrr	= "";
   return rrr;
}

/**
 * Generate html for NS4 JavaScript Style Sheet entry.
 */
function jsStyle(elName, val)	   // String(String,String)
{
   r = 'document.' + elName + '=' + quote(val) + ';\n';
   return r;
}

/**
 * @param	<tt>width</tt> <i>optional</i> html width tag.
 * @param	<tt>spacing</tt> <i>optional</i> cellspacing
 * @param	<tt>padding</tt> <i>optional</i> cellpadding
 * @param	<tt>border</tt> <i>optional</i> border
 */
function table(width, spacing, padding, border)	// String(int,String,int,int)
{
   width	= nameValStr("width", width);
   spacing	= nameValDefault("cellspacing", spacing, 0);
   padding	= nameValDefault("cellpadding", padding, 0);
   border	= nameValDefault("border", border,0);
   return '<table ' + width + spacing + padding + border + '>\n';
}

/**
 * Fancy routine for calling 1 of 3 style sheets:
 * 	<site_name>.js 		for Netscape 4 (and up)
 * 	<site_name>ie3.css	for IE 3
 * 	<site_name>MacIe.css	for IE on the Macintosh (need to pump fonts)
 * 	<site_name>.css		for others (especially IE 4)
 * 
 * These shenanigans are a powerful mechanism for coping w browser,
 * incompatiblities in rendering sizes. Along w the use of javascript
 * entities for Netscape 3, they form a complete package for
 * client-side selected uniform look and feel across version 3 & 4 browsers.
 */
function styleSheet(siteName) // String(String, String)
{
   sheetType 	= "css";
   sheetSuffix	= sheetType;

/*   if (ie3)
      fName		= siteName + "ie3.";
   else if (mac && ie)
      fName		= siteName + "MacIe.";
   else
 */
      fName		= siteName + ".";

   return '<link rel="stylesheet" href='
      + quote(rootDir + "code/styles/" + siteName + "/" + fName+ sheetSuffix)
      + ' type="text/' + sheetType + '">';
}
function styleSheetSimple(siteName) // String(String, String)
{
   if (ns4)
   {
      sheetType 	= "javascript";
      sheetSuffix	= "js";
   }
   else
   {
      sheetType 	= "css";
      sheetSuffix	= sheetType;
   }
   if (ie3)
      fName		= siteName + "ie3.";
   else if (mac && ie)
      fName		= siteName + "MacIe.";
   else
      fName		= siteName + ".";

   return '<link rel="stylesheet" href='
      + quote(rootDir + "code/styles/" + siteName + "/" + fName+ sheetSuffix)
      + ' type="text/' + sheetType + '">';
}

/**
 * Generate width and height attributes
 */
function dim(width, height)	   // String(int,int)
{
   return nameVal("width",width) + nameVal("height",height);
}
/**
 * Empty JavaScript URL for a href when mouseover behavior without
 * click behavior is desired.
 */
function nothing()		   // void()
{
}
/**
 * Replace url if the browser supports it (no extra history entry),
 * otherwise, just go there.
 * @param	href -- url to go to.
 * @param	optional param f -- frame to go in.
 */
function replace(href,f)	// void(URL, f)
{
   if (!f)
      f = self;
   if (top.mac || (top.browserV == 2))
      f.location = href;
   else
      f.location.replace(href);
}
function replaceSearch(search, f) // String(String)
{
   var h = f.location.href + "";
   var q = h.indexOf("?");
   if (q > 0)
      h	= h.substring(0,q);
   replace(h + search, f);
}
function popup(href, width, height, args) // void(URL,int,int,String)
{
   args	= args ? "," + args : "";
   args = "width=" + width +",height="+ height + args;
   var w = open("","_blank",args);
   w.focus();
   w.location.href = href;
}
var NEED_POPUPS = "You need to allow popups for our site\nto use combinFormation.";

function focusOrNeedPopups(win, url)
{
   if (!win)
      alert(NEED_POPUPS);
   else
   {
      if (url)
      {
	 win.location	= "about:blank";
	 win.location	= url;
      }
      win.focus();
   }
}

function popup2(href, title, width, height, args, wind) //Window(URL,String,int,int,String,Window)
{
//   alert("popup2: top " + title +" " +wind);
   args	= args ? "," + args : "";
   args = "width=" + width +",height="+ height + args;
   var w= ((wind != null) && !wind.closed) ? wind : open("", title, args);
//   var w= open("", title, args);
   
/*   w.location		= "about:blank";
//   alert("popup2: " + w + " "+wind+" "+(w == wind));
   w.focus();
   if (((w.location.href + "").indexOf(href) == -1))
      w.location	= href;
 */
   focusOrNeedPopups(w, href);
   return w;
}
var popup3Win;
/**
 * This version of popup is for handling windows with content that is
 * tainted from here. It puts our blank in, before the content.
 */
function popup3(href, title, width, height, args, globalWin) // Window(URL,String,int,int,String,boolean)
{
   args	= args ? "," + args : "";
   args = "width=" + width +",height="+ height + args;
//   return popup4(href, title, args, globalWin);
   var w;
   if (globalWin)
   {
      if (!popup3Win || popup3Win.closed)
	 popup3Win	= open("", title, args);
      w			= popup3Win;
   }
   else
      w			= open("", title, args);
   w.location	= href;
   w.focus();
   return w;
}
function popup4(href, title, args, globalWin) // Window(URL,String,String,Window)
{
   var w;
   if (!globalWin || globalWin.closed)
      w		= open("", title, args);
   else
      w		= globalWin;
   w.location	= href;
   w.focus();
   return w;
}
function popup5(href, title, args, globalWinName) // Window(URL,String,String,Window)
{
   var thatWin	= popup4(href, title, args, eval(globalWin));
   eval(globalWinName + " = thatWin");
}
function popup10(href, title, width, height, args, globalWin) // Window(URL,String,int,int,String,boolean)
{
   args	= args ? "," + args : "";
   args = "width=" + width +",height="+ height + args;
   var w;
   if (globalWin)
   {
      if (!popup3Win || popup3Win.closed)
	 popup3Win	= open("", title, args);
      w			= popup3Win;
      w.resizeTo(width, height);
   }
   else
   {
      w			= open("", title, args);
      w.location	= "about:blank";
   }
   w.focus();
   w.location.href	= href;
   return w;
}
function getWin(title, width, height, args, globalWin) // Window(URL,String,int,int,String,boolean)
{
   args	= args ? "," + args : "";
   args = "width=" + width +",height="+ height + args;
   var w;
   if (globalWin)
   {
      if (!popup3Win || popup3Win.closed)
	 popup3Win	= open("", title, args);
      w			= popup3Win;
   }
   else
   {
      w			= open("", title, args);
      w.location	= "about:blank";
   }
   w.focus();
//   w.location.href	= href;
   return w;
}
function popup4(path, name, width, height, args, wind)
{
  var func= top.ns ? top.popup3 : top.popup2;
  var w  = func(path, name, width,height, args, wind);
  return w;
}
function flexPopup(href, interlude, name, width, height, args, globalWin)
{
   href	= (top.ns || top.mac) ? href : interlude + "?p1="+href;
   var w = popup3(href, name, width, height, args, globalWin);
// !!!put this in the calling interlude window, to avoid permissions prob!!!
   if (top.ns)
      w.focus();
   return w;
}
function flexPopup2(href, interlude, name, width, height, args, globalWin)
{
   href	= (top.ns || top.mac) ? href : interlude + "?p1="+href;
   var w = popup3("about:blank", name, width, height, args, globalWin);
// !!!put this in the calling interlude window, to avoid permissions prob!!!
   w.focus();
   w.location	= href;
   return w;
}
/**
 * Relative addressing function is necessary only for ie3 on 95.
 */
function relative(filename)	   // Path(Path)
{
   path 	= self.location.href;
   end	= path.lastIndexOf('/');
   base	= path.substring(0,end+1);
   return base + filename;
}

/**
 * This function parses back from the page's path, based on ../'s 
 * in the argument.
 */
function rel(displacement)	   // Path(Path)
{
   var path	= self.location.pathname;
   return relRecurses(path, displacement);
}
function relRecurses(path, displacement) // Path(Path, Path)
{
//   alert("very top path="+path);
   var before	= path.length - 1;
   var lastSlash= path.lastIndexOf("/");
   if (lastSlash <= before)
      path	= path.substring(0,lastSlash);
//   alert("top path="+path);

   var dotdotSpot	= displacement.indexOf("../");
//   alert("displacement=" + displacement +" dotdotSpot="+ dotdotSpot);
   if (dotdotSpot != -1)
   {
      displacement	= displacement.substring(dotdotSpot + 3);
      path		= path.substring(0, path.lastIndexOf('/') + 1);
//      alert("altered displacement=" + displacement + "path="+path);
      return relRecurses(path, displacement);
   }
   else
   {
      if ((path.length == 0) || path.lastIndexOf("/") != path.length - 1)
	 path	= path + "/";
      path = path + displacement;
//      alert("and finally " + path);
      return path;
   }
}

function startCell(small, colspan, noTr) // String(boolean, int, boolean)
{
   var size	= small ? "small" : "normal";
   if (colspan)
      colspan	= nameVal("colspan", colspan);
   else
      colspan	= "";
   noTr		= noTr ? "" : "<tr>";
   return noTr + '<td' + colspan + 
      '><b><font face="&{top.textFace};%" size="&{top.' +
      size + '};%"><span class="' + size + '">';
}
function td(stuff)
{
   return "<td>" + stuff + "</td>";
}
/**
 * Does one string contain another?
 */
function contains(longer, shorter) // boolean(String, String)
{
   return longer.indexOf(shorter) != -1;
}
//</script>

function replaceString(source, from, to)
{
   var index = source.indexOf(from);
   if (index > -1)
   {
      var len = from.length;
      var before = source.substring(0, index);
      var afterIndex = index + len;
      if (afterIndex < source.length)
      {
	 var after	= source.substring(afterIndex);
//	 alert(before +to+afterIndex + to +after);
	 return before + to + replaceString(after, from, to);
//	 alert(before + to + after);
//	 return before + to + after;
      }
      else
	 return before + to;
   }
   else
      return source;
}


function nbspTd(num)
{
   var result = document.createElement("td");
   var text = "";
   for (var i=0; i<num; i++)
      text   += "&nbsp;";
   result.innerHTML	= text;
   return result;
}

var nextYear	= new Date();
var lastYear	= new Date();
nextYear.setFullYear(nextYear.getFullYear() + 10); // 10 years from now
lastYear.setFullYear(nextYear.getFullYear() - 1); // 1 years ago
var expires	= "; expires="+nextYear.toGMTString();
var expired	= "; expires="+lastYear.toGMTString();
var path	= "; path=/";
//var domain	= "; domain=" + document.domain;
var domain	= "";
//alert("document.cookie\n'"+document.cookie+"'");

function setCookie(name, val)
{
//  alert("setCookie(" + name + " " + val);
   if (name && val && (name.length > 0) && (val.length > 0))
   {
      var context		= expires + path + domain;
      var thisCookie		= name + "=" + escape(val) + context;
//    alert(thisCookie);
      document.cookie	= thisCookie;
//    alert("document.cookie="+document.cookie);
   }
}

function clearCookie(name)
{
//   alert(expires);
   if (name && (name.length > 0))
   {
      var context	= expired + path + domain;

      var thisCookie	= name + "=" + context;
//    alert("clearCookie(" + thisCookie);
      document.cookie	= thisCookie;
//    alert("cleared document.cookie\n'"+document.cookie+"'");
   }
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
  	{
  		c_start=document.cookie.indexOf(c_name + "=")
  		if (c_start!=-1)
	    { 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
	    } 
  	}
	return ""
}

function fixWebAddr(addr)
{
   var result		= addr;
   var containsSlash	= addr.indexOf("/") > -1;
   if( addr.indexOf(":") == 1 )
   {
   	//	result = addr;
   }
   else if (addr.indexOf(".") == -1)
   {
      if (!containsSlash)
	 result	= "http://www." + addr + ".com";
      // else relative to docbase, which combinFormation should handle
      // internally
   }
   else
   {
      if ((addr.indexOf('://') == -1) &&
	  (addr.lastIndexOf(".") != addr.indexOf("."))) // more than 1 dot
	 result	= "http://" + addr;
   }
   return result;
}

/**
 * Append a new element at the end of the array, growing its length.
 */
function append(thatArray, toAppend)
{
   thatArray[thatArray.length] = toAppend;
}

// This function returns the name of a given function. It does this by
// converting the function to a string, then using a regular expression
// to extract the function name from the resulting code.
function funcname(f) {
    var s = f.toString().match(/function (\w*)/)[1];
    if ((s == null) || (s.length == 0)) return "anonymous";
    return s;
}

// This function returns a string that contains a "stack trace."
function stacktrace() {
    var s = "";  // This is the string we'll return.
    // Loop through the stack of functions, using the caller property of
    // one arguments object to refer to the next arguments object on the
    // stack.
    for(var a = arguments.caller; a != null; a = a.caller) {
        // Add the name of the current function to the return value.
        s += funcname(a.callee) + "\n";

        // Because of a bug in Navigator 4.0, we need this line to break.
        // a.caller will equal a rather than null when we reach the end 
        // of the stack. The following line works around this.
        if (a.caller == a) break;
    }
    return s;
}
