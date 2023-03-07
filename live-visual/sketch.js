// Song: E:verydaytor4 - Hiroyuki Sawano

/* 
The song is divided into 3 acts
1: Playfulness: Set in the present/future
2: Fairytale/Fantasy music, could be twisted into a nostalgic theme (dream sequence of nostalgia from ages past)
3: Royalty (as in like, Medieval royalty), oath to protect the crown.

*/

let crown,
  crownX = 1,
  crownY = 1,
  crownA;
let bgm;
let bgR = 111,
  bgG = 156,
  bgB = 186;

let easing = 0.05;
let rippleArray = [];
let pastelColors = [
  "#fdfd96",
  "#77dd77",
  "#ff6961",
  "#84b6f4",
  "#fdcae1",
  "#b0c2f2",
  "#ffda9e",
  "#f6d1de",
  "#eb9cff",
  "#5086c1",
  "#e3b1c8",
  "#dfcae1",
  "#ecd6c0",
];

class PulsingCircle {
  constructor(x, y, hex, circleFade, circleSize, rippleFade, rippleSize) {
    this.x = x;
    this.y = y;
    this.hex = color(hex);

    this.circleA = 255;
    this.rippleA = 255;
    this.circleFade = circleFade; // default -15
    this.rippleFade = rippleFade; // default -12

    this.circleSize = circleSize;
    this.rippleSize = rippleSize;
  }

  update() {
    this.circleA += this.circleFade;
    this.hex.setAlpha(this.circleA);
    this.rippleA += this.rippleFade;
    this.rippleSize += 10;
  }

  display() {
    noStroke();
    fill(this.hex);
    circle(this.x, this.y, this.circleSize);
    stroke(0, 64, 128, this.rippleA);
    noFill();
    circle(this.x, this.y, this.rippleSize * 0.85);
  }
}

function preload() {
  soundFormats("mp3");
  // Load song
  bgm = loadSound("./assets/song.mp3");

  // Load crown asset
  crown = createImg("./assets/crown.gif");
  // Load dream sequence assets

  // Load present assets
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  crown.hide();
  noCursor();
  noFill();
  strokeWeight(1);
  crown.position(-100, 0);

  if (bgm.isLoaded && !bgm.isPlaying()) bgm.play();
}

// Act as update function to change based on song duration.
function draw() {
  background(bgR, bgG, bgB);

  // Fade to white
  if (bgm.currentTime() >= 110) {
    // set to 110
    if (bgR < 250) {
      bgR += 2;
    }
    if (bgG < 249) {
      bgG += 2;
    }
    if (bgB < 246) {
      bgB += 2;
    }
  }

  // Shows pulsing circles
  for (let i = 0; i < rippleArray.length; i++) {
    let r = rippleArray[i];
    r.update();
    r.display();
  }

  // Floating crown
  if (bgm.currentTime() >= 244) {
    crown.show();
    crownFloat();
  }
}

// Creates a new ripple when clicked
function mousePressed() {
  let c = random(pastelColors);
  let ripple;
  if (bgm.currentTime() <= 111) {
    // set 1 second after 110
    ripple = new PulsingCircle(mouseX, mouseY, c, -15, 100, -12, 100);
  }
  if (bgm.currentTime() > 111 && bgm.currentTime() <= 244) {
    ripple = new PulsingCircle(mouseX, mouseY, c, -12, 200, -6, 200);
  }
  rippleArray.push(ripple);
}

function crownFloat() {
  let targetX = mouseX;
  let dx = targetX - crownX;
  crownX += dx * easing;

  let targetY = mouseY;
  let dy = targetY - crownY;
  crownY += dy * easing;

  crown.size(70, 70);
  crown.position(crownX, crownY);
}

function Act1() {}

function Act2() {}

function Act3() {}
