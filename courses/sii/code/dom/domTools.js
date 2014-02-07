/**
 * DOM Node types 
 */
var ELEMENT	= 1;
var TEXT	= 3;
var COMMENT	= 8;
var ATTRIBUTE	= 2;

function nodeTypeString(node)
{
   var nodeType	= node.nodeType;
   var result = (nodeType == ELEMENT) ? "ELEMENT" :
      (nodeType == TEXT) ? "TEXT" :
	 (nodeType == COMMENT) ? "COMMENT" :
	    (nodeType == ATTRIBUTE) ? "ATTRIBUTE" : nodeType;
   if (nodeType == ELEMENT)
      result += " " + tag(node) +" ";
   return result;
}

function tag(node)
{
   return node.tagName.toLowerCase();
}
//alert("yo 2");
