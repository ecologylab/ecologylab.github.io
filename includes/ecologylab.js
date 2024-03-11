function toggleNav(event)
{
  var nav     =document.getElementById("navigation_container");
  var navStyle=nav.style;
  if (navStyle.visibility == "visible")
      navStyle.visibility = "hidden";
  else
      navStyle.visibility = "visible";
  
  event.stopPropagation();
}

function offNav()
{
      var nav     =document.getElementById("navigation_container");
      var navStyle=nav.style;
      navStyle.visibility = "hidden";      
}

document.addEventListener('keydown', (event) => 
  {
    const keyName = event.key;
    if (keyName == "Escape")
    {
      offNav();   
    }
  // alert('keydown event\n\n' + 'key: ' + keyName);
  });

function offNonTriple(event) {

    var nav     = document.getElementById('navigation_container');
    var triple  = document.getElementById('triple');
    var parent  = event.target.parentNode;
    if (event.target != nav && parent != nav
        && (parent != null && parent.parentNode != nav)
        && event.target != triple && parent != triple
       )
    {
      nav.style.visibility = "hidden";
      event.stopPropagation();
    }
}

window.addEventListener('click', offNonTriple);
window.addEventListener('touchstart', offNonTriple);

function popOutIFrame() 
{
	 var gDocIFrame = document.getElementById("google-doc-iframe");
	 window.open(gDocIFrame.src, '_blank');
}
function popOutIFrame2() 
{
	 var gDocIFrame = document.getElementById("google-doc-iframe2");
	 window.open(gDocIFrame.src, '_blank');
}
/////////////////////////////////////////////
// wishful thinking
//
// include in iframe tag:   onload="fixGDocTargets2(this)"
function fixGDocTargets2(thatFrame)
{
	if (!thatFrame.foo)
	{
		thatFrame.foo	= true;
		var jFrame		= $(thatFrame);
/*
		$(function() {
		    $.get(thatFrame.src, function(html) {
		        jFrame.attr("srcdoc", html);
		        setTimeout(function() {
		            jFrame.contents().find('a[href^="http"]').attr("target", "_blank");
		            jFrame.contents().find('a[href^="https"]').attr("target", "_blank");
		        }, 1000);
		    });
		});
*/
	}
}

function handleKey(e)
{
  
}
function handleClick(event)
{
  alert(event.target)
}
