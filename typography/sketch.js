let manrope;
let satoshi;

function preload() {
  manrope = loadFont("./assets/fonts/Manrope.ttf");
  satoshi = loadFont("./assets/fonts/Satoshi-Regular.otf");
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  fill(0);
  noStroke();
  textFont(manrope);
  textSize(50);
  text("Hello", width / 2, height / 3);

  textFont(satoshi);
  textSize(60);
  text("World", width / 2, height / 2);
}
