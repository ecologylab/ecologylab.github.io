var navigation	= new Array();
navigation[0]	= new top.NavElement("edit<br>this citation",
				     "editCitation.html");
navigation[1]	= new top.NavElement("browse<br>this title",
				     "browseTitle.html", 1);
navigation[2]	= new top.NavElement("edit<br>this title",
				     "editTitle.html");
top.moreNav(self, navigation);
