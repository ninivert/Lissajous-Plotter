'use strict';

function draw() {
	// Clear both horizontal and vertical circles
	ctx.clearRect(CLRX, CLRY, CLRW, CLRH);
	ctx.clearRect(CLRY, CLRX, CLRH, CLRW);

	// Update
	updateCircles();

	// Drawing
	drawCircles();
	drawNodes();
	drawPlot();

	NEXTFRAME = requestAnimationFrame(draw);
}

function updateCircles() {
	var c = void 0;

	for (var i = 0; i < COUNT; ++i) {
		c = CIRCLES[i];
		c.angle += c.speed;
		c.projx = RADIUS * Math.cos(c.angle);
		c.projy = RADIUS * Math.sin(c.angle);
	}
}

function drawCircles() {
	var c = void 0;

	for (var i = 0; i < COUNT; ++i) {
		c = CIRCLES[i];
		ctx.strokeStyle = c.color;
		ctx.lineWidth = 2;

		// Horizontally
		ctx.beginPath();
		ctx.arc(c.x, c.y, RADIUS, 0, 2 * Math.PI);
		ctx.stroke();
		// Vertically
		ctx.beginPath();
		ctx.arc(c.y, c.x, RADIUS, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

function drawNodes() {
	var c = void 0;

	for (var i = 0; i < COUNT; ++i) {
		c = CIRCLES[i];
		ctx.fillStyle = c.color;

		// Horizontal nodes
		ctx.beginPath();
		ctx.arc(c.x + c.projx, c.y + c.projy, NODERADIUS, 0, 2 * Math.PI);
		ctx.fill();
		// Vertical nodes
		ctx.beginPath();
		ctx.arc(c.y + c.projx, c.x + c.projy, NODERADIUS, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function drawPlot() {
	var c1 = void 0,
	    c2 = void 0,
	    rgb = void 0;

	for (var i = 0; i < COUNT; ++i) {
		c1 = CIRCLES[i];

		for (var j = 0; j < COUNT; ++j) {
			c2 = CIRCLES[j];

			// Take the average of the colors
			var _rgb = c1.rgb.map(function (x, i) {
				return Math.floor((c1.rgb[i] + c2.rgb[i]) / 2).toString(16);
			});
			ctx.fillStyle = '#' + _rgb.join('');

			ctx.beginPath();
			ctx.arc(SPACING + RADIUS + UNIT * (i + 1) + c1.projx, SPACING + RADIUS + UNIT * (j + 1) + c2.projy, 1, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}
//# sourceMappingURL=draw.js.map