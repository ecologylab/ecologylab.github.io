/**
 * inverted index of feeds by category
 */
var categories = new Array();
/**
 * index of feeds by source
 */
var feedsBySource    = new Array();

function parseSource(source)
{
   var sourceName = source.getAttribute("name");
// alert("parseSource("+sourceName + " " +source);
   
   var thisSourceFeeds		= new Array();
   feedsBySource[sourceName]	= thisSourceFeeds;
   
   for (var thatFeedNode=source.firstChild; thatFeedNode != null;
	thatFeedNode=thatFeedNode.nextSibling)
   {
      
      var nodeType	= thatFeedNode.nodeType;
      if (nodeType == ELEMENT)
      {
	 append(thisSourceFeeds, thatFeedNode);
	 var category		= thatFeedNode.getAttribute("category");
//	 alert(thatFeedNode +" "+category);
	 thatFeedNode.setAttribute("source", sourceName);
	 thatFeedNode.source	= sourceName;
	 var thatCategoryFeeds	= categories[category];
	 if (!thatCategoryFeeds)
	 {
	    thatCategoryFeeds	= new Array();
	    categories[category] = thatCategoryFeeds;
	 }
	 append(thatCategoryFeeds, thatFeedNode);
      }
   }
}
function append(thatArray, toAppend)
{
   thatArray[thatArray.length] = toAppend;
}





