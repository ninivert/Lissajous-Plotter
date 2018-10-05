/*
Note: Every form is for ONE option
the form ID should match the initalizer CONTROLS.init.{name}
and the oninput callback CONTROLS.callback.{name}
*/

function CONTROLS() {}

CONTROLS.DOM = {
	// All the container form elements
	'forms': {
		'count': document.getElementById('count'),
		'speed': document.getElementById('speed'),
		// 'ratio': document.getElementById('ratio'),
		'clear': document.getElementById('clear'),
		'save': document.getElementById('save'),
	},
	// The child values, for reference
	'children': {
	}
}

//
// Initalization
//

CONTROLS.init = function() {
	/*
	Note: Looping through all the individual initializers to call them all
	Also add the callbacks and disable form submission
	*/

	let forms = Object.keys(this.init)

	for (let i=0; i<forms.length; i++) {
		this.init[forms[i]].call(this)
		this.DOM.forms[forms[i]].oninput = this.callback[forms[i]].bind(this)
		this.DOM.forms[forms[i]].onclick = this.callback[forms[i]].bind(this)
		// onchange is for the checkboxes on mobile touch devices
		this.DOM.forms[forms[i]].onchange = this.callback[forms[i]].bind(this)
		this.DOM.forms[forms[i]].onsubmit = function() { return false }
	}
}

CONTROLS.init.count = function() {
	let input = document.createElement('input')
	input.type = 'range'
	input.id = 'count-input'
	input.min = 1
	input.max = 20
	input.step = 1
	input.value = COUNT

	let label = document.createElement('label')
	label.innerHTML = COUNT
	label.htmlFor = 'count-input'

	this.DOM.children.count = input
	this.DOM.children.countlabel = label
	this.DOM.forms.count.appendChild(input)
	this.DOM.forms.count.appendChild(label)
}

CONTROLS.init.speed = function() {
	let input = document.createElement('input')
	input.type = 'range'
	input.id = 'speed-input'
	input.min = 0
	input.max = 0.1
	input.step = (input.max - input.min)/100
	input.value = BASESPEED

	let label = document.createElement('label')
	label.innerHTML = BASESPEED
	label.htmlFor = 'speed-input'

	this.DOM.children.speed = input
	this.DOM.children.speedlabel = label
	this.DOM.forms.speed.appendChild(input)
	this.DOM.forms.speed.appendChild(label)
}

// CONTROLS.init.ratio = function() {
// 	let input = document.createElement('input')
// 	input.type = 'range'
// 	input.id = 'ratio-input'
// 	input.min = 0
// 	input.max = 2
// 	input.step = (input.max - input.min)/100
// 	input.value = RELSPEED

// 	let label = document.createElement('label')
// 	label.innerHTML = RELSPEED
// 	label.htmlFor = 'ratio-input'

// 	this.DOM.children.ratio = input
// 	this.DOM.children.ratiolabel = label
// 	this.DOM.forms.ratio.appendChild(input)
// 	this.DOM.forms.ratio.appendChild(label)
// }

CONTROLS.init.clear = function() {
	let input = document.createElement('input')
	input.type = 'button'
	input.value = 'Clear'

	this.DOM.children.clear = input
	this.DOM.forms.clear.appendChild(input)
}

CONTROLS.init.save = function() {
	let input = document.createElement('input')
	input.type = 'button'
	input.value = 'Save'

	this.DOM.children.save = input
	this.DOM.forms.save.appendChild(input)
}

//
// Callbacks
//

CONTROLS.callback = {}

CONTROLS.callback.count = function() {
	let value = parseInt(this.DOM.children.count.value)
	console.log(value)
	COUNT = value
	this.DOM.children.countlabel.innerHTML = value
	init()
}

CONTROLS.callback.speed = function() {
	let value = this.DOM.children.speed.value
	BASESPEED = value
	this.DOM.children.speedlabel.innerHTML = value
	init()
}

// CONTROLS.callback.ratio = function() {
// 	let value = this.DOM.children.ratio.value
// 	RELSPEED = value
// 	this.DOM.children.ratiolabel.innerHTML = value
// 	init()
// }

CONTROLS.callback.clear = function() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

CONTROLS.callback.save = function() {  
	// Create a canvas with black background
	// and draw plot on it
	let c = document.createElement('canvas')
	let ctx = c.getContext('2d')
	c.width = WIDTH
	c.height = HEIGHT
	ctx.fillStyle = '#000'
	ctx.fillRect(0, 0, WIDTH, HEIGHT)
	ctx.drawImage(canvas, 0, 0)

	// Generate image and download
	let link = document.createElement('a')
	link.download = `lissajous.jpg`
	link.href = c.toDataURL('image/png')
	document.body.appendChild(link)
	link.setAttribute('type', 'hidden')
	link.click()
	document.body.removeChild(link)
}

//
// Start everything
//

CONTROLS.init()
