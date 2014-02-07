function createSearchSeed(query, engine)
{
   var result		= xmlDoc.createElement("search");
   result.setAttribute("engine", engine);
   query			= query.replace(/"/g, '&#34;');
   result.setAttribute("query", query);
   return result;
}

function createCuratedSeed(name)
{
   var result		= xmlDoc.createElement("curated_seeding");
   result.setAttribute("name", name);
   return result;
}

function createDeliciousCreatorSeed(creator, engine)
{
   var result		= xmlDoc.createElement("delicious");
   result.setAttribute("creator", creator);
   return result;
}

//var test = createSearchSeed("google", "giant+sequoias");
//alert("yo, too! " + xmlToString(test));

function createCrawlerSeed(value, action, valueName)
{
   var result		= xmlDoc.createElement("crawler");
   if (!valueName)
	  valueName		= "url";
   result.setAttribute(valueName, value);
   result.setAttribute("action", action);
   return result;
}
function createTraversableSeed(url)
{
   return createCrawlerSeed(url, "traversable", "url");
}
function createUntraversableSeed(url)
{
   return createCrawlerSeed(url, "untraversable", "url");
}
function createRejectSeed(url)
{
   return createCrawlerSeed(url, "reject", "domain");
}
function createDocumentSeed(url)
{
   var result		= xmlDoc.createElement("document");
   // add http, .com, as necessary
   url	= fixWebAddr(url);
   result.setAttribute("url", url);
   return result;
}

function createCompositionSeed(url)
{
   var result		= xmlDoc.createElement("composition_seed");
   // add http, .com, as necessary
   url	= fixWebAddr(url);
   result.setAttribute("url", url);
   return result;
}

function createFeedSeed(url)
{
   var result		= xmlDoc.createElement("feed");
   // add http, .com, as necessary
   url	= fixWebAddr(url);
   result.setAttribute("url", url);
   return result;
}


function saveSeedSet(seedSet)
{
   var seedSetString	= xmlToString(seedSet);
   setCookie("seed_set", seedSetString);

}

function savePrefSet(seedSet)
{
   var prefSet		= buildPrefSet(autoPrefs, autoPrefTypes);
   if (seedSet)
   {
	  var prefElement	= xmlDoc.createElement("pref_seed_set");
	  prefElement.setAttribute("name", "seed_set");
	  prefElement.appendChild(seedSet);

	  prefSet.appendChild(prefElement);
   }   
   var prefSetString= xmlToString(prefSet);
// alert("savePrefSet()\n" + prefSetString);
   setCookie("pref_set", prefSetString);
}

function launchCurated(name)
{
   isCurated	= true;
   launchSeed(createCuratedSeed(name));
}
function launchComposition(url)
{
   launchSeed(createCompositionSeed(url));
}
function launchSeed(seed)
{
   // create seed set with a single seed
   var seedSet	= xmlDoc.createElement("seed_set");
   seedSet.appendChild(seed);
   launchSeedSet(seedSet);
}
function launchSeedSet(theSeedSet)
{
   // set in global name space for cf already running continuation
   seedSet		= theSeedSet;
   // set in pref_set cookie
   savePrefSet(seedSet);
   launchCF();
}

function launchEmpty()
{
   // create empty seed set
   var seedSet	= xmlDoc.createElement("seed_set");
   launchSeedSet(seedSet);
}

function launchICDL(query)
{
   var seed		= createSearchSeed(query, "icdl");
   launchSeed(seed);
}
