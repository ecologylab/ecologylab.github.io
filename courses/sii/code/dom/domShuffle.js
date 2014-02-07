var body = document.body;

var currentNode=body.firstChild;

function shuffleBodyNodes()
{
   while ((currentNode != null) &&
	  (currentNode.nodeType != ELEMENT) ||
	  (tag(currentNode) == "script"))
   {
      currentNode	= currentNode.nextSibling;
      if (currentNode == null)
	 break;
   }
   var  nextNode	= currentNode.nextSibling;
   body.removeChild(currentNode);
   body.appendChild(currentNode);
   currentNode	= nextNode;
   if (currentNode == null)
      clearInterval(timedFunc);
}

var originalOnLoad	= window.onload;
// alert(body.getAttribute("onLoad"));

var timedFunc;

function setupTimer()
{
   alert("setupTimer()");
   if (originalOnLoad != null)
      originalOnLoad();
   timedFunc	= setInterval("shuffleBodyNodes()", 3000);
}

/*
var oldLoad = "" + window.getAttribute("onload");
var ourOnLoad = "; setupTimer()";
//if (oldLoad)
window.onload	= new Function( oldLoad  + ourOnLoad);
 */
window.onload		= setupTimer;
