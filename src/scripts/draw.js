function draw() {
	// Clear both horizontal and vertical circles
	ctx.clearRect(CLRX, CLRY, CLRW, CLRH)
	ctx.clearRect(CLRY, CLRX, CLRH, CLRW)

	// Update
	updateCircles()

	// Drawing
	drawCircles()
	drawNodes()
	drawPlot()

	NEXTFRAME = requestAnimationFrame(draw)
}


function updateCircles() {
	let c

	for (let i=0; i<COUNT; ++i) {
		c = CIRCLES[i]
		c.angle += c.speed
		c.projx = RADIUS*Math.cos(c.angle)
		c.projy = RADIUS*Math.sin(c.angle)
	}
}


function drawCircles() {
	let c

	for (let i=0; i<COUNT; ++i) {
		c = CIRCLES[i]
		ctx.strokeStyle = c.color
		ctx.lineWidth = 2
		
		// Horizontally
		ctx.beginPath()
		ctx.arc(c.x, c.y, RADIUS, 0, 2*Math.PI)
		ctx.stroke()
		// Vertically
		ctx.beginPath()
		ctx.arc(c.y, c.x, RADIUS, 0, 2*Math.PI)
		ctx.stroke()
	}
}


function drawNodes() {
	let c

	for (let i=0; i<COUNT; ++i) {
		c = CIRCLES[i]
		ctx.fillStyle = c.color

		// Horizontal nodes
		ctx.beginPath()
		ctx.arc(c.x+c.projx, c.y+c.projy, NODERADIUS, 0, 2*Math.PI)
		ctx.fill()
		// Vertical nodes
		ctx.beginPath()
		ctx.arc(c.y+c.projx, c.x+c.projy, NODERADIUS, 0, 2*Math.PI)
		ctx.fill()
	}
}


function drawPlot() {
	let c1, c2, rgb

	for (let i=0; i<COUNT; ++i) {
		c1 = CIRCLES[i]

		for (let j=0; j<COUNT; ++j) {
			c2 = CIRCLES[j]

			// Take the average of the colors
			let rgb = c1.rgb.map((x, i) => Math.floor((c1.rgb[i] + c2.rgb[i])/2).toString(16))
			ctx.fillStyle = '#' + rgb.join('')

			ctx.beginPath()
			ctx.arc(SPACING + RADIUS + UNIT*(i+1) + c1.projx, SPACING + RADIUS + UNIT*(j+1) + c2.projy, 1, 0, 2*Math.PI)
			ctx.fill()
		}

	}
}