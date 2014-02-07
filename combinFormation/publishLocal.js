var mywindow;

// !!!LOOKOUT: use ecologylab.cs.tamu.edu, not localhost when released!!!
//var server = "/combinFormation/launch/";
var server = "/ecologylab/combinFormation/launch/";
//var server = "http://ecologylab.cs.tamu.edu/combinFormation/launch/";

function relativeAddr(url)
{
   var referrer		= location.href;
   if ((url.indexOf("http://") != 0) &&
       (url.indexOf("/") != 0))
      url =  referrer.substring(0, referrer.lastIndexOf("/"))+"/" + url;
   return url;
}
function publishPopup(url, title, start)
{
   if (title)
   {
      if (title.indexOf(" ") != -1)
	 title	= escape(title);
      url += '&title=' + title;
   }
   if (start)
      url += '&start=' + start;
   mywindow = window.open(url, "cmlaunch", "width=500, height=600, scrollbars,status,resizable, top="+(screen.height-670)+", left="+(screen.width-570));
   mywindow.focus();
}
function regeneratePopup(infospace, title, start)
{
   publishPopup(server + "regenerate.html?infospace="+relativeAddr(infospace), title, start);
}
function seedsPopup(seeds, title, start)
{
   publishPopup("seeds.html?seeds="+seeds, title, start);
}
