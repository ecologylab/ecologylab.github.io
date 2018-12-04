function toggleNav()
{
  var nav     =document.getElementById("navigation_container");
  var navStyle=nav.style;
  if (navStyle.visibility == "visible")
      navStyle.visibility = "hidden";
  else
      navStyle.visibility = "visible";
}
function handleKey(e)
{
  
}
function offNav()
{
  var thatStyleName = that.style.className;
  alert(thatStyleName);
  if (thatStyleName) {
      var nav     =document.getElementById("navigation_container");
      var navStyle=nav.style;
      navStyle.visibility = "hidden";      
    }

}
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName == "Escape")
    {
      var nav     =document.getElementById("navigation_container");
      var navStyle=nav.style;
      navStyle.visibility = "hidden";      
    }
 // alert('keydown event\n\n' + 'key: ' + keyName);
});