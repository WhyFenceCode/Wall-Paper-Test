const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const parallelogramColors = ["color1", "color2"];
const rowHeight = 48;
const minimumSeperation = 32;
const speedX = 24;
const speedY = 14.997;
const rowCount = Math.ceil(window.innerHeight +  heightOffset(window.innerWidth))/ rowHeight);
let rowClears = [];

function randomNumber(min, max) {
  return Math.random() * (max-min) + min);
}

function heightOffset(x) {
    let angle = 32 * (Math.PI/180);
    let y = x * Math.tan(angle);
    return y;
}

function movePositions(time, lastTime, xPos, yPos) {
  let deltaTime = (time - lastTime)/1000;
  let newXPos = xPos + (speedX * delta);
  let newYPos = yPos + (speedY * delta);

  return [newXPos, newYPos];
}

class Parallelogram {
  constructor(width, height, row) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.yPos = this.row * rowHeight;
    this.xPos = -width;
    this.color = parallelogramColors[(Math.floor(Math.random() * parallelogramColors.length))];
    this.lastTimestamp = null;
  }
  updatePosition(timestamp) {
    if (timestamp) {
      let posArray = movePositions(timestamp, lastTimestamp, xPos, yPos);
      this.xPos = posArray[0];
      this.yPos = posArray[1];
      if (xPos >= minimumSeperation) {

      }
    }
  }
}
/* Each frame
Use moveposition
Check rowClear for new spawns
Check offscreen, if call new spawn and remove self
Render if not offscreen
*/
