// showDOM.js

function showDOM(parent) {
		var DOMString = "<font style='font-size: 7.5pt; font-family: Verdana, Arial, Helvetica, sans-serif; '><b>DOM : </b><br /><br />";
		DOMString += displayNodes(document.getElementsByTagName('body')[0],1);
		
		new_window = open("","displayWindow","width=600,height=700,left=50,top=50,scrollbars=1,resizable=1");
    new_window.document.close();
    new_window.document.open();
    new_window.document.write(DOMString);
    new_window.focus();
}
function displayNodes(parent, level) {
    var tmpString = "";
		for (var k=0; k<parent.childNodes.length; k++) {
		    if (parent.childNodes[k].nodeType == 1) {
				    for (var j=0; j<level; j++) 
					      tmpString += "&nbsp;&nbsp;&nbsp;&nbsp;";
    		    tmpString += "lvl: <b>" + level + "</b> | nodeName: <b>"  + parent.childNodes[k].nodeName + "</b> | id: <b>" + parent.childNodes[k].id + "</b><br />";
						
						if (parent.childNodes[k].childNodes.length > 0) {
    				    tmpString += displayNodes(parent.childNodes[k],level+1);
								// this block creates the "closing tags" in the dom displayer
								//for (var j=0; j<level; j++) 
					      //    tmpString += "&nbsp;&nbsp;&nbsp;&nbsp;";
								//tmpString += "/lvl: <b>" + level + "</b> | nodeName: <b>"  + parent.childNodes[k].nodeName + "</b> | id: <b>" + parent.childNodes[k].id + "</b><br />";
						}
				}
		}
		return tmpString;
}