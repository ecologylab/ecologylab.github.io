var image = {
	x: 0,
	y: 0
};

var target = {
	x: 0,
	y: 0
};

function moveToClick(event)
{
	var mouse = {
		x: event.pageX,
		y: event.pageY
	};

	var w = document.body.clientWidth;
	var h = document.documentElement.clientHeight;

	var positionOnImage = {
		x: image.x - mouse.x,
		y: image.y - mouse.y
	};

	target.x = (w/2) + positionOnImage.x;
	target.y = (h/2) + positionOnImage.y;

	image.x = target.x;
	image.y = target.y;

	document.getElementById("mapImage").style.left = image.x + 'px';
	document.getElementById("mapImage").style.top = image.y + 'px';

}
