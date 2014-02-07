// -*-Java-*-
// @package creating.js.ecology
///////////////////////////// openStacks /////////////////////////////////////

/**
 * Path to the Informix WebBlade webdriver gateway.
 */
var webDriver	= "/cgi-bin/webBlade/webdriver.exe"; // URL
var params	= "";				     // String
/**
 * Open Stacks javascript dispatch to connect stem-generated framesets
 * to Informix Web Blade functionality.
 * Divines the database function (e.g., browseAll, browseTitle, editTitle,...)
 * from the top-level URL -- this will only work inside a frameset.
 * 
 * @param	that - the frame/window we're gonna bring the content to.
 * @param	mival - optional, to set arg passed to informix.
 * @param	bgcolor -- optional param. A temporary bgcolor for that.
 *		Defaults to "ccffaa".
 */
function goStacks(that, mival, bgcolor)   // Document, String, Color
{
   // setup for the coming context
   top.rootDir	= "/ecology/";
   top.resetPaths();
   // parse for page name
   var loc	= top.location + "";
   if (!mival)
      mival	= loc.substring(loc.lastIndexOf("/") + 1,
				loc.indexOf(".html"));
   // give the page some temporary color
   bgcolor	= defaultVal(bgcolor,"ccffaa");
   that.document.write("<body" + nameVal("bgcolor",bgcolor) +
		       ">\n<br></body>");
   that.document.close();
   
   var s	= top.location.search;
//   alert(s);
   if (!s || (s.length <=1))
      s		= "";
   else
   {
      params	= "?" + s.substring(1);
//      alert("setting params to " + params);
      s		= "&" + s.substring(1);
   }
//   alert("from " + top.location + " to " + webDriver + "?MIval=" + mival + s);
   // go there
   replace(webDriver + "?MIval=" + mival + s +"&f=a", that);
}

/**
 * Constructor for a navigation element.
 */
function NavElement(text, href, insecure)	   // NavElement(String, URL,boolean)
{
   this.text	= text;
   this.href	= href;
   this.insecure= insecure;
}
function editMode()		   // boolean()
{
   var c = top.document.cookie + "";
   return c.indexOf("stacksLib=cherry") >= 0;
}

function moreNav(that, navElements)	   // void(Document, NavElement[])
{
//   alert("moreNav w search="+search);
   if (navElements && (navElements.length > 0))
   {
      var search = top.location.search;
      var doc = that.document;
      doc.writeln('<table width="100%" cellpadding="0" cellspacing="0" border="0">');
      var num = navElements.length;
      for (var i=0; i!=num; i++)
      {
	 var thisNav	= navElements[i];
	 if (editMode() || thisNav.insecure)
	 {
	    doc.writeln('<tr><td colspan="2">' + spacer(50,5) + '</td></tr>');
	    doc.writeln('<tr><td valign="top" align="right"><b><font face="&{top.textFace};%"');
	    doc.write(' size="&{top.normal};%"><span class="nav">');
	    doc.writeln('<a target="_top"' +
			nameVal("href",thisNav.href + search) +
			">" + thisNav.text + "</a></td><td>" + spacer(8,10) +
			"</td></tr>");
	 }
      }
      doc.writeln("</table>");
   }
}
