// -*-Java-*-
// @package creating.js.ecology
///////////////////////////// site /////////////////////////////////////
var imageDir;
var headerDir;
var codeDir;
function resetPaths()
{
   imageDir	= rootDir  + "Images/"; // Path
   headerDir	= imageDir + "header/"; // Path
   codeDir	= rootDir  + "code/";  // Path
}
resetPaths();

nameVal = nameValStr;

/**
 * duplicate definitions to mimic body style sheet for ns3, and hack browser
 * syntax for ns4, cause its incompatible with ie3.
 */
var textFace = "Verdana, Century Gothic, Tahoma, Geneva, Arial, Sans-Serif"; // String
var textStyle  = textFace;						  // String
var captionColor = "#996600";
var subHeadColor = "#cc6600";
var headSize  = "+1";
var selectSize	= "-1";
var tmSize	= "1";
var sloganSize = "2";
var nav;
var smaller;

/*
 * Font size to mimic the small style.
 */
if (ns3 || (browserV < 3))
{
   small = "-1";		   // String
   smaller = "-2";		   // String
   normal= small;
   larger="+0";
}
else
{
   small = "";
   smaller = "";
   normal= "";
   larger="";
}
var nav=normal;

function ecologyBody(rev, load, focusM)	   // String(boolean)
{
   var bod, onLoad;
   load		= load  ? nameValStr("onLoad", load +"()")	: "";
   focusM	= focusM ? nameValStr("onFocus",focusM+"()")	: "";
   if (!rev)
      bod = '<BODY bgcolor="#ccff99" text="#000000" topmargin="0"\n' +
      'link="#ff6600" vlink="#006699" alink="#ff6600"' + load + focusM + '>';
   else
      bod = '<BODY bgcolor="#000000" text="#ffffff" topmargin="0"\n' +
      'link="#00ffff" vlink="#ffff00" alink="#00ffff"' + load + focusM + '>';
   return bod;
}

function ecologyHead(that)
{
   // !!! line breaks precise to coax buggy navigator 4
   that.document.writeln('<html>');
   that.document.write('<head>' + styleSheet("ecology"));
   that.document.write('</head>');
   that.document.writeln("");
}

function ecologyStart(that, icon, noLine, rev, load, focusM) // void(Window,String,boolean,boolean, Function, Function)
{
   with (that.document)
   {
      writeln('<html>');
      ecologyHead(that);
      writeln(ecologyBody(rev, load, focusM));
      if (thisPage == "theory")
	 writeln(oldEcologyHeader(thisPage,thisAlt,icon, noLine,rev));
      else
	 writeln(ecologyHeader(thisPage,thisAlt,icon, noLine,rev));
      if (ns4)
      {
	 for (i=0;i!=100;i++)
	    write("");
      }      
   }
}
var topCell	= "<td valign=\"top\"";
var topImg	= "<img align=\"top\"";
var leftImg	= "<img align=\"left\"";
function ecologyHeader(page, alt, icon, noLine, rev) // String(String,String,String,boolean)
{
   var spaceHeight = ie45mac ? 1 : 6;
   var h  = spacer(200, spaceHeight,"top") + "<br>" + table() +
      // blank space at the top
      '<tr colspan="3"><td valign="top">' + spacer(100,5) + '</td></tr>\n' +
      // first content row -- usually blank on the left
      '<tr>\n' +
      topCell + '>';
   var interf	= "interf.GIF";
   var cm	=
      (icon != null) && (icon.indexOf("collageMachine") != -1);
   if (rev)
      rev	= "rev-";
   else
      rev	= "";
   if (!icon)
      h += '&nbsp;\n';
   else
   {
      var iconName	= icon;
      var iconWidth	= 96;
      var iconSpacer	= spacer(10,1);
      if (cm)
      {
	 iconWidth	= 100;
	 iconSpacer	= spacer(21,1);
	 interf		= "interfWithArrows.GIF"
      }
      if (icon.indexOf(".") == 0)
	 iconName  = page + "Icon" + icon;
      h += iconSpacer + topImg +
	 nameVal("src", headerDir + "icons/" + iconName) +
	 dim(iconWidth,56) + '>';
   }
   var aceEcology = ((self.location+"").indexOf("courses") == -1) ? 
      "aceEcology.GIF" : "aceEcologyCourses.GIF";
   h += '</td>\n<td valign="top" align="right">' + topImg +
      nameVal("src", headerDir + rev + interf) + dim(169,56) +
      ' alt="Interface Ecology"></td>\n' +
      topCell + ' rowspan="2">' + topImg +
      nameVal("src", headerDir + rev + aceEcology) + dim(214,93) + ' ' +
      'alt="presents"></td>\n' + '</tr>\n<tr>\n<td valign="top" colspan="2">';

   // bottom content row, which usually varies
   var spacerWidth	= 10;
   var bottomImage	= 
      nameVal("src", headerDir + "words/" + page + "Words.GIF") +
      dim(283,40) + nameVal("alt", alt) + ' hspace="0">';
   if (cm)
   {
      spacerWidth	= 10;
      bottomImage	= 
	 nameVal("src", headerDir + "icons/collageMachineIconArrows.GIF") +
         dim(44,46) + ' hspace="0">';
      if (thisPage != "collageMachine")
	 bottomImage   += topImg + dim(228,45) + nameVal("alt", alt) + 'hspace="0" ' +
	    nameVal("src", headerDir + "words/" + page + "Words.GIF") + '>';
   }

   h += spacer(spacerWidth,1) + topImg + bottomImage + "</td>\n" + "</tr>\n";
   // horizontal blue line
   if (!noLine)
   {
      var spacerHeight	= 6;
      var lineWidth	= 445;
      var preLine	= "";
      if (cm)
      {
	 spacerHeight	= 2;
	 preLine	= topImg + dim(33,7) +
	    nameVal("src", headerDir + "blueLineWithArrow.GIF") + '>';
	 lineWidth	= 421;
      }
      else
	 // blank space before the line
	 h += '<tr colspan="3">' + topCell + '>' + 
	    spacer(100,spacerHeight) + '</td></tr>\n';

      // the line itself
      h += '<tr><td colspan="3">' + preLine + topImg + ' vspace="0" hspace="0"' +
	 nameVal("src", imageDir + "horizontalBlueLine.GIF") + dim(lineWidth,2)
	 + "></td></tr>";
   }
   h += "</table>";
//   alert(h);
   return h;
}
function oldEcologyHeader(page, alt, icon, noLine, rev) // String(String,String,String,boolean)
{
   var spaceHeight = ie45mac ? 1 : 6;
   var h  = spacer(200, spaceHeight,"top") + "<br>" + table() +
      // blank space at the top
      '<tr colspan="3"><td valign="top">' + spacer(100,5) + '</td></tr>\n' +
      // first content row -- usually blank on the left
      '<tr>\n' +
      topCell + '>';
   if (rev)
      rev	= "rev-";
   else
      rev	= "";
   if (!icon)
      h += '&nbsp;\n';
   else
   {
      var iconName = icon;
      if (icon.indexOf(".") == 0)
	 iconName  = page + "Icon" + icon;
      h += spacer(10,1) + topImg +
	 nameVal("src", headerDir + "icons/" + iconName) +
	 dim(96,56) + '>';
   }
   h += '</td>\n<td valign="top" align="right">' + topImg +
      nameVal("src", headerDir + rev + "interf.GIF") + dim(169,56) +
      ' alt="Interface Ecology"></td>\n' +
      topCell + ' rowspan="2">' + topImg +
      nameVal("src", headerDir + rev + "aceEcology.GIF") + dim(210,93) + ' ' +
      'alt="presents"></td>\n' + '</tr>\n<tr>\n<td valign="top" colspan="2">';
      // bottom content row, which usually varies
   h += spacer(10,1) + topImg +
      nameVal("src", headerDir + "words/" + page + "Words.GIF") + dim(283,40) +
      nameVal("alt", alt) + " hspace=\"0\"></td>\n" + "</tr>\n";
   // horizontal blue line
   if (!noLine)
   {
      h += 
	 // blank space before the line
	 '<tr colspan="3">' + topCell + '>' + spacer(100,6) + '</td></tr>\n';
      // the line itself
      h += '<tr><td colspan="3">' + topImg + ' vspace="0" hspace="0"' +
	 nameVal("src", imageDir + "horizontalBlueLine.GIF") + dim(445,2) +
         "></td></tr>";
   }
   h += "</table>";
//   alert(h);
   return h;
}
function classesEnd(that,moreText)	   // void(Window,String)
{
   var other	= "";
   if (!moreText)
      moreText	= "";
   else
   {
      moreText	+= "<br>";
      other	= "other";
   }
   var tmFont	= '<font face="&{top.textFace};%" size="&{top.tmSize};%"><div class="copyright">';
   var s = topImg +
      nameVal("src", imageDir + "horizontalBlueLine.GIF") + 
      dim(445,2) + ' hspace="0" vspace="0"><br clear="all">' +
      table(0,0,9) + '<tr><td align="center">' +
      '<tr><td>' + tmFont 
      + moreText + "All " + other +
      " media including images, sounds, words and code,<br>\n" +
      '&copy; Copyright 1997-2003 by <a target="_top" ' +
      nameVal("href", "http://www.andruid.com") +
      '>Andruid Kerne</a>. All rights reserved.\n'+ 
      '</div></font></td></tr></table>\n</body>\n</html>';
   that.document.writeln(s);
}
function ecologyEnd(that,moreText)	   // void(Window,String)
{
   var other	= "";
   if (!moreText)
      moreText	= "";
   else
   {
      moreText	+= "<br>";
      other	= "other";
   }
   var tmFont	= '<font face="&{top.textFace};%" size="&{top.tmSize};%"><div class="copyright">';
   var s = '</td></tr></table>' + topImg +
      nameVal("src", imageDir + "horizontalBlueLine.GIF") + 
      dim(445,2) + ' hspace="0" vspace="0"><br clear="all">' +
      table() + '<tr><td>\n' + table(0,0,9) + '<tr><td align="center">' +
      '<a href="javascript:top.giveFeedback()">' +
      "<img " + nameVal("alt", "Provide Feedback") +
      nameVal("src", imageDir + "header/icons/webFeedback.GIF") + 
      dim(46,46) + ' hspace="0" vspace="0" border="0"></a><br>' + tmFont +
      'feedback</td></tr></table></td>' + 

      '<td valign="top"><img ' +
      nameVal("src", imageDir + "1x1Cyan.GIF") + 
      dim(2,75) + ' align="top" hspace="0" vspace="0"></td>' + 

      '<td>' + table(0,0,12) + '<tr><td>' + tmFont 
      + moreText + "All " + other +
      " media including images, sounds, words and code,<br>\n" +
      '&copy; Copyright 1997-2001 by <a target="_top" ' +
      nameVal("href", rootDir + "credits/andruidBio.html") +
      '>Andruid Kerne</a>. All rights reserved.\n'+ 
      '</div></font></td></tr></table></td></tr>\n</table>\n</body>\n</html>';
   that.document.writeln(s);
}

function additionalNav(that)
{
}

function dismissButton(that,needForm)
{
   if (needForm)
      document.write('<form>');
   if (top == that)
   {
      document.write('<tr><td>&nbsp;</td><td colspan="2" align="center"><input type="button" value="Dismiss" onclick="self.close();"></td></tr>');
   }
   if (needForm)
      document.write('</form>');

}

function cmpopup(href, path)
{
//   if (path == null)
//      path	= "../doesWhat/";
   var popupHeight = 477;
   if (ns)
      popupHeight += 10;
   popup10(href, "cmcontent",
	   680, popupHeight, 'resizable,scrollbars,location', true);
//   flexPopup(href, path + "interlude.html", "cmcontent",
//	     660, 450, 'resizable,scrollbars', true);
}
function lexiconPopup(openStacks, path)
{
   if (path == null)
      path	= "../../collageMachine/doesWhat/";
   openStacks	= "../../theory/openStacks/" + openStacks;
   flexPopup(openStacks, path + "interlude.html", "cmcontent",
	     660, 450, 'resizable,scrollbars', true);
}
function giveFeedback()
{
   var toDir	= top.rootDir + "feedbackContent.html";
   var args = "resizable,scrollbars";
   if (ie4)
      args += ",history";
   popup3(toDir + "?page="+ escape(top.location+""),
	  "ecologyfeedback", 620,620, args);
}
