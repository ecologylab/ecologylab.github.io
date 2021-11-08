var marginRightE = document.querySelector(":root").style;


function toggleNav(event)
{
  var nav     =document.getElementById("navigation_container");
  var navStyle=nav.style;
  if (navStyle.visibility == "visible")
      navStyle.visibility = "hidden";
  else
  {
    var emToPx = window.innerWidth /
  parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
  
    
    var body = document.querySelector("body");
    var bodyBounds    = body.getBoundingClientRect();
    var bodyWidth     = body.clientWidth; // bodyBounds.width;
    var rootcontainer = document.querySelector(".rootcontainer");
    var rootBounds = rootcontainer.getBoundingClientRect();
    var rootWidth     = rootcontainer.offsetWidth; // rootBounds.width;
    var extraWidth    = bodyWidth - rootWidth;
    var triple  = document.getElementById('triple');
    var navWidth      = nav.clientWidth; // nav.getBoundingClientRect().width;
    var maxOffset     = navWidth - triple.getBoundingClientRect().width;
    var offset        = (extraWidth <= 0) ? 0 : (extraWidth < maxOffset) ? extraWidth : maxOffset;
    offset            = -Math.floor(offset);
    navStyle.right    = offset + "px";
    navStyle.visibility = "visible";
  }
  
  event.stopPropagation;
}
function handleKey(e)
{
  
}
function offNav()
{
      var nav     =document.getElementById("navigation_container");
      var navStyle=nav.style;
      navStyle.visibility = "hidden";      
}
function handleClick(event)
{
  alert(event.target)
}
function popOutIFrame() 
{
	 var gDocIFrame = document.getElementById("google-doc-iframe");
	 window.open(gDocIFrame.src, '_blank');
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName == "Escape")
    {
      offNav();   
    }
 // alert('keydown event\n\n' + 'key: ' + keyName);
});

function offNonTriple(event) {
  return function(event){
    var nav     = document.getElementById('navigation_container');
    var triple  = document.getElementById('triple');
    var parent  = event.target.parentNode;
    if (event.target != nav && parent != nav
        && (parent != null && parent.parentNode != nav)
        && event.target != triple && parent != triple
       )
    {
      nav.style.visibility = "hidden";
      event.stopPropagation;
    }
  };
}

window.addEventListener('click', offNonTriple(event));
window.addEventListener('touchstart', offNonTriple(event));

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
