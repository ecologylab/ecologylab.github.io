 
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    console.log(encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/");
}

$(document).ready(function() {
    createCookie("conflict",1,1);
});

var allClicks = "#tlt, #tlb, #trt, #trb, #blt, #blb, #brt, #brb, #mt, #mb";
var allIDs = "#tl, #tr, #bl, #br, #m";
var startIDs = "#tr, #bl, #br, #m";

$(document).ready(function() {
    $(startIDs).hide();

   /* $(allIDs).click(function(e) {
        e.stopPropagation();         
    });*/
    $(allClicks).click(function(selectedID) {
        var id = $(event.target).attr('id');
        $(allIDs).fadeOut();
		var newid = ($(this).attr("class"));
        $("#" + newid).fadeIn();
    });
});