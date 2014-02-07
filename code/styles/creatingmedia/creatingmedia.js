/**
 * duplicate definition to mimic style sheet for ns3.
 */

textSize	= 10;
if (top.mac)
    textSize++;

document.tags.body.fontFamily	= top.textStyle;
document.tags.body.fontSize	 = textSize + "pt";
document.tags.td.fontFamily	= top.textStyle;
document.tags.td.fontSize	 = textSize + "pt";
document.tags.td.fontWeight	 = 650;

document.classes.normal.fontFamily	= top.textStyle;
document.classes.normal.fontSize	 = textSize + "pt";

document.classes.small.all.fontSize =  (textSize - 2) + "pt";

document.classes.caption.all.fontSize = document.classes.small.all.fontSize;
document.classes.caption.all.color  = "#996600";

document.classes.tiny.all.fontSize =  (textSize - 4) + "pt";
document.classes.tiny.all.fontWeight =  100;

document.tags.input.fontFamily	= "";
document.tags.input.fontSize	= (textSize - 1) + "pt";
// document.tags.input.fontSize	= 7 + "pt";
document.tags.select.fontFamily	= "";
document.tags.select.fontSize	= (textSize - 2) + "pt";
// document.tags.select.feedback.fontSize	= (textSize - 2) + "pt";
document.tags.select.fontWeight	 = 350;
// tags.textarea.color = "red";

document.classes.head.all.fontFamily = top.textStyle;
document.classes.head.all.fontSize = "11pt";

document.classes.subhead.all.fontFamily = top.textStyle;
document.classes.subhead.all.fontSize = "10pt";
document.classes.subhead.all.fontWeight = "900";
//document.classes.subhead.all.color = "0033aa";
document.classes.subhead.all.color = "cc6600";

// document.classes.hack.all.fontSize = "33pt";
document.classes.slogan.all.fontStyle	= "italic";
document.classes.slogan.all.fontSize	= "8pt";
document.classes.slogan.all.fontWeight	= "700";
document.classes.slogan.all.color		= "336699";

document.classes.tm.all.verticalAlign	= "super";
document.classes.tm.all.lineHeight	= .3;
document.classes.tm.all.fontSize	= "5pt";

document.classes.ibm.all.fontSize	= "9pt";
document.classes.ibm.all.fontWeight	= 700;
document.classes.ibm.all.color		= "330099";

document.classes.spread.all.lineHeight	= 1.15;
