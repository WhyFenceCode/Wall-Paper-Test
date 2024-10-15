const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const parallelogramColors = ["hsl(317 100% 54% / .7)", "hsl(197 100% 54% / .7)"];
const parallelogramHeight = 32;
const rowHeight = 48;
const minimumSeperation = 32;
const speedX = 24;
const speedY = 14.997;
const upOffset = heightOffset(window.innerWidth);
const rowCount = Math.ceil((window.innerHeight +  upOffset)/ rowHeight);
let rowClears = [];

function randomNumber(min, max) {
  return Math.random() * (max-min) + min;
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

function createParalelogram(color, width, height, left, top) {
    let div = document.createElement('div');
  
    div.classList.add('paralelogram');
    
    div.style.backgroundColor = color;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;

    return document.body.insertBefore(div, body.firstChild);
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
    this.element = createParalelogram(this.color, this.width, this.height, this.xPos, this.yPos);
    this.move = true;

    if (this.move) requestAnimationFrame(this.updatePosition.bind(this));
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

    if (this.move) requestAnimationFrame(this.updatePosition.bind(this));
  }
}

function spawnParallelogram() {
  console.log("Need to Spawn);
}

for (let i = 0; i < rowCount; i++) {
  new Parallelogram(i);
}
