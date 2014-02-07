
// <script language="JavaScript1.1">

function Cookie(document, name, hours, path, domain, secure)
{
	this.$document = document;
	this.$name     = name;
	
	if (hours)
		this.$expiration = new Date((new Date()).getTime() + hours*3600000);
	else
		this.$expiration = null;
	
	if (path)
		this.$path = path;
	else
		this.$path = null;
	
	if (domain)
		this.$domain = domain;
	else
		this.$domain = null;
	
	if (secure)
		this.$secure = secure;
	else
		this.$secure = false;	
}

Cookie.prototype.storeCookie = function(varsToBeStored)
{
	var cookieval = "";
	cookieval = recursiveStore(varsToBeStored,cookieval);
	cookieval = escape(cookieval);

	var cookie = this.$name + '=' + cookieval;
		
	if (this.$expiration)
		cookie += '; expires=' + this.$expiration.toGMTString();
	
	if (this.$path)
		cookie += '; path=' + this.$path;	
	
	if (this.$domain)
		cookie += '; domain=' + this.$domain;	
	
	if (this.$secure)
		cookie += '; secure';
	//alert(cookie);		
	this.$document.cookie = cookie;
}

Cookie.prototype.remove = function()
{
	var cookie;
	cookie = this.$name + '=';
	
	if (this.$path)
		cookie += '; path=' + this.$path;

	if (this.$domain)
		cookie += '; domain=' + this.$domain;	

	this.$expiration = new Date((new Date()).getTime() - 365*24*3600000)
	cookie += '; expires=' + this.$expiration.toGMTString();
	
	this.$document.cookie = cookie;
}


var separator_left = "(";
var separator_right = ")";

var allStuff = new Array();
var recurse = new Array();
var recload = new Array();

recload["name1"] = "abcd";
recload["name2"] = "ghij";

recurse["rec1"] = "value1 of rec1";
recurse["rec2"] = "value2 of _ rec2";
recurse["record3"] = "val3 of record3 ;";
recurse["recloader"] = recload;

allStuff["test1"] = "tester1";
allStuff["recursive"] = recurse;

function recursiveStore(currentArray, cookieString)
{
	thisCookieString = "";
	for(var currentElement in currentArray)
	{
		var thisElement = currentArray[currentElement];
		// cookieString += ( "(" + currentElement);
		cookieString += (separator_left + currentElement);

		if (typeof (thisElement) == "object")
		{
			// alert("array currentElement = " + currentElement + " thisElement = " + thisElement);
			
			// cookieString += ( "(" + recursiveStore(thisElement,thisCookieString) + ")");
			cookieString += ( separator_left + recursiveStore(thisElement,thisCookieString) + separator_right);  
		}
		else
		{
			//alert("simple currentElement = " + currentElement + " thisElement = " + thisElement);
	
			// cookieString += "(" + thisElement + ")";	
			cookieString += separator_left + thisElement + separator_right;	
		}
		// cookieString += ")";
		cookieString += separator_right;

		// alert("cookie is " + cookieString);
	
	}
	//alert("thisCookieString is " + thisCookieString);
	//alert("cookie is " + cookieString);
	return cookieString;
}

Cookie.prototype.loadCookie = function(varsToBeLoaded)
{
	var allcookies = this.$document.cookie;
	if (allcookies == "")
		return false;	
	
	var start = allcookies.indexOf(this.$name + '=');

	if (start == -1)
		return false;	// cookie not defined for this page
	
	start += this.$name.length + 1; // skip name and equals sign
	
	var end = allcookies.indexOf(';',start);

	if (end == -1)
		end = allcookies.length;

	var cookieval = allcookies.substring(start,end);
	var unescapedCookieval = unescape(cookieval);
	recursiveLoad(varsToBeLoaded,unescapedCookieval,0);
	
	return true;		
}		

function recursiveLoad(loadArray, cookieString, cptr)
{
	//alert("Load cookie string = " + cookieString);	
	
	var cookielen = cookieString.length;
	
	/*for(var currentElement in loadArray)
	{	
		var thisElement = loadArray[currentElement];
		// stack.push(cookieString.charAt[cptr]);
		//alert("currentElement = " + currentElement + " cptr = " + cptr + " len = " + currentElement.length);
		// fix this !
		
		cptr = cptr + currentElement.length + 2;	

		if (typeof (thisElement) == "object")
		{	
			recursiveLoad(thisElement,cookieString,cptr);	
			cptr = cptr+1;		
		}
		else
		{
			var end  = cookieString.indexOf(')',cptr+1);
			var varValue = cookieString.substring(cptr,end);
			var varlen = varValue.length;	
			//alert("loading value " + varValue + " into " + currentElement	+ " thisElement len = " + varlen);
			loadArray[currentElement] = ""+ cookieString.substring(cptr,end);
			cptr = cptr + varlen + 2;
		}												
	}*/
	
	while(cptr < cookielen)
	{
		var eofVar = cookieString.indexOf('(',cptr+1);
		var currentElement = cookieString.substring(cptr+1,eofVar);
		cptr = cptr + currentElement.length + 2;			
		var end  = cookieString.indexOf(')',cptr+1);
		var varValue = cookieString.substring(cptr,end);
		var varlen = varValue.length;	
		//alert("loading value " + varValue + " into " + currentElement	+ " thisElement len = " + varlen);
		loadArray[currentElement] = ""+ cookieString.substring(cptr,end);
		cptr = cptr + varlen + 2;

	}
}
	

// var testCookie = new Cookie(document,"TestCookie",512);

//alert("trying to load cookie if present");
//if (!testCookie.loadCookie(allStuff))
//{
//	alert("Storing cookie - not already present");
//	testCookie.storeCookie(allStuff);
//}

// </script>



	