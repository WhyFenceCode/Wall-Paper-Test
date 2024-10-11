//Constants
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const textObject =   document.getElementById('date');

//Animation
class Parallelogram {
  constructor(element, position, resetAmount) {
    this.element = element;
    this.speed = 24; // Speed in pixels per second
    this.position = position;
    this.resetAmount = resetAmount;
    this.lastTimestamp = null;

    console.log(this.resetAmount);
    console.log(this.position);
    
    requestAnimationFrame(this.updatePosition.bind(this));
  }

  updatePosition(timestamp) {
    if (timestamp) {
      const delta = timestamp - (this.lastTimestamp || timestamp);
      this.position += (this.speed * delta) / 1000; // Update position based on elapsed time
      this.element.style.transform = `skew(64deg) rotate(32deg) translate(${this.position}px)`;

      if (this.position > window.innerWidth) {
        console.log(-this.resetAmount);
        this.position = -this.resetAmount; // Reset to the start
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
  for(var i = 0; i < parallelogramCount; i++){
    let parallelogramToCreate = document.createElement("div");
    parallelogramToCreate.classList.add("parallelogram");
    let newParallelogram = document.body.insertBefore(parallelogramToCreate, document.body.firstChild);
    let upAmount = window.innerHeight*16;
    upAmount -= 32*i;
    newParallelogram.style.top = -upAmount+"px";
    let newWidth = getRandomFloat(256, 512);
    newParallelogram.style.width = newWidth+"px";
    let newPosition = getRandomInt(window.innerWidth+20, -newParallelogram.style.width-20);
    newParallelogram.setAttribute("data-position", newPosition);
    //Paralelogram 2
    let parallelogramToCreate2 = document.createElement("div");
    parallelogramToCreate2.classList.add("parallelogram");
    let newParallelogram2 = document.body.insertBefore(parallelogramToCreate2, document.body.firstChild);
    let upAmount2 = window.innerHeight*16;
    upAmount2 -= 32*i;
    newParallelogram2.style.top = -upAmount2+"px";
    let newWidth2 = getRandomFloat(192, 384);
    newParallelogram2.style.width = newWidth2+"px";
    let newPosition2 = getRandomInt(window.innerWidth+20, -newParallelogram2.style.width-20);
    let loopCount = 0;
    do {
      newPosition2 = getRandomInt(window.innerWidth+20, -newParallelogram2.style.width-20);
      loopCount++;
      if (loopCount > 50){
        break;
      }
    } while (Math.abs(newPosition2 - newPosition) < (32+newWidth));
    newParallelogram2.setAttribute("data-position", newPosition);
  }
}

// Function to create a new Parallelogram instance for each element
function createParallelogramAnimations() {
  const elements = document.querySelectorAll('.parallelogram');
  elements.forEach(element => new Parallelogram(element, element.dataset.position, element.style.width+20));
}

// Initial creation of parallelograms
createParallelograms();
createParallelogramAnimations();

// Set up a MutationObserver to detect new parallelogram elements
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('parallelogram')) {
        new Parallelogram(node, element.dataset.position, node.style.width+20);
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
