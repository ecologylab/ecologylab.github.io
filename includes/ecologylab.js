function toggleNav(event)
{
  var nav     =document.getElementById("navigation_container");
  var navStyle=nav.style;
  if (navStyle.visibility == "visible")
      navStyle.visibility = "hidden";
  else
      navStyle.visibility = "visible";
  
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
    if (event.target != nav && event.target.parentNode != nav
        && event.target != triple && event.target.parentNode != triple
       )
    {
      nav.style.visibility = "hidden";
      event.stopPropagation;
    }
  };
}

window.addEventListener('click', offNonTriple(event));
window.addEventListener('touchstart', offNonTriple(event));
