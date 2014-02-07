var navigation	= new Array();
navigation[0]	= new top.NavElement("browse<br>this title",
				     "browseTitle.html");
navigation[1]	= new top.NavElement("new<br>citation",
				     "editCitation.html", 1);
top.moreNav(self, navigation);
