// JavaScript Copyright 1998 by Creating Media http://www.creatingmedia.com
// All rights reserved.
version	= navigator.appVersion + "";
browserV=parseInt(version);
doRolls = (version.indexOf("MSIE 3") == -1) && (browserV > 2);

function Hot(name, hrefNormal, hrefRoll, width, height)
{
   this.name = name;
   this.width= width;
   this.height = height;
   this.normal = setImage(hrefNormal, width,height);
   this.roll   = setImage(hrefRoll, width,height);
}
function setImage(src, w, h)
{
   if (doRolls)
   {
      img	= new Image(w, h);
      img.src	= src;
   }
   else
      img	= null;
   return img;
}
function flipImage(that, fromButton, toImage)
{
   if (doRolls && toImage.complete)
   {
      that.document.images[fromButton.name].src	= toImage.src;
   }
   return true;
}
