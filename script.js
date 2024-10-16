const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const parallelogramColors = ['hsl(317 100% 54% / .7)', 'hsl(197 100% 54% / .7)'];
const parallelogramHeight = 32;
const rowHeight = 48;
const minimumSeperation = 32;
const moveAngle = 32;
const speedX = 1;
const speedY = 0.267;
const speedMultiplier = 64;
const upOffset = heightOffset(window.innerWidth);
const rowCount = Math.ceil((window.innerHeight + upOffset) / rowHeight);
const parallelogramCount = (rowCount/2) * (window.innerWidth / 384);
let rowClears = [];

//Debug
console.log(parallelogramCount, rowCount);

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function heightOffset(x) {
  let angle = moveAngle * (Math.PI / 180);
  let y = x * Math.tan(angle);
  return y;
}

function movePositions(time, lastTime, xPos, yPos) {
  let deltaTime = (time - lastTime) / 1000;
  let newXPos = xPos + speedX * deltaTime * speedMultiplier;
  let newYPos = yPos + speedY * deltaTime * speedMultiplier;

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

  return document.body.insertBefore(div, document.body.firstChild);
}

class Parallelogram {
  constructor(row, firstSpawn) {
    this.width = randomNumber(parallelogramWidthMin, parallelogramWidthMax);
    this.height = parallelogramHeight;
    this.row = row;
    this.yPos = this.row * rowHeight - upOffset - (this.width * 2 * speedY);
    this.xPos = -(this.width * 2);
    this.color = parallelogramColors[Math.floor(Math.random() * parallelogramColors.length)];
    this.lastTimestamp = null;
    this.element = createParalelogram(this.color, this.width, this.height, this.xPos, this.yPos);
    this.move = true;

    if (firstSpawn) {
      let xAdd = Math.random() * ((this.width * 3) + window.innerWidth);
      let yAdd = xAdd * speedY;

      this.xPos += xAdd;
      this.yPos += yAdd;

      let arrayIndex = rowClears[this.row].indexOf(this);
      if (this.xPos >= minimumSeperation) {
        if (arrayIndex > -1) {
          rowClears[this.row].splice(arrayIndex, 1);
        }
      } else {
        if (arrayIndex < 0) {
          rowClears[this.row].push(this);
        }
      }
    }

    if (this.move) requestAnimationFrame(this.updatePosition.bind(this));
  }

  updatePosition(timestamp) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }
    
    if (timestamp) {
      let posArray = movePositions(timestamp, this.lastTimestamp, this.xPos, this.yPos);
      this.xPos = posArray[0];
      this.yPos = posArray[1];

      let arrayIndex = rowClears[this.row].indexOf(this);
      if (this.xPos >= minimumSeperation) {
        if (arrayIndex > -1) {
          rowClears[this.row].splice(arrayIndex, 1);
        }
      } else {
        if (arrayIndex < 0) {
          rowClears[this.row].push(this);
        }
      }

      if (this.xPos > window.innerWidth + this.width) {
        spawnParallelogram(false);
        this.element.remove();
        this.move = false;
      }

      if (this.move && this.element) {
        this.element.style.left = this.xPos + 'px';
        this.element.style.top = this.yPos + 'px';
      }

      this.lastTimestamp = timestamp;
    }

    if (this.move) requestAnimationFrame(this.updatePosition.bind(this));
  }
}

function spawnParallelogram(firstSpawn) {
  let spawnOptions = [];
  for (let i = 0; i < rowClears.length; i++) {
    if (rowClears[i].length === 0) {
      spawnOptions.push(i);
    }
  }
  const row = spawnOptions[Math.floor(Math.random() * spawnOptions.length)];
  if (row === undefined) throw new Error('row should not be undefined here');
  new Parallelogram(row, firstSpawn);
}

function initiateRowClears() {
  for (let i = 0; i < rowCount; i++) {
    rowClears.push([]);
  }
}
initiateRowClears();

for (let i = 0; i < parallelogramCount; i++) {
  spawnParallelogram(true);
}

//Add first spawn overlap protection
