/**
 * duplicate definition to mimic style sheet for ns3.
 */

textSize	= 10;
if (top.mac || top.sgi)
    textSize+=3;

document.tags.body.fontSize	= (textSize - 1) + "pt";
document.tags.body.fontFamily	= top.textStyle;
document.tags.body.fontWeight	= 650;

document.tags.td.fontSize	= document.tags.body.fontSize;
document.tags.td.fontFamily	= document.tags.body.fontFamily;
document.tags.td.fontWeight	= document.tags.body.fontWeight;

document.classes.normal.all.fontSize	= document.tags.body.fontSize;
document.classes.normal.all.fontFamily	= document.tags.body.fontFamily;
document.classes.normal.all.fontWeight	= document.tags.body.fontWeight;

document.classes.popular.all.fontSize	= (textSize - 2) + "pt";
document.classes.popular.all.fontFamily	= document.tags.body.fontFamily;
document.classes.popular.all.fontWeight	= document.tags.body.fontWeight;
document.classes.popular.all.lineHeight = (textSize + 1) + "pt";;
document.classes.popular.all.margins(0, "3pt", "3pt", "3pt"); 
document.classes.popular.all.color	= "ffffff";

document.classes.feature.all.fontSize	= (textSize - 2) + "pt";
document.classes.feature.all.fontFamily	= document.tags.body.fontFamily;
document.classes.feature.all.fontWeight	= document.tags.body.fontWeight;
document.classes.feature.all.margins("5pt", "5pt", "5pt", "5pt"); 

document.classes.category.all.letterSpacing = "12px";
document.classes.category.all.fontSize = document.tags.body.fontSize;

document.classes.blend.all.fontSize = document.tags.body.fontSize;
document.classes.blend.all.lineHeight = (textSize + 4) + "pt";;

document.classes.nav.all.fontSize	= (textSize - 1) + "pt";
document.classes.nav.all.fontFamily	= document.tags.body.fontFamily;
document.classes.nav.all.fontWeight	= document.tags.body.fontWeight;

document.classes.larger.all.fontSize	= (textSize+1) + "pt";
document.classes.larger.all.fontFamily	= document.tags.body.fontFamily;
document.classes.larger.all.fontWeight	= document.tags.body.fontWeight;

document.classes.small.all.fontSize =  (textSize - 2) + "pt";
document.classes.small.all.fontFamily	= document.tags.body.fontFamily;
document.classes.small.all.fontWeight	= 300;

document.classes.copyright.all.fontSize	 =  (textSize - 3) + "pt";
document.classes.copyright.all.fontFamily= document.tags.body.fontFamily;
document.classes.copyright.all.fontWeight= 100;

document.classes.caption.all.fontSize	= (textSize - 2) + "pt";;
document.classes.caption.all.fontFamily	= "Courier New, Courier";
document.classes.caption.all.fontWeight	= 650;

document.classes.tiny.all.fontSize	=  (textSize - 4) + "pt";
document.classes.tiny.all.fontFamily	= document.tags.body.fontFamily;
document.classes.tiny.all.fontWeight	=  100;

document.tags.input.fontSize	= (textSize - 1) + "pt";
document.tags.input.fontFamily	= "";

document.tags.select.fontSize	= (textSize - 2) + "pt";
document.tags.select.fontFamily	= "";

document.classes.head.all.fontSize	= (textSize + 1) + "pt";
document.classes.head.all.fontFamily	= top.textStyle;
document.classes.head.all.fontWeight	= document.tags.body.fontWeight;

document.classes.larger.all.fontSize	= textSize + "pt";
document.classes.larger.all.fontFamily	= top.textStyle;
document.classes.larger.all.fontWeight	= document.tags.body.fontWeight;

document.classes.subhead.all.fontFamily = top.textStyle;
document.classes.subhead.all.fontSize	= textSize + "pt";
document.classes.subhead.all.fontWeight = "900";
document.classes.subhead.all.color	= "cc6600";

document.classes.slogan.all.fontSize	= (textSize - 2) + "pt";
document.classes.slogan.all.fontStyle	= "italic";
document.classes.slogan.all.fontWeight	= "700";
document.classes.slogan.all.color	= "336699";

