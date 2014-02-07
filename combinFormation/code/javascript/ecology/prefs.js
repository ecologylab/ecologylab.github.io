var autoPrefs	= new Array();
var otherPrefs	= new Array();

var programmerPrefs = new Array();

var port	= location.port;

if (!port || (port == ""))
    port = "";
else
    port = ":" + port;

otherPrefs.startURL = location.protocol + "//" + location.hostname + port;

autoPrefs.desc			 = "Auto";
otherPrefs.desc			 = "Other";
programmerPrefs.desc		 = "Programmer";

otherPrefs.codebase		= "code/java";
autoPrefs.codeBaseAppend	= "cf/";
var base = (rootDir.indexOf("http://") == -1) ? rel(rootDir) :rootDir;
autoPrefs.code_base	= otherPrefs.startURL + base + otherPrefs.codebase + "/" + autoPrefs.codeBaseAppend;
//alert("autoPrefs.codebase="+autoPrefs.codebase+" "+location.hostname+" "+location.protocol);
otherPrefs.cfArchive		= "cf/cF.jar";
otherPrefs.ecologylabArchives	= "cf/ecologylabInteractive.jar, cf/ecologylabFundamental.jar";
otherPrefs.more_archives	= "cf/all-pdf.jar";
otherPrefs.cfArchiveSet		= otherPrefs.cfArchive+", "
			   + otherPrefs.more_archives+", "
			   + otherPrefs.ecologylabArchives;

autoPrefs.spatial_grid		= 1;

autoPrefs.incontext_slider	= 0;
autoPrefs.use_dashboard		= 0;

otherPrefs.stroking		= 1;
otherPrefs.splineStroking	= 1;
otherPrefs.textImageRatio	= 0.25;
otherPrefs.abstracted		= 1;
otherPrefs.has_visited_support	= 0;

autoPrefs.graphics_device	= 1;
autoPrefs.limit_traversal	= 1;
autoPrefs.crawl			= 1;
autoPrefs.download_images_automatically= "true";
autoPrefs.study_format		= 0;
autoPrefs.html_output_format	= 0;
autoPrefs.html_highlight_onRollover = "true";
autoPrefs.html_metadata_onRollover = "true";
autoPrefs.play_on_start		= 1;
autoPrefs.popupcolor		= "cccccc";

//autoPrefs.useAssetsCache	= true

autoPrefs.images_only		= 0;
autoPrefs.draw_grid		= 0;
autoPrefs.screen_size		= 2;
autoPrefs.pulse_timeout		= 50000;
autoPrefs.dead_width		= 51;
autoPrefs.dead_height		= 58; 
autoPrefs.debug_global_level	= 0;
//autoPrefs.debug_levels = "CollageLog 1";
autoPrefs.unstuck_debugger	= false;

autoPrefs.sleep_min		= 100;
autoPrefs.sleep_max		= 10000;
autoPrefs.sleep			= 900;
autoPrefs.recursion_sleep	= 10000;
autoPrefs.go_prefix	= "/ecology/combinFormation/popup.html?location=";
autoPrefs.single_step		= 0;
autoPrefs.browserV		= browserV; 
autoPrefs.pcormac		= (mac || !v4);
autoPrefs.mac			= mac;
autoPrefs.userinterface	= "in_context_interface";
//autoPrefs.userinterface	= "mistrot_interface";
autoPrefs.cool_space_in_center	= "true";
autoPrefs.coolSpaceRatio	= .2;

autoPrefs.elements_per_square_inch = .7;
autoPrefs.browser		= browser;
autoPrefs.os			= os;

autoPrefs.txt_img_weight_ratio = 25; // no idea
autoPrefs.min_opacity_txt = 88;
autoPrefs.min_opacity_img = 34.375;
autoPrefs.aging_txt = "true";
autoPrefs.fade_rate_txt_fg_bg = .75;
autoPrefs.aging_img = "true";
autoPrefs.blur_negative_interest = "false";
autoPrefs.undo_levels = 32;
autoPrefs.log_mode = 1;
autoPrefs.synth_google_query = 1;
autoPrefs.auto_expand_info_space = "true";
autoPrefs.show_dev_prefs = "true";
otherPrefs.javascript_debug_mode = "true";
autoPrefs.images_only = "false";
otherPrefs.abstracted = "true";

autoPrefs.rolloverVisualTools = "true";
autoPrefs.white_text_bg_for_user_elements = "false";

var autoPrefsChanged = new Array();
var otherPrefsChanged = new Array();
var programmerPrefsChanged = new Array();

var autoPrefsCookie = new Cookie(document,"Auto_Preferences",240,"/");
var otherPrefsCookie = new Cookie(document,"Other_Preferences",240,"/");
var programmerPrefsCookie = new Cookie(document,"Programmer_Preferences",240,"/");

var prefTypes	= new Array();


prefTypes.images_only		= 
   [new LabelValue("images", 1),
    new LabelValue("+&nbsp;text", 0)];

prefTypes.limit_traversal	=
   [new LabelValue('only&nbsp;crawl&nbsp;deeper&nbsp;into&nbsp;each&nbsp;site', 1), 
    new LabelValue('crawl&nbsp;anywhere', 0)];

prefTypes.abstracted		=	 
   [new LabelValue("as&nbsp;found&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",0),
    new LabelValue("abstracted", 1)];

prefTypes.screen_size		= 
   [
    new LabelValue("quarter&nbsp;screen", 1),
    new LabelValue("almost&nbsp;half", 2),
    new LabelValue("near&nbsp;full", 3),
    new LabelValue("full&nbsp;screen", 4),
    new LabelValue("enter&nbsp;size", 0)];


prefTypes.useDictionary =
	[new LabelValue("Use Dictionary",1),
	 new LabelValue("No term-based weighting",0)];
prefTypes.stroking =
	[new LabelValue("Text Stroking On",1),
	 new LabelValue("Text Stroking Off",0)];

prefTypes.splineStroking =
	[new LabelValue("Toolkit Text Stroking",0),
	 new LabelValue("Spline-based Stroking",1)];

	 
/**
 * Preference object that contains all info for display and interaction,
 * enabling seeing values and setting them.
 * 
 * HTML Label -- descrition of this preference for the user.
 * regular user -- developer ("grouping"?, "who")
 * Glossary Description
 * prefSet -- autoPrefs, otherPrefs
 * htmlType -- radio, text-field, select, check box
 * 
 * valuesInteraction -- for enumerated types, this is an array of LabelValues
 * 	      (corresponds to radio, select)
 * 	      for text fields, its a SinglveValuecs
 */
function Preference(name, htmlLabel, htmlType, whoSeesIt,
		    whichPrefSet, valuesInteraction, glossaryDesc)
{
   // (name is not here because its the key in the preferences array)
   this.name = name;
   this.htmlLabel		= htmlLabel;
   this.htmlType		= htmlType;
   this.whoSeesIt		= whoSeesIt;
   this.whichPrefSet		= whichPrefSet;
   this.valuesInteraction	= valuesInteraction;
   this.glossaryDesc		= glossaryDesc;
}
 
/**
 * A preference subentity: a displayed label, and an associated value.
 */
function LabelValue(label, value, newLineAfter)
{
   this.label	= label;
   this.value	= value;
   this.newLineAfter = newLineAfter; // a boolean
}

function SingleValue(unitsLabel, range, validator)
{
   this.unitsLabel	= unitsLabel;
   this.range		= range;   // an array of 2 values
   this.validator	= validator; // pointer to a validation function
   // validation function takes a String as arg, and returns boolean
   // it may popup messages
}

/**
 * whoSeesIt is one of these
 */
var GENERAL_USERS	= 0;
var DEVELOPERS		= 1;

/**
 * htmlType is one of these
 */
var TEXT_FIELD		= 0;
var TEXT_FIELD_LONG	= 1;
var RADIO		= 2;

/**
 * newLineAfter constants for 1) no break or space 2) just space 3) just break
 */
var NONE = 0;
var NBSP = 1;
var LINEBREAK = 2;

var preferences = new Array();

preferences.crawl = 
new Preference("crawl",
               "Download linked documents automatically (crawl)?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", 1, NBSP),
			  new LabelValue("N", 0, NONE)],
	             "At startup, do you want the information collecting agent to act as a web crawler, by periodically following hyperlinks to download more documents?");

preferences.download_images_automatically = 
new Preference("download_images_automatically",
               "Download images automatically?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "At startup, do you want the information collecting agent to download the images from the web pages it processes?");


preferences.userinterface = 							 
new Preference("userinterface",
               "Interactive Interface", 
			   RADIO, 
			   GENERAL_USERS, 
			   "autoPrefs", 
			   [new LabelValue("&nbsp;Interest&nbsp;+&nbsp;Design", "mistrot_interface", LINEBREAK), 
				new LabelValue("In-Context", "in_context_interface", LINEBREAK),
				new LabelValue("History&nbsp;Jog-Shuttle", "history_interface", LINEBREAK),
				new LabelValue("Reduced&nbsp;Interface", "reduced", LINEBREAK),
				//new LabelValue("Remote&nbsp;Interface", "remote", LINEBREAK),
			],
			   "Our standard interface enables interest expression and design operations to be selected independently. History Jog-Shuttle adds going back in time (requires 400Mb free disk space, a modern CPU, and 512M RAM).");							 
preferences.cool_space_in_center = 
new Preference("cool_space_in_center",
               "Cool space in center?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "The cool space is the space that is exclusively yours for information collecting and composing. The hot space you share with the agent. Do you want the cool space in the center (default),  or at the peripherae?");

preferences.coolSpaceRatio =
new Preference("coolSpaceRatio",
               "Cool Space Ratio", 
	             TEXT_FIELD, 
			   GENERAL_USERS, 
			   "autoPrefs", 
			   new SingleValue("", [0,1]), 
			   "The hot space is the composition area that you share with the program. The cool space is exclusively yours  to work with.<br><br>This parameter defines the proportion of the whole information space that is dedicated as the cool space, at startup time.");


preferences.spatial_grid = 
new Preference("spatial_grid",
               "Composition agent automatically clusters related elements?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", 1, NBSP),
			  new LabelValue("N", 0, NONE)],
	             "Use the visual composition that automatically clusters related elements into piles. You may wish to move elements around, and sometimes, to re-cluster.");

preferences.incontext_slider = 
new Preference("incontext_slider",
               "Enable in-context slider?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", 1, NBSP),
			  new LabelValue("N", 0, NONE)],
	             "Use the in-context slider to enable fine-grained expression of interest in metadata fields and individual words.");

preferences.use_dashboard = 
new Preference("use_dashboard",
               "Enable the seeding dashboard?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", 1, NBSP),
			  new LabelValue("N", 0, NONE)],
	             "Use the seeding dashboard to dynamically filter searches and other seeds.");

/*
preferences.auto_expand_info_space = 							 
new Preference("auto_expand_info_space",
               "Automatically Expand Information Space(Y/N)", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
							  new LabelValue("N", false, NONE)],
	             "Determines whether the span of the informa.");							 
*/

preferences.html_highlight_onRollover = 
new Preference("html_highlight_onRollover",
               "Output HTML: Highlight on Rollover?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "When you output HTML, you may wish for users to see the activated link area highlighted when they roll the mouse over.");

preferences.white_text_bg_for_user_elements = 
new Preference("white_text_bg_for_user_elements",
               "Use white background for elements I create?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "When the user creates elements by editing text or drag and drop, use a white background.");

preferences.html_metadata_onRollover = 
new Preference("html_metadata_onRollover",
               "Output HTML: Show details on Rollover?", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "When you output HTML, you may wish for users to see details about the activated link area (metadata) when they roll the mouse over.");

preferences.synth_google_query = 
new Preference("synth_google_query",
               "Search Query Scope", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("to entire Web", 1, LINEBREAK),
		      new LabelValue("only to same Website", 2, LINEBREAK)], 
	             "Determines how search queries will be issued inside the information space. Either they are issued to the entire web, or limited to the th website where the sample came from");
							 

preferences.rolloverVisualTools = 
new Preference("rolloverVisualTools",
               "Show Visual edit tools on Rollover (Y/N)", 
	             RADIO, 
				 GENERAL_USERS, 
				 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
			  new LabelValue("N", false, NONE)],
	             "The visual editing tools (transparency for images; and stroke color, font face, and point size for Text) come up on Rollover if this preference is on");


preferences.elements_per_square_inch	=
new Preference("elements_per_square_inch",
               "Density: Visible elements per square inch [.1,20]", 
	             TEXT_FIELD, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             new SingleValue("", [.1,100]), 
	             "Controls how many elements will appear in the information space, relative to the area of the space. The default value is .5 elements per square inch.<br><br>This lets you decide how many total elements the program will place into the space. Doubling this number, will double the number of elements.");

preferences.undo_levels =
new Preference("undo_levels",
               "Undo Levels", 
	             TEXT_FIELD, 
							 DEVELOPERS, 
							 "autoPrefs", 
	             new SingleValue("", [16,1024]), 
	             "The number of steps backwards you can go, by using undo, or the reverse button.");


							 
preferences.log_mode = 							 
new Preference("log_mode",
               "Log Mode", 
			   RADIO, 
			   DEVELOPERS, 
			   "autoPrefs", 
			   [new LabelValue("no logging", 0, LINEBREAK),
				new LabelValue("log to desktop file", 1, LINEBREAK),
				new LabelValue("log to logging server", 2, NONE)], 
			   "Controls whether or not logging of actions to a file by you and the program is performed during each session. The default is log to Desktop. With this option, you will have trace information available to help us, in case a bug is discovered.");

preferences.archive = 							 
new Preference("archive",
               "combinFormation Version", 
			   RADIO, 
			   DEVELOPERS, 
			   "otherPrefs", 
			   [new LabelValue("Default", "cF.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 3", "cF2.0Alpha3.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 2", "cF2.0Alpha2.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 1", "cF2.0Alpha1.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 2", "cF1.99Beta2.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 1", "cF1.99Beta1.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 1u", "cF1.99Beta1u.jar", LINEBREAK),
				new LabelValue("Version 1.99 Alpha 2", "cF1.99Alpha2.jar", LINEBREAK),
				new LabelValue("Version 1.99 Alpha 1", "cF1.99Alpha1.jar", NONE)
				],
	             "This determines which version of combinFormation you get. Unless you are sure you want a different version, please accept the default, which is our latest stable relase.");							 

preferences.ecologylabArchive = 							 
new Preference("ecologylabArchive",
               "Ecologylab Version", 
			   RADIO, 
			   DEVELOPERS, 
			   "otherPrefs", 
			   [new LabelValue("Default", "ecologylab.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 3", "ecologylab2.0Alpha3.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 2", "ecologylab2.0Alpha2.jar", LINEBREAK),
				new LabelValue("Version 2.0 Alpha 1", "ecologylab2.0Alpha1.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 2", "ecologylab1.99Beta2.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 1", "ecologylab1.99Beta1.jar", LINEBREAK),
				new LabelValue("Version 1.99 Beta 1u", "ecologylab1.99Beta1u.jar", LINEBREAK),
				new LabelValue("Version 1.99 Alpha 1", "ecologylab1.99Alpha1.jar", NONE)
				],
	             "This determines which version of the Ecologylab Libraries you get. Unless you are sure you want a different version, please accept the default, which is our latest stable relase.");							 

preferences.min_opacity_txt	=
new Preference("min_opacity_txt",
               "Minimum Text Opacity Level [0-255]", 
	             TEXT_FIELD, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             new SingleValue("", [0,255]), 
	             "In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout. The lowest numbers mean the most faded.In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout. The lowest numbers mean the most faded.In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout. The lowest numbers mean the most faded.In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout. The lowest numbers mean the most faded.");

preferences.min_opacity_img =
new Preference("min_opacity_img",
               "Minimum Image Opacity Level", 
	             TEXT_FIELD, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             new SingleValue("", [0,255]), 
	             "image glossary help text. In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout.");

preferences.fade_rate_txt_fg_bg =
new Preference("fade_rate_txt_fg_bg",
               "Fade Rate for Text Versus Background Color [0-1]", 
	             TEXT_FIELD, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             new SingleValue("", [0,1]), 
	             "FADE RATE FOR TEXT VERSUS BACKGROUND COLOR In order to help make lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout.");

							 
preferences.aging_txt = 							 
new Preference("aging_txt",
               "Visual Aging of Text (Y/N)", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
							  new LabelValue("N", false, NONE)],
	             "AGING images; e lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout.");

preferences.aging_img = 							 
new Preference("aging_img",
               "Visual Aging of Images (Y/N)", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("Y", true, NBSP),
							  new LabelValue("N", false, NONE)],
	             "AGING TEXT e lots of text readable on the screen at once, the program fades it out gradually. This preference defines the most extreme fadeout.");

preferences.blur_negative_interest = 							 
new Preference("blur_negative_interest",
               "Blur Image Elements To Indicate Negative Interest (Y/N)", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("Y", false, NBSP),
							  new LabelValue("N", false, NONE)],
	             "By default, when the the program understands that your interest in an information element is negative, and the element is an image, it will display that element with blur in proportion to the intensity of your dislike. This can be turned off.<br><br> In future versions of the program, you will also be able to turn this off on single elements, by right-clicking a selected element inside your information space, and selecting a menu option.");

preferences.javascript_debug_mode = 							 
new Preference("javascript_debug_mode",
               "Javascript Debug Mode(Y/N)", 
	             RADIO, 
							 DEVELOPERS, 
							 "otherPrefs", 
	             [new LabelValue("Y", true, NBSP),
							  new LabelValue("N", false, NONE)],
	             "Shows or hides extra buttons that can be used for debugging the javascript. Allows direct access to cookies & arrays");
							 
preferences.codebase =
new Preference("codebase",
               "Jar File Directory", 
	             TEXT_FIELD_LONG, 
							 DEVELOPERS, 
							 "otherPrefs", 
	             new SingleValue("", null), 
	             "Directory for the project a developer is working on.");


preferences.images_only = 							 
new Preference("images_only",
               "Include Text Elements", 
	             RADIO, 
							 GENERAL_USERS, 
							 "autoPrefs", 
	             [new LabelValue("Images Only", true, LINEBREAK),
							  new LabelValue("Images + Text", false, NONE)],
	             "Determines whether or not text elements will be displayed.");

preferences.abstracted = 							 
new Preference("abstracted",
               "Image Element Abstraction", 
	             RADIO, 
							 GENERAL_USERS, 
							 "otherPrefs", 
	             [new LabelValue("Abstract Images Sometimes", true, LINEBREAK),
							  new LabelValue("Always Leave Images as Found", false, NONE)],
	             "If true, images may be displayed at very large sizes. Also, pixelation of images (which causes them to look blotchy and out of focus) will happen sometimes.");
							 
// input protection
// - needs to be added
//   
 
// sets value of pref to respective array as well as necessary array to 
//   save cookies; stores cookies;
//   * if value is blank or null, then the name,value pair is deleted from array
//     and cookie. page then reloaded to show default value
//   usage: setPref(<prefSet>, '<prefName>', <formElement.value>);
//   ex: setPref(autoPrefs, 'undo_levels', this.value);
function setPref(prefs, prefName, value)
{
//   alert("setpref("+prefs+"): " + prefName + " = " + value);
//   var prefSet = (prefs == "autoPrefs") ? autoPrefs : otherPrefs;
//   prefSet[prefName] = value;
   var valueStr = (typeof value == "string") ? "'"+value+"'" : value;
	  
   eval(prefs +"."+prefName +"="+valueStr); // set it
//   alert(prefs +"."+prefName +"="+valueStr);
   var desc		= eval(prefs +".desc");	   // get the desc

    // if value is cleared or not present, delete entry from array and cookie
    //   reloads page to display default values
    if ((value == "") || (value == null)) {
         if (desc == "Auto") {
      	     delete autoPrefsChanged[prefName];
         }
         else if (desc == "Other") {
      	     delete otherPrefsChanged[prefName];
         }
         else if (desc == "Programmer") {
      	     delete programmerPrefsChanged[prefName];
         }
    	 location.reload();
    }
    // if value is present, assign it to array to save to cookie
    else {
      	if (desc == "Auto") {
      	    autoPrefsChanged[prefName] = value;
        }
        else if (desc == "Other") {
      	    otherPrefsChanged[prefName] = value;
        }
        else if (desc == "Programmer") {
      	    programmerPrefsChanged[prefName] = value;
        }
    }
    storeAllCookies();
    if (prefName == "javascript_debug_mode") {
    	location.reload();
      
    }
}

function setPrefOld(prefs, prefName, value)
{
   prefs[prefName]	= value;
   	
   //alert("setting " + prefs + "["+prefName+"]	= " + value); 
   //alert("Storing changed cookie");

   // storeAllCookies();	
  

  if (prefs.desc == "Auto")
  {
	autoPrefsChanged[prefName] = value;
  }
  
  else if (prefs.desc == "Other")
  {
	otherPrefsChanged[prefName] = value;
  }

  else if (prefs.desc == "Programmer")
  {
	programmerPrefsChanged[prefName] = value;
  }
  storeAllCookies();	  
}

// debug function to display all the preferences and values in a given pref set
//  *need to add feature to clear itself before loading more info (if window was not previously closed)
function displayForEach(obj) {
    var tmpstring = "<font style='font-size: 7.5pt; font-family: Verdana, Arial, Helvetica, sans-serif; '><b>" + toString(obj) + " : </b><br /><br />";
    for (thing in obj) {
		    tmpstring += " <b>" + thing + "</b> : " + obj[thing] + " <br />";
		}
		tmpstring += "</font>";
		
		new_window = open("","displayWindow","width=600,height=700,left=50,top=50,scrollbars=1,resizable=1");
		//new_window.document.location = "about:blank";
		new_window.document.close();
		new_window.document.open();
		new_window.document.write(tmpstring);
		new_window.focus();
}


// function toggles the table that shows dev preferences
function toggleDevPref() {
    devTable = document.getElementById("developerPrefsTable");
		if (devTable.style.display == "none"){
        devTable.style.display = "block";
				setPref("autoPrefs", "show_dev_prefs", "true");
		}
		else {
		    devTable.style.display = "none";
				setPref("autoPrefs", "show_dev_prefs", "false");
		}
}


// clears cookies, loads the default values into form.
function defaultPrefs() {
    removeAutoCookie();
		removeOtherCookie();
		location.reload();
}

// debug func to display all cookies and values within
function showCookies()
{
   var cookieJar	= doubleSplit(document.cookie, ";");
   var cookiesTable	= '<table cellpadding="9">\n';
   for (thatName in cookieJar)
   {
      cookiesTable     += "<tr><td><nobr>" + thatName + "</nobr></td><td>" + 
	    cookieJar[thatName] +"</td></tr>\n";
   }
   cookiesTable	       += "\n</table>"
	 new_window = open("","displayWindow","width=600,height=700,left=50,top=50,scrollbars=1,resizable=1");
	 new_window.document.close();
	 new_window.document.open();
	 new_window.document.write(cookiesTable);
	 new_window.focus();
}

// creates all the html elements needed by the prefs system using values from the preferences objects
function createPrefs(){
    for (obj in preferences) {
		    objPref = preferences[obj];
		
        // checks to see which table it needs to be appended to
        if (objPref.whoSeesIt == GENERAL_USERS)
            tmpTable = document.getElementById("generalPrefsTableBody");
    		else
    		    tmpTable = document.getElementById("developerPrefsTableBody");
    		
    		// creates new elements to be used in table 		
    		var newRow = document.createElement("TR");
    		var newCell1 = document.createElement("TD");
    		var newCell2 = document.createElement("TD");
    		var newCell3 = document.createElement("TD");
    		
    		// *** filling in the cells with appropriate content
    		
    		// newCell1
    		// determines what type of input element is needed and creates it
			var htmlType = objPref.htmlType;
			var prefSetName	= objPref.whichPrefSet;
			if ((htmlType == TEXT_FIELD) || (htmlType == TEXT_FIELD_LONG))
			{
    		    var newInput = document.createElement("input");
    		    newInput.type = "text";
    		    newInput.size = (htmlType == TEXT_FIELD) ? 5 : 30;
				var fieldName = objPref.name;
				newInput.name = fieldName;
				newInput.value = eval(prefSetName +"."+fieldName);
//				alert(fieldName +"="+newInput.value+" :"+prefSetName);
				newInput.whichPrefSet = prefSetName;
						
				newInput.onchange = function(){ setPref(this.whichPrefSet, this.name, this.value) };
				newCell1.appendChild(newInput);
    		}
			else if (objPref.htmlType == RADIO) {
			   // this will use enumerated values, so we have to do a loop and for each, we will need to create a pair of input & label from the labelvalue data structure
			   for (var k=0; k < objPref.valuesInteraction.length; k++) {
				  // create & add label
				  var newLabel = document.createElement("span");
				  newLabel.innerHTML = objPref.valuesInteraction[k].label;
				  newCell1.appendChild(newLabel);
				  
				  // create & add corresponding radio
				  // handle diff versions (each browser demands a different method of creating radio buttons to work)
				  if (gecko) {
					 var newInput = document.createElement("input");
					 newInput.name = objPref.name;
				  }
				  else if (ie)
				  {
					 var newInput = document.createElement("<input name='" + objPref.name + "'>");
				  }
				  
				  newInput.type = "radio";
				  newInput.className = "checkbox";
				  newInput.value = objPref.valuesInteraction[k].value;
				  // assign this here to avoid javascript late binding problem
				  newInput.whichPrefSet = prefSetName;
				  newInput.onchange = function(){  setPref(this.whichPrefSet, this.name, this.value);};
//				  alert("radio " + objPref.name +" " + prefSetName+" "+newInput.onchange);
				  newCell1.appendChild(newInput);
				  
				  // checks to see if a new line was specified
				  if (objPref.valuesInteraction[k].newLineAfter == LINEBREAK) {
					 var newBreak = document.createElement("br");
					 newCell1.appendChild(newBreak);
				  }
				  else if (objPref.valuesInteraction[k].newLineAfter == NBSP){
					 var newNBSP = document.createElement("span");
					 newNBSP.innerHTML = "&nbsp;&nbsp;";
					 newCell1.appendChild(newNBSP);
				  }
				  
			   }
			}
    		
    		newCell1.className = "pref_input";
    			
    		// newCell2
				if (objPref.valuesInteraction.unitsLabel) 
    		    newCell2.innerHTML = objPref.valuesInteraction.unitsLabel;
    		newCell2.className = "pref_units";
    		
    		// newCell3s
				newCell3.innerHTML = objPref.htmlLabel + "&nbsp;";
    		var newGlossaryLink = document.createElement("A");
    		newGlossaryLink.href = "javascript:showGlossary('<b>" + objPref.htmlLabel + " :</b> " + objPref.glossaryDesc + "');";
    		newGlossaryLink.innerHTML = "<img src='images/glossaryButton.gif' height='15' width='15' alt='For More Information...' style='margin: 0px; padding: 0px; vertical-align: top;'>";
    		newGlossaryLink.className = "glossaryLink";
    		newCell3.appendChild(newGlossaryLink);
    		newCell3.className = "pref_label";
    		
        // appends the diff parts of new row together
    		tmpTable.appendChild(newRow);
    		    newRow.appendChild(newCell1);
    				newRow.appendChild(newCell2);
    		    newRow.appendChild(newCell3);
		}
		// now that html elements have been created, populate them with the correct values
		loadFormWith(autoPrefs);
		loadFormWith(otherPrefs);
}

function showGlossary(glossaryDesc) {
    var glossary = document.getElementById("glossaryBody");
		glossary.innerHTML = glossaryDesc;
	  glossary.parentNode.style.display = "block";
}

// loads current form with specified prefSet by matching up with form element names
function loadFormWith(prefSet) {
    // loops thru all preferences
    for (pref in prefSet) {
  	    var formElement = document.getElementsByName(pref);
				// if a form element by the same name exists
				if (formElement[0]) {
				    // checks for diff types of form elements to decide how to assign the value
						if (formElement[0].type == "text") {
				        formElement[0].value = prefSet[pref];
						}
						if (formElement[0].type == "select-one") {
						    formElement[0].selectedIndex = prefSet[pref];
						}
						if (formElement[0].type == "checkbox") {
						    formElement[0].checked = evalBool(prefSet[pref]);
						}
						if (formElement[0].type == "radio") {
						    for (var k=0; k<formElement.length; k++){
								    // tests each radio button to see if the value of that radio matches value of the preference
								    if (formElement[k].value == prefSet[pref])
										    formElement[k].checked = true;
								}
						}
				}
				// special cases like the dev pref table
				if (pref == "show_dev_prefs") {
				    document.getElementById("developerPrefsTable").style.display = evalBool(autoPrefs[pref])?"block":"none";
				}
				if (pref == "javascript_debug_mode") {
				    document.getElementById("javascriptDebugButtons").style.display = evalBool(prefSet[pref])?"inline":"none";
				}
  	}
}

// hack for problem of bool values turning into strings when passed
function evalBool(str) {
    if (str == "true")
  	    return true
  	else
  	    return false;
}

	 
/**
 * cookie functions
 */

function storeAllCookies()
{
	storeAutoCookie();
	storeOtherCookie();
	storeProgrammerCookie();
}

function removeAutoCookie() {
    autoPrefsCookie.remove();
		autoPrefsCookie.storeCookie(autoPrefs);
}

function removeOtherCookie() {
    otherPrefsCookie.remove();
		otherPrefsCookie.storeCookie(otherPrefs);
}

function storeAutoCookie()
{
	//autoPrefsCookie.storeCookie(autoPrefs);	
	autoPrefsCookie.storeCookie(autoPrefsChanged);
}

function storeOtherCookie()
{
//	otherPrefsCookie.storeCookie(otherPrefs);
	otherPrefsCookie.storeCookie(otherPrefsChanged);

}

function storeProgrammerCookie()
{
	//programmerPrefsCookie.storeCookie(programmerPrefs);
	programmerPrefsCookie.storeCookie(programmerPrefsChanged);
}

function copyArray(array1, array2)
{
	for(currentElement in array1)
	{
		//alert('copying ' + array1[currentElement] + ' into ' + currentElement + ' of array2');
		array2[currentElement] = array1[currentElement];	
	}
} 

if (!autoPrefsCookie.loadCookie(autoPrefsChanged))
{
	//alert("Auto Prefs Cookie does not exist - now storing it");
	//autoPrefsCookie.storeCookie(autoPrefs);
	//autoPrefsCookie.storeCookie(autoPrefsChanged);
}
else
{
	copyArray(autoPrefsChanged,autoPrefs);	
}

if (!otherPrefsCookie.loadCookie(otherPrefsChanged))
{
	//alert("Other Prefs Cookie does not exist - now storing it");
	//otherPrefsCookie.storeCookie(otherPrefs);
	//otherPrefsCookie.storeCookie(otherPrefsChanged);	
}
else
{
	copyArray(otherPrefsChanged,otherPrefs);
}

if (!programmerPrefsCookie.loadCookie(programmerPrefsChanged))
{
	//programmerPrefsCookie.storeCookie(programmerPrefs);
	//programmerPrefsCookie.storeCookie(programmerPrefsChanged);
}
else
{
	copyArray(programmerPrefsChanged,programmerPrefs);
}


/**
 * code to generate html elements for preferences
 */
function generatePrefSelect(parentElement, name, prefs, whichPrefSet, hook)
{
   var prefType	= prefTypes[name];
   if (!hook)
      hook	= "";
   var result   = document.createElement("select");
   result.name  = name;
   result.id	= name;
//   result.onchange = function(){  alert(whichPrefSet+" "+this.name+" "+this.value);};
   result.onchange = function(){  setPref(whichPrefSet, this.name, this.value); hook(this.value)};
//   result.onchange = function() { setPrefOld(prefsName, name, prefTypes[name][this.selectedIndex].value); };

   var value	= prefs[name];
//   alert(name+": "+value);
   
   for (var i=0; i<prefType.length; i++)
   {
      var thisPref	= prefType[i];

      var option = document.createElement("option");
      option.value = thisPref.value;
      if (thisPref.value == value)
	 option.selected = true;

      option.innerHTML = thisPref.label;
      result.appendChild(option);
   }
   parentElement.appendChild(result);				  
   return result;
}
function generatePrefSelectOld(name, prefs, prefsName, hook)
{
   var prefType	= prefTypes[name];
   if (!hook)
      hook	= "";
   var result	= '<select onChange="setPrefOld(' +prefsName+", '"+name+
      "', prefTypes."+name+
      '[this.selectedIndex].value);'+ hook + '">\n';
   var value	= prefs[name];
//   alert(name+"="+value);
   for (var i=0; i<prefType.length; i++)
   {
      var thisPref	= prefType[i];
      var checked = (value == thisPref.value) ? " selected" : "";
//      alert(checked +" "+thisPref.label +" " +thisPref.value);
      result+= '<option' + attrVal('value',thisPref.value) + 
	 checked + ">" +
	 thisPref.label+'</option>\n';
   }
   result	= result + "</select>\n";
   alert(result);
   return result;
}

function generateCheck(text, varName, checkd, kind, name, not)
{
   checkd = checkd ? " checked" : "";
   kind	= kind ? kind : "checkbox";
   not = not ? "!" : "";
   name = name ? attrVal("name", name) : "";
   return '<input ' + attrVal('type',kind) + name +
      ' onClick="' + varName +
      '=' + not + 'this.checked"' + checkd + '>&nbsp;' + text;
}

function generatePrefRadios(name, prefs, prefsName)
{
/*   var prefType	= prefTypes[name];
   var result	= "";
   var value	= prefs[name];
//   alert(name+"="+value);
   for (var i=0; i<prefType.length; i++)
   {
      var thisPref	= prefType[i];
      var checked = (value == thisPref.value) ? " checked" : "";
//      alert(checked +" "+thisPref.value);
      result+= '<td><input' + attrVal('type',"radio") + attrVal('name',name) +
	 ' onClick="setPrefOld(' + prefsName + ", '" + name + "', " + 
	 thisPref.value + ')" ' + 
	 checked + '>&nbsp;' + thisPref.label+'</td>\n';
   }
//   alert(result);
   return result;
*/
   return '<td>' + generatePrefRadiosNoTd(name, prefs, prefsName) + '</td>\n';
}

function generatePrefRadiosNoTd(name, prefs, prefsName)
{
   var prefType	= prefTypes[name];
   var result	= "";
   var value	= prefs[name];
//   alert(name+"="+value);
   for (var i=0; i<prefType.length; i++)
   {
      var thisPref	= prefType[i];
      var checked = (value == thisPref.value) ? " checked" : "";
//      alert(checked +" "+thisPref.value);
      result+= '<input' + attrVal('type',"radio") + attrVal('name',name) +
	 ' onClick="setPrefOld(' + prefsName + ", '" + name + "', " + 
	 thisPref.value + ')" ' + 
	 checked + '>&nbsp;' + thisPref.label;
   }
//   alert(result);
   return result;
}

function generatePrefRadiosRow(insert, name, prefs, prefsName)
{
   return "<tr>\n" + insert +
      generatePrefRadios(name, prefs, prefsName) + "</tr>\n";
}

function collageRadios(intro)
{
   var nbspCell = (intro == "") ? "" : td("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
   if (!intro)
      intro		= nbspCell;
   else
      intro		= '<tr><td colspan="4">' + intro + '</td></tr>\n';
   
   var result = table(0,1) + "\n" + intro +
//      generatePrefRadiosRow(nbspcell, "images_only", autoPrefs, "autoPrefs")+
//      generatePrefRadiosRow(nbspCell, "abstracted", otherPrefs, "otherPrefs")+
      generatePrefRadiosRow(nbspCell,"limit_traversal", autoPrefs,"autoPrefs")+
   "</table>";
//   alert(result);
   return result;
}
function justCollageRadios()
{
   return generatePrefRadiosNoTd("limit_traversal", autoPrefs,"autoPrefs");
}
function createProgrammerOptions(intro)
{
      var nbspCell = (intro == "") ? "" : td("&nbsp;");
      if (!intro)
         intro		= nbspCell;
      else
         intro		= td(intro);
   
      var result = table(0,1) + "\n" +
      	 generatePrefRadiosRow(intro, "jarfile", programmerPrefs, "programmerPrefs")+
      	 generatePrefRadiosRow(nbspCell, "stroking", otherPrefs, "otherPrefs")+
	 generatePrefRadiosRow(nbspCell,"splineStroking", otherPrefs, "otherPrefs")+
	 generatePrefRadiosRow(nbspCell,"useDictionary", programmerPrefs, "programmerPrefs")+
      	"</table>";
	 //   alert(result);
       
      return result;
}

function createUserOptions(intro)
{
      var nbspCell = (intro == "") ? "" : td("&nbsp;");
      if (!intro)
         intro		= nbspCell;
      else
         intro		= td(intro);
   
      var result = table(0,1) + "\n" +
	 generatePrefRadiosRow(intro, "images_only", autoPrefs, "autoPrefs")+
      	 generatePrefRadiosRow(nbspCell, "abstracted", otherPrefs, "otherPrefs")+
     	 generatePrefRadiosRow(nbspCell,"limit_traversal", autoPrefs,"autoPrefs")+
      	 generatePrefRadiosRow(nbspCell, "stroking", otherPrefs, "otherPrefs")+
	 generatePrefRadiosRow(nbspCell, "splineStroking", otherPrefs, "otherPrefs")+
	"</table>";
	 //   alert(result);
       
      return result;
}

