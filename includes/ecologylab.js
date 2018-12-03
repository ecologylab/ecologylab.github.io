    function toggleNav()
    {
        var nav     =document.getElementById("navigation_container");
        var navStyle=nav.style;
        if (navStyle.visibility == "visible")
            navStyle.visibility = "hidden";
        else
            navStyle.visibility = "visible";
    }
