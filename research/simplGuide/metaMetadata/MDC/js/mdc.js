

//Helpful function from http://jsfiddle.net/KJQ9K/
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
        if (/:$/.test(match)) {
            cls = 'key';
        } else {
            cls = 'string';
        }
    } else if (/true|false/.test(match)) {
        cls = 'boolean';
    } else if (/null/.test(match)) {
        cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}


//Thanks to http://bloggerplugnplay.blogspot.in/2012/08/how-to-get-url-parameter-in-javascript.html
function getParameter(param) {
  var val = document.URL;

  var loc = val.indexOf(param);

  if(loc === -1) {
    return -1;
  } else {
    var url = val.substr(loc);
    var n=url.replace(param+"=","");
    return n;
  }
}

var rawMetadata = "";
var rawMMD = "";

//Stringify the JSON and make it pretty looking
function updateJSON(isMetadata)
{ 
  var input = "";
  if(isMetadata) {
    input = rawMetadata;
  } else {
    input = rawMMD;
  }

  var content = document.getElementById("mdcJsonPP");
  var output = JSON.stringify(input, undefined, 4);
  content.innerHTML = syntaxHighlight(output);
}

//Sets the value of the link text box in the linking modal view
function setLinkValue()
{
  var linkInput = document.getElementById("modalLinkValue");
  var targetURL = document.getElementById("targetURL").value;
  var linkURL = document.URL;

  //If a target URL is already included in the document.URL, strip it out
  if(getParameter("url") != -1) {
    var loc = linkURL.indexOf("?url=");
    linkURL = linkURL.substr(0, loc);
  }

  //Append the targetURL for the new link
  linkInput.defaultValue=linkURL + "?url=" + encodeURIComponent(targetURL);
}


function onNewMMD(metametadata) {
  rawMMD = metametadata;
  console.log(metametadata);
}

function onNewMetadata(metadata) {
  rawMetadata = metadata;
  
  updateJSON(true);

  //Hate this but it's necessary for now... Service does funky redirect stuff when you request MMD with a URL
  var first;
  for(first in metadata)
    break;

  $.ajax({
    url: 'http://ecology-service.cse.tamu.edu/BigSemanticsService/mmd.jsonp',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: { name: first},
    success: onNewMMD
  });

}

function getJSONData (targeturl) {
  $.ajax({
    url: 'http://ecology-service.cse.tamu.edu/BigSemanticsService/metadata.jsonp',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: { url: targeturl},
    success: onNewMetadata
  });
  
}

function showMetadata()
{
  var url = document.getElementById("targetURL").value;
  var content = document.getElementById("mdcIce");
  
  MetadataRenderer.addMetadataDisplay(content, url, true);

  getJSONData(url);
}

function onEnterShowMetadata(event)
{
  if(event.keyCode == 13)
    showMetadata(); 
}

//Decide whether to show default or if there's a parameter passed in
function onBodyLoad() {

  //Register button call backs
  $('#mmdJsonButton').on('click', function (e) {

    $button = $('#mmdJsonButton');
    $otherButton = $('#mdJsonButton');
    if(!$button.hasClass("active")) {
      //This means it's not currently selected
      $otherButton.removeClass("btn-primary");
      $button.addClass("btn-primary");

      updateJSON(false);
    }

  });

  $('#mdJsonButton').on('click', function (e) {
    $button = $('#mdJsonButton');
    $otherButton = $('#mmdJsonButton');
    if(!$button.hasClass("active")) {
      //This means it's not currently selected
      $otherButton.removeClass("btn-primary");
      $button.addClass("btn-primary");

      updateJSON(true);
    }
  });

  //Try to get passed in parameter url
  var n = getParameter("url");
  if(n == -1) {
    showMetadata();
  } else {
    var linkInput = document.getElementById("targetURL");
    linkInput.value=decodeURIComponent(n);
    showMetadata();
  }
}



