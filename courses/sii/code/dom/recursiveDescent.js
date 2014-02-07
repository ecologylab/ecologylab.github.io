alert("yo 3");
var body = document.body;

/**
 * dom depth first display
 */
function displayNodes(parent)
{
   for (var thatNode=parent.firstChild; thatNode != null;
	thatNode=thatNode.nextSibling)
   {
      alert(" type:  " + nodeTypeString(thatNode) + "  " + 
	thatNode.nodeValue  );
      var nodeType	= thatNode.nodeType;
      if ((nodeType == ELEMENT) && (tag(thatNode) != "script"))
      {
	 alert("outer = " + thatNode.outerHTML);
      }
//      else if (nodeType == TEXT)
//	 alert(thatNode.nodeValue);

      if (thatNode.hasChildNodes())
	 displayNodes(thatNode);
   }
}
alert("yo 3");

displayNodes(body);
