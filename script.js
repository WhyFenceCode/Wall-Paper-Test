const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const parallelogramColors = ["color1", "color2"];
const parallelogramHeight = 32;
const rowHeight = 48;
const minimumSeperation = 32;
const speedX = 24;
const speedY = 14.997;
const upOffset = heightOffset(window.innerWidth);
const rowCount = Math.ceil(window.innerHeight +  upOffset)/ rowHeight);
let rowClears = [];

function randomNumber(min, max) {
  return Math.random() * (max-min) + min);
}

function heightOffset(x) {
    let angle = 32 * (Math.PI/180);
    let y = x * Math.tan(angle);
    return y;
}

function removeByIndex(i, arrayToSlice) {
  let halfBefore = arrayToSlice.slice(0, i);
  let halfAfter = arrayToSlice(i+1);
  return halfBefore.concat(halfAfter);
}

function movePositions(time, lastTime, xPos, yPos) {
  let deltaTime = (time - lastTime)/1000;
  let newXPos = xPos + (speedX * delta);
  let newYPos = yPos + (speedY * delta);

  return [newXPos, newYPos];
}

class Parallelogram {
  constructor(row) {
    this.width = randomNumber(parallelogramWidthMin, parallelogramWidthMax);
    this.height = parallelogramHeight;
    this.row = row;
    this.yPos = (this.row * rowHeight) - upOffset;
    this.xPos = -width;
    this.color = parallelogramColors[(Math.floor(Math.random() * parallelogramColors.length))];
    this.lastTimestamp = null;
    this.element = null;
    this.move = true;
  }
  
  updatePosition(timestamp) {
    if (timestamp) {
      if (!lastTimestamp){
        lastTimestamp = timestamp;
      }
      let posArray = movePositions(timestamp, lastTimestamp, xPos, yPos);
      this.xPos = posArray[0];
      this.yPos = posArray[1];
      
      let arrayIndex = rowClears[row].findIndex(this);
      if (xPos >= minimumSeperation) {
        if (arrayIndex > -1) {
          rowClears[row] = removeByIndex(arrayIndex, rowClears[row]);
        }
      } else {
        if (arrayIndex < 0) {
          rowClears[row].push(this);
        }
      }

      if (this.xPos > window.innerWidth) {
        spawnParrallelogram();
        this.element.remove();
        this.move = false;
      }

      if (this.move && this.element) {
        this.element.style.left = xPos;
        this.element.style.top = yPos;
      }
    }

    requestAnimationFrame(this.updatePosition.bind(this));
  }
}
/* Each frame
Use moveposition
Check rowClear for new spawns
Check offscreen, if call new spawn and remove self
Render if not offscreen
*/

function spawnParallelogram() {
  
}
