var mywindow;

// !!!LOOKOUT: use ecologylab.cs.tamu.edu, not localhost when released!!!
var server = "http://ecologylab.cs.tamu.edu/combinFormation/launch/";

function relativeAddr(url)
{
   var referrer		= location.href;
   if ((url.indexOf("http://") != 0) &&
       (url.indexOf("/") != 0))
      url =  referrer.substring(0, referrer.lastIndexOf("/"))+"/" + url;
   return url;
}
var win;
var params = "width=1000, height=800,scrollbars=yes,resizable=yes,location=yes";

function pop(url)
{
   if (!win || win.closed) 
   {
      win = window.open("", 'infospaceNav', params);
      try
      {
	 var loc = win.location;   // see if we have access
	 win.moveTo(0,0);	   // if we do, we just created it new
      } catch (e)
      {  // window.open returned a window created by another page of ours
//	 alert("caught access prob");
	 win.location = "about:blank"; // launder location to avoid access err
      }
   }
   else
      win.location = "about:blank"; // launder location to avoid access err

   win.focus();
   win.location = url;
 }

function show(id)
{
   var element = document.getElementById(id);
   if (element)
		element.style.visibility = "visible";
}
function hide(id)
{
   var element = document.getElementById(id);
   if (element)
	  element.style.visibility = "hidden";
}


function regeneratePopup(infospace, title, start)
{
   publishPopup(server + "regenerate.html?infospace="+relativeAddr(infospace), title, start);
}
function seedsPopup(seeds, title, start)
{
   publishPopup("seeds.html?seeds="+seeds, title, start);
}
