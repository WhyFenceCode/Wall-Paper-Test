const parallelogramWidthMax = 320;
const parallelogramWidthMin = 192;

function randomNumber(min, max) {
  return Math.random() * (max-min) + min);
}

class Parallelogram {
  constructor() {
    this.height = 32;
    this.width = randomNumber(parallelogramWidthMin, parallelogramWidthMax);
  }
}

