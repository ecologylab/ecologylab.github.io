var body = document.body;
//alert(body+" "+ body.link);

var kids	= body.childNodes;

for (var i=0; i<kids.length; i++)
{
   var thatNode	= kids[i];
   alert(i + " type: " + nodeTypeString(thatNode) + thatNode.nodeValue  );
   alert(thatNode.outerHTML);
}
