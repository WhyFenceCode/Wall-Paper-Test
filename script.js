const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;
const parallelogramColors = ['hsl(43 100% 54%)', 'hsl(197 100% 54%)'];
const parallelogramHeight = 32;
const rowHeight = 48;
const minimumSeperation = 64;
const moveAngle = 32;
const speedX = 1;
const speedY = 0.267;
const speedMultiplier = 64;
const upOffset = heightOffset(window.innerWidth);
const rowCount = Math.ceil((window.innerHeight + upOffset) / rowHeight);
const parallelogramCount = Math.ceil((rowCount / 3) * (window.innerWidth / 512) * 1.2);
let rowClears = [];
let spawned = 0;
let startSpawnsInterval = null;

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

class LoadingProgress {
  constructor(){
    this.inner = document.querySelector(".loading-container");;
    this.outer = document.querySelector(".loading-progress");;
    this.opacity = 1;

    requestAnimationFrame(this.updatePosition.bind(this));
  }
  
  updatePosition(timestamp) {
    let spawnPercent = spawned/parallelogramCount*100;
    this.inner.style.width = spawnPercent + 'px';

    if (spawnPercent < 99){
      this.opacity -= 0.01;
    }

    this.outer.style.opacity = this.opacity;

    requestAnimationFrame(this.updatePosition.bind(this));
  }
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
        spawnParallelogram();
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

function spawnParallelogram() {
  let spawnOptions = [];
  for (let i = 0; i < rowClears.length; i++) {
    if (rowClears[i].length === 0) {
      spawnOptions.push(i);
    }
  }
  const row = spawnOptions[Math.floor(Math.random() * spawnOptions.length)];
  if (row === undefined) throw new Error('row should not be undefined here');
  new Parallelogram(row);
}

function initiateRowClears() {
  for (let i = 0; i < rowCount; i++) {
    rowClears.push([]);
  }
}

function spawnAtStart() {
  new LoadingProgress();
  spawnParallelogram();
  spawned++;
  console.log(spawned + "out of" + parallelogramCount);
  if (spawned >= parallelogramCount) {
    clearInterval(startSpawnsInterval);
  }
}

function startSpawning() {
  spawnAtStart();
  startSpawnsInterval = setInterval(spawnAtStart, 1000);
}

initiateRowClears();
startSpawning();
