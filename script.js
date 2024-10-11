//Constants
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const textObject =   document.getElementById('date');

//Animation
class Parallelogram {
  constructor(element, position, resetAmount) {
    this.element = element;
    this.speed = 24; // Speed in pixels per second
    this.position = position;
    this.resetAmount
    this.lastTimestamp = null;

    console.log(resetAmount);

    requestAnimationFrame(this.updatePosition.bind(this));
  }

  updatePosition(timestamp) {
    if (timestamp) {
      const delta = timestamp - (this.lastTimestamp || timestamp);
      this.position += (this.speed * delta) / 1000; // Update position based on elapsed time
      this.element.style.transform = `skew(64deg) rotate(32deg) translate(${this.position}px)`;

      if (this.position > window.innerWidth) {
        this.position = -300; // Reset to the start
      }

      this.lastTimestamp = timestamp;
    }

    requestAnimationFrame(this.updatePosition.bind(this));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create Parallelogram instances
function createParallelograms() {
  let parallelogramCount = window.innerHeight;
  console.log(parallelogramCount);
  for(var i = 0; i < parallelogramCount; i++){
    let parallelogramToCreate = document.createElement("div");
    parallelogramToCreate.classList.add("parallelogram");
    let newParallelogram = document.body.insertBefore(parallelogramToCreate, document.body.firstChild);
    let upAmount = window.innerHeight*16;
    upAmount -= 32*i;
    newParallelogram.style.top = -upAmount+"px";
    let newWidth = getRandomFloat(256, 512);
    newParallelogram.style.width = newWidth+"px";
  }
  for(var j = 0; j < parallelogramCount; j++){
    let parallelogramToCreate = document.createElement("div");
    parallelogramToCreate.classList.add("parallelogram");
    let newParallelogram = document.body.insertBefore(parallelogramToCreate, document.body.firstChild);
    let upAmount = window.innerHeight*16;
    upAmount -= 32*j;
    newParallelogram.style.top = -upAmount+"px";
    let newWidth = getRandomFloat(256, 512);
    newParallelogram.style.width = newWidth+"px";
  }
}

// Function to create a new Parallelogram instance for each element
function createParallelogramAnimations() {
  const elements = document.querySelectorAll('.parallelogram');
  elements.forEach(element => new Parallelogram(element, getRandomInt(window.innerWidth+20, -element.style.width-20), -element.style.width-20));
}

// Initial creation of parallelograms
createParallelograms();
createParallelogramAnimations();

// Set up a MutationObserver to detect new parallelogram elements
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('parallelogram')) {
        new Parallelogram(node, getRandomInt(window.innerWidth+20.0, -element.style.width-20.0), element.style.width+20.0);
      }
    });
  });
});

// Start observing the document for changes in child elements
observer.observe(document.body, {
  childList: true,
  subtree: true // Observe all child elements, not just direct children
});

//Date
function setDateText(){
  let d = new Date();
  let data = months[d.getMonth()];
  data = data + " " + d.getDate();
  textObject.innerHTML = data;
}

setDateText();
setInterval(setDateText, 500);
