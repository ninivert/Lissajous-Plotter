'use strict';

/**
 * IDEAS
 * Use Canvas Path2D() to store the curves
 * but that would mean creating many instances,
 * clearing, redrawing in every frame
 * which we can't really afford
 */

// Layout stuffs
var SPACING = 25;
var RADIUS = 50;
var NODERADIUS = 4;
// Circle stuffs 
var COUNT = 4;
var BASESPEED = 0.02;
// const RELSPEED = 1.5
// Canvasw
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d', { alpha: false });

var NEXTFRAME = void 0;
var CIRCLES = void 0;

function init() {
  // A few constants derived from other constants
  window.WIDTH = 2 * RADIUS * (COUNT + 1) + (COUNT + 2) * SPACING;
  window.HEIGHT = 2 * RADIUS * (COUNT + 1) + (COUNT + 2) * SPACING;
  // One unit is the place that a circle + spacing around takes
  window.UNIT = SPACING + 2 * RADIUS;
  // Canvas clearing values that don't need to be constantly reevaluated
  window.CLRX = SPACING + 2 * RADIUS;
  window.CLRY = 0.5 * SPACING;
  window.CLRH = SPACING + 2 * RADIUS;
  window.CLRW = WIDTH - CLRX;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  cancelAnimationFrame(NEXTFRAME);
  NEXTFRAME = requestAnimationFrame(draw);

  CIRCLES = new Array(COUNT).fill().map(function (x, i) {
    var rgb = hslToRgb((i + 1) / COUNT, 1, 0.8);
    rgb = rgb.map(function (x) {
      return Math.floor(x);
    });

    return {
      x: SPACING * (i + 2) + RADIUS * (2 * i + 3),
      y: SPACING + RADIUS,
      speed: BASESPEED * (i + 1),
      angle: 0,
      color: '#' + rgb.map(function (x) {
        return x.toString(16);
      }).join(''),
      rgb: rgb,
      // Storing the sin and cos because these operations are expensive
      projx: RADIUS * Math.cos(0),
      projy: RADIUS * Math.sin(0)
    };
  });
}

init();

/**
 * https://gist.github.com/mjackson/5311256
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}
//# sourceMappingURL=index.js.map