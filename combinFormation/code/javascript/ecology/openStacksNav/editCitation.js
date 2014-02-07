var navigation	= new Array();
var i = 0;	
var s = top.location.search + "";
if (s.indexOf("citationOid") >= 0)
{
   navigation[i++]	= new top.NavElement("browse<br>this citation",
				     "browseCitation.html");
}
navigation[i++]	= new top.NavElement("browse<br>this title",
				     "browseTitle.html");
navigation[i++]	= new top.NavElement("edit<br>this title",
				     "editTitle.html");
top.moreNav(self, navigation);
