var popupArgs	= 'resizable=yes,scrollbars=yes,location=yes';

var ourWindow;

function siiPopup(href)
{
   var width	= Math.min(screen.availWidth, 860);
   var height	= Math.min(screen.availHeight, 680);

   ourWindow = popup10(href, 'sii_content', width, height, popupArgs, true);
}

function popupListSignup(site)
{
  var href = "http://www.csdl.tamu.edu/mailman/listinfo/" + site + "/";
  siiPopup(href);
}

function popupListArchives(site)
{
  var href = "http://www.csdl.tamu.edu/pipermail/" + site + "/";
  siiPopup(href);
}

function marginHack(ref)
{
    var moz = (typeof document.implementation != 'undefined') && (typeof
     document.implementation.createDocument != 'undefined');
    var ie = (typeof window.ActiveXObject != 'undefined');
        
	if (moz)
	{
	   ref.style.setAttribute("margin", "0px 0px 50px 35px");
	}
	else if (ie)
	{
	}
}
