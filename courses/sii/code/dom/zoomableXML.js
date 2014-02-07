var horizontalLayout	= true;

var sizes  = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
var colors = ["eaf078", "e9f06c", "e9f060", "e8f054", "ecf549", 
	      "ecf53d", "ebf531", "eaf525", "eaf518", "e9f50c", "edfa00"];

function animate(entity, func, increase, hook, hookArg)
{
   var intervalId	= setInterval(nextFrame, 30);
   var frame		= increase ? 0 : (sizes.length - 1);

   function nextFrame()
   {
//      if (!func(entity, frame))
      var result = func(entity, frame, hook, hookArg);
      var notBoolean = (typeof(result) != "boolean");
      if (notBoolean || !result)
      {
	 clearInterval(intervalId);
	 if (entity.metadataDiv != null)
	 {
	    entity.metadataDiv.offsetParent.removeChild(entity.metadataDiv);
	    entity.metadataDiv	= null;
	 }
	 if (notBoolean)
	 {
	    entity.metadataDiv = result;
//	    metadata	= result;
	 }
      }
      if (increase)
	 frame++;
      else
	 frame--;
   }
}

function emphasize(entity, frame, hook, hookArg)
{
   if (frame >= sizes.length)
   {
      return hook ? hook(entity, entity.node, hookArg) : false;
//	 return displayMetadata(entity, entity.node);
   }
   entity.style.fontSize = sizes[frame] + "pt";
   entity.style.color	 = colors[frame];

   return true;
}
function displayMetadata(entity, node, attributeNames)
{
   var deltaX;
   var deltaY;
//   alert("deltaX="+deltaX +);
   
   if (horizontalLayout)
   {
      deltaX	= 20;
      deltaY	= entity.offsetHeight;
   }
   else
   {
      deltaX	= entity.offsetWidth;
      deltaY	= 0;
   }
   var x	= entity.offsetLeft + /*entity.style.paddingLeft*/ deltaX;
   var y	= entity.offsetTop + deltaY;
   

   var metadataDiv = document.createElement("div");
   metadataDiv.className = "metadata";

   var thatMetadata = buildMetadataVisual(node, attributeNames);
   
   metadataDiv.innerHTML = thatMetadata;
// metadataDiv.innerHTML = "title: " + node.getAttribute("title") + "<br/>" + 
//    "author: " + node.getAttribute("author");
   metadataDiv.style.top = y;
   metadataDiv.style.left = x;
   
   entity.offsetParent.appendChild(metadataDiv);
   
// alert(entity.offsetLeft+", "+ entity.offsetTop + " " + entity.offsetParent);
//   alert(node.getAttribute("title"));

//   entity.metadataDiv = metadataDiv;

   return metadataDiv;
}

function deemphasize(entity, frame)
{
   if (frame < 0)
   {
      entity.style.color = entity.origColor;
      return false;
   }
   entity.style.fontSize = sizes[frame] + "pt";
   entity.style.color	 = colors[frame];
   
   return true;
}

function buildMetadataVisual(node, attributeNames)
{
//   alert(node + attributeNames);
   var result = "";
   if (node.length)
   {
      for (var j=0; j< node.length; j++)
      {
	 result += buildMetadataVisual(node[j], attributeNames);
      }
   }
   else
   {
      result += "<table>";
      for (var i=0; i<attributeNames.length; i++)
      {
	 var thatName	= attributeNames[i];
	 var attr	= node.getAttribute(thatName);
	 if (i == 0)
	    attr	= "<b>" + attr + "</b>";
	 
	 var thisRow     = "<tr><td><i>" + thatName + ":</i>&nbsp;</td><td>" + attr
	    + "</td></tr>";
//	alert(thisRow);
	result += thisRow;
      }
      result += "<tr></tr><tr></tr><tr></tr><tr></tr></table>";
   }
   return result;
}
