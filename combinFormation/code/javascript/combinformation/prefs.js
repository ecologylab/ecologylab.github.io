var autoPrefs	= new Array();
var autoPrefs	= new Array();
var autoPrefTypes = new Array();
var otherPrefs	= new Array();

autoPrefs.desc			 = "Auto";
otherPrefs.desc			 = "Other";

var autoPrefsChanged = new Array();
var otherPrefsChanged = new Array();

var autoPrefsCookie = new Cookie(document,"Auto_Preferences",240,"/");
var otherPrefsCookie = new Cookie(document,"Other_Preferences",240,"/");

var INT				= "int";
autoPrefs.screen_size		= 2;
autoPrefs.doesnada		= 1;
autoPrefTypes.screen_size	= INT;
autoPrefTypes.topwidth		= INT;
autoPrefTypes.topheight		= INT;

otherPrefs.pdf_parsing = "multivalent";

var prefMetadata	= new Array();

prefMetadata.screen_size		= 
   [
    new LabelValue("quarter&nbsp;screen", 1),
    new LabelValue("almost&nbsp;half", 2),
    new LabelValue("near&nbsp;full", 3),
    new LabelValue("full&nbsp;screen", 4),
    new LabelValue("enter&nbsp;size", 0)];

	prefMetadata.doesnada		= 
   [
    new LabelValue("quarter&nbsp;screen", 1),
    new LabelValue("almost&nbsp;half", 2),
    new LabelValue("near&nbsp;full", 3),
    new LabelValue("full&nbsp;screen", 4),
    new LabelValue("enter&nbsp;size", 0)];

autoPrefsCookie.loadCookie(autoPrefs);
otherPrefsCookie.loadCookie(autoPrefs);
if (otherPrefs['pdf_parsing'] != "multivalent_and_pdfbox")
	prefMetadata.pdf_parsing =
		[new LabelValue("Traditional", "multivalent"),
	 	new LabelValue("Better (Increases download by 1 MB)", "multivalent_and_pdfbox")];
	 
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

/**
 * code to generate html elements for preferences
 */
function generatePrefSelect(parentElement, name, prefs, whichPrefSet, hook)
{
   var prefMetadatum	= prefMetadata[name];
   if (!hook)
      hook	= "";
   var result   = document.createElement("select");
   result.name  = name;
   result.id	= name;
//   result.onchange = function(){  alert(whichPrefSet+" "+this.name+" "+this.value);};
   result.onchange = function(){  setPref(whichPrefSet, this.name, this.value); hook(this.value)};

   var value	= prefs[name];
//   alert(name+": "+value);
   
   for (var i=0; i<prefMetadatum.length; i++)
   {
      var thisPref	= prefMetadatum[i];

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
   return '<td>' + generatePrefRadiosNoTd(name, prefs, prefsName) + '</td>\n';
}
function generatePrefRadiosNoTd(name, prefs, prefsName)
{
   var prefMetadatum	= prefMetadata[name];
   var result	= "";
   var value	= prefs[name];
	
   for (var i=0; i<prefMetadatum.length; i++)
   {
      var thisPref	= prefMetadatum[i];
	  var thisValue= thisPref.value;
	  if ("string" == typeof thisValue)
		 thisValue  = "'" + thisValue + "'";
	  
      var checked = (value == thisPref.value) ? " checked" : "";
//      alert(checked +" "+thisPref.value);
      result+= '<input' + attrVal('type',"radio") + attrVal('name',name) +
	 ' onClick="setPrefOld(' + prefsName + ", '" + name + "', " + 
	   thisValue + ')" ' + 
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

function pdfRadios()
{
	return generatePrefRadiosNoTd("pdf_parsing", otherPrefs, "otherPrefs");
}


