function fixGDocTargets(thatFrame)
{
    $(function() {
        $.get(thatFrame.src, function(html) {
            thatFrame.attr("srcdoc", html);
            setTimeout(function() {
               thatFrame.contents().find('a[href^="http"]').attr("target", "_blank");
               thatFrame.contents().find('a[href^="https"]').attr("target", "_blank");
            }, 1000);
        });
    });
}
function fixGDocTargets2(thatFrame)
{
	if (!thatFrame.foo)
	{
		thatFrame.foo	= true;
		var jFrame		= $(thatFrame);
		$(function() {
		    $.get(thatFrame.src, function(html) {
		        jFrame.attr("srcdoc", html);
		        setTimeout(function() {
		            jFrame.contents().find('a[href^="http"]').attr("target", "_blank");
		            jFrame.contents().find('a[href^="https"]').attr("target", "_blank");
		        }, 1000);
		    });
		});
	}
}