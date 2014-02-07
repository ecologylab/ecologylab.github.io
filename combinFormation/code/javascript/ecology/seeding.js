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


function saveSeedSet(xml)
{
//   clearCookie("seeds");
//   alert("saveSeedSet("+xmlToString(xml));
   setCookie("seed_set", xmlToString(xml));
}

function namedCollage(name)
{
   var seedSet	= xmlDoc.createElement("seed_set");
   seedSet.appendChild(createCuratedSeed(name));
   launchCF(seedSet, "ffffff", true);
}
function documentCollage(url)
{
   var seedSet	= xmlDoc.createElement("seed_set");
   seedSet.appendChild(createDocumentSeed(url));
   launchCF(seedSet);
}
