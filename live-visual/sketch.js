// Song: E:verydaytor4 - Hiroyuki Sawano

/* 
The song is divided into 3 acts
1: Playfulness: Set in the present/future
2: Fairytale/Fantasy music, could be twisted into a nostalgic theme (dream sequence of nostalgia from ages past)
3: Royalty (as in like, Medieval royalty), oath to protect the crown.

*/

let crown,
  crownX = 1,
  crownY = 1;
let bgm;

let easing = 0.05;
let rippleArray = [];

class PulsingCircle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;

    this.circleA = 255;
    this.rippleA = 255;
    this.circleFade = -15;
    this.rippleFade = -12;

    this.done = false;
    this.circleSize = 100;
  }

  update() {
    this.circleA += this.circleFade;
    this.rippleA += this.rippleFade;
    this.circleSize += 10;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.circleA);
    circle(this.x, this.y, 100);
    stroke(0, 64, 128, this.rippleA);
    noFill();
    circle(this.x, this.y, this.circleSize * 0.75);
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

  if (bgm.isLoaded && !bgm.isPlaying()) bgm.play();
}

// Act as update function to change based on song duration.

function draw() {
  background(111, 156, 186);

  for (let i = 0; i < rippleArray.length; i++) {
    let r = rippleArray[i];
    r.update();
    r.display();
  }

  // Floating crown
  if (bgm.duration() >= 800) {
    crown.show();
    crownFloat();
  }
}

function mousePressed() {
  let ripple = new PulsingCircle(
    mouseX,
    mouseY,
    random(255),
    random(255),
    random(200)
  );
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
