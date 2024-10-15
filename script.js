const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const rowHeight = 48;
const speedX = 24;
const speedY = 14.997;
const rowCount = Math.ceil(window.innerHeight +  heightOffset(window.innerWidth))/ rowHeight);

function randomNumber(min, max) {
  return Math.random() * (max-min) + min);
}

function heightOffset(x) {
    let angle = 32 * (Math.PI/180);
    let y = x * Math.tan(angle);
    return y;
}

class Parallelogram {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

