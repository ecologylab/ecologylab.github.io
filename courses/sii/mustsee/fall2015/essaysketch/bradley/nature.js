 
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
    createCookie("nature",1,1);
});