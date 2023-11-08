var image = {
	x: 0,
	y: 0
};


function moveToClick(event)
{
	const mouse = {
		x: event.clientX, // in this example, clientX and pageX are the same
		y: event.clientY
	};

	const w = document.body.clientWidth;
	const h = document.documentElement.clientHeight;
    

	var positionOnImage = {
		x: image.x - mouse.x,
		y: image.y - mouse.y
	};

	let x = (w/2) + positionOnImage.x;
    if (x < -w/4)
        x = -w/4;
    else if (x > w/4)
        x = w/4;
	let y = (h/2) + positionOnImage.y;
    if (y < -h/4)
        y = -h/4;
    else if (y > h/4)
        y = h/4;
    
    image.x = x;
    image.y = y;

	document.getElementById("mapImage").style.left = image.x + 'px';
	document.getElementById("mapImage").style.top = image.y + 'px';

}
