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
    createCookie("juxtaposition",1,1);
	$(function() {
		$('#slides').slidesjs({
			width: 400,
			height: 225,
			start: 1,
			navigation: false,
			effect: {
				slide: {
				speed: 700,
				// [number] Speed in milliseconds of the fade animation.
				crossfade: true
				// [boolean] Cross-fade the transition.
				}
			},
			play: {
			effect: "slide",
			auto: true,
			interval: 6000
			}
		});

		$('#slides2').slidesjs({
			width: 400,
			height: 225,
			navigation: false,
			start: 1,
			effect: {
				slide: {
				speed: 700,
				// [number] Speed in milliseconds of the fade animation.
				crossfade: true
				// [boolean] Cross-fade the transition.
				}
			},
			play: {
			effect: "slide",
			auto: true,
			interval: 6000
			}
		});

		$('#slides3').slidesjs({
			width: 400,
			height: 225,
			navigation: false,
			start: 1,
			effect: {
				slide: {
				speed: 700,
				// [number] Speed in milliseconds of the fade animation.
				crossfade: true
				// [boolean] Cross-fade the transition.
				}
			},
			play: {
			effect: "slide",
			auto: true,
			interval: 6000
			}
		});

		$('#slides4').slidesjs({
			width: 400,
			height: 225,
			navigation: false,
			start: 1,
			effect: {
				slide: {
				speed: 700,
				// [number] Speed in milliseconds of the fade animation.
				crossfade: true
				// [boolean] Cross-fade the transition.
				}
			},
			play: {
			effect: "slide",
			auto: true,
			interval: 6000
			}
		});
	});
});
