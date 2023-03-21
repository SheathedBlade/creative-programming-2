// Song: E:verydaytor4 - Hiroyuki Sawano

/* 
The song is divided into 3 acts
1: Playfulness: Set in the present/future (start to 110)
2: Fairytale/Fantasy music, could be twisted into a nostalgic theme (dream sequence of nostalgia from ages past) (110 to 244)
3: Royalty (as in like, Medieval royalty), oath to protect the crown. (244 to end)

*/

let crown,
  crownX,
  crownY,
  crownT = 0;
let bgm;
let bgR = 111,
  bgG = 156,
  bgB = 186;
let endcard,
  alpha = 0;
let rippleArray = [],
  rectangleArray = [],
  goldArray = [],
  pinkArray = [],
  confetti = [];

let h, w;

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

class FallingRectangle {
  constructor(rectWidth, rectHeight, hex, rippleSize, rippleFade) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.hex = color(hex);

    this.x = random(0, windowWidth);
    this.y = -100;
    this.speed = 0;

    this.rectA = 0;
    this.rippleA = 255;

    this.rippleSize = rippleSize;
    this.rippleFade = rippleFade;
  }

  update() {
    // Gravity
    this.speed += 0.5;
    this.y += this.speed;

    // Fade in
    this.hex.setAlpha(this.rectA);
    this.rectA += this.speed * 0.5;

    // Activate ripple
    if (this.y > windowHeight - 50) {
      this.rippleA += this.rippleFade;
      this.rippleSize += 10;
    }
  }

  display() {
    noStroke();
    fill(this.hex);
    rect(this.x, this.y, this.rectWidth, this.rectHeight);

    // If it hits the bottom of the screen, activate ripple
    if (this.y > windowHeight - 50) {
      stroke(0, 64, 128, this.rippleA);
      noFill();
      circle(this.x, windowHeight, this.rippleSize * 0.85);
    }
  }
}

class GoldButterfly {
  constructor(y, direction) {
    this.direction = direction;
    if (this.direction == "left") {
      this.x = windowWidth + 70;
      this.speed = -5;
      this.butterfly = createImg("./assets/butterfly.gif");
    } else if (this.direction == "right") {
      this.x = -70;
      this.speed = 5;
      this.butterfly = createImg("./assets/butterfly-rot.gif");
    }

    this.y = 0;
    this.amp = y;
    this.t = 0;
  }

  update() {
    this.x += this.speed;
    this.y = sin(this.t) * 30 + this.amp;
    this.t += 0.07;

    // removes image to free resources
    if (this.x < -80 || this.x > windowWidth + 80) this.butterfly.remove();
  }

  display() {
    this.butterfly.size(50, 50);
    this.butterfly.position(this.x, this.y);
  }
}

class PinkButterfly {
  constructor(y, direction) {
    this.direction = direction;
    if (this.direction == "left") {
      this.x = windowWidth + 70;
      this.speed = -10;
      this.butterfly = createImg("./assets/butterfly2.gif");
    } else if (this.direction == "right") {
      this.x = -70;
      this.speed = 10;
      this.butterfly = createImg("./assets/butterfly2-rot.gif");
    }

    this.y = 0;
    this.amp = y;
    this.t = 0;
  }

  update() {
    this.x += this.speed;
    this.y = sin(this.t) * 30 + this.amp;
    this.t += 0.1;

    // removes image to free resources
    if (this.x < -80 || this.x > windowWidth + 80) this.butterfly.remove();
  }

  display() {
    this.butterfly.size(50, 50);
    this.butterfly.position(this.x, this.y);
  }
}

class Confetti {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.speed = _s;
    this.time = random(0, 100);
    this.color = random(pastelColors);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(width / 25, height / 50);
    this.form = round(random(0, 1));
  }

  display() {
    fill(this.color);
    // blendMode(SCREEN);
    noStroke();
    push();
    translate(this.x, this.y);
    translate(
      this.amp * sin(this.time * this.phase),
      this.speed * cos(2 * this.time * this.phase)
    );
    rotate(this.time);
    rectMode(CENTER);
    scale(cos(this.time / 4), sin(this.time / 4));
    if (this.form === 0) {
      rect(0, 0, this.size, this.size / 2);
    } else {
      ellipse(0, 0, this.size);
    }
    pop();

    this.time = this.time + 0.1;

    this.speed += 1 / 200;

    this.y += this.speed;
  }
}

function preload() {
  soundFormats("mp3");
  // Load song
  bgm = loadSound("./assets/song.mp3");
  // Load crown asset
  crown = createImg("./assets/crown.gif");
  // Load dream sequence assets
  butterfly = loadImage("./assets/butterfly.gif");
  butterfly2 = loadImage("./assets/butterfly2.gif");
  // Load end card
  endcard = loadImage("./assets/torn.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  crown.hide();
  noCursor();
  noFill();
  strokeWeight(1);

  crownY = height / 2;
  crown.position(-70, crownY);

  for (let i = 0; i < 100; i++) {
    confetti[i] = new Confetti(
      random(0, width),
      random(-height, 0),
      random(-1, 1)
    );
  }

  if (bgm.isLoaded && !bgm.isPlaying()) bgm.play();
}

// Act as update function to change based on song duration.
function draw() {
  background(bgR, bgG, bgB);

  // Fade to black
  if (bgm.currentTime() >= 54 && bgm.currentTime() < 65) {
    if (bgR > 0) {
      bgR -= 2;
    }
    if (bgG > 0) {
      bgG -= 2;
    }
    if (bgB > 0) {
      bgB -= 2;
    }
  }

  // Fade to original color
  if (bgm.currentTime() >= 65 && bgm.currentTime() < 110) {
    if (bgR < 111) {
      bgR += 2;
    }
    if (bgG < 156) {
      bgG += 2;
    }
    if (bgB < 186) {
      bgB += 2;
    }
  }

  // Fade to white
  if (bgm.currentTime() >= 110 && bgm.currentTime() < 244) {
    // set to 110 seconds
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

  // Floating crown and fade to sunset
  if (bgm.currentTime() >= 244 && bgm.currentTime() < 318) {
    crown.show();
    crownRender();

    if (bgR > 250) {
      bgR -= 1;
    }
    if (bgG > 145) {
      bgG -= 2;
    }
    if (bgB > 128) {
      bgB -= 2;
    }

    for (let i = 0; i < confetti.length / 2; i++) {
      confetti[i].display();
      if (confetti[i].y > height)
        confetti[i] = new Confetti(
          random(0, width),
          random(-height, 0),
          random(-1, 1)
        );
    }

    for (let i = int(confetti.length / 2); i < confetti.length; i++) {
      confetti[i].display();

      if (confetti[i].y > height) {
        confetti[i] = new Confetti(
          random(0, width),
          random(-height, 0),
          random(-1, 1)
        );
      }
    }
  }

  // Fade to black
  if (bgm.currentTime() > 318) {
    if (bgR > 0) {
      bgR -= 2;
    }
    if (bgG > 0) {
      bgG -= 2;
    }
    if (bgB > 0) {
      bgB -= 2;
    }

    if (bgR <= 0 && bgB <= 0 && bgB <= 0) {
      endRender();
    }
  }

  // Shows pulsing circles
  for (let i = 0; i < rippleArray.length; i++) {
    let r = rippleArray[i];
    r.update();
    r.display();
  }

  // Shows falling rectangles
  for (let i = 0; i < rectangleArray.length; i++) {
    let r = rectangleArray[i];
    r.update();
    r.display();
  }

  // Shows gold butterflies
  for (let i = 0; i < goldArray.length; i++) {
    let g = goldArray[i];
    g.update();
    g.display();
  }

  // Shows pink butterflies
  for (let i = 0; i < pinkArray.length; i++) {
    let p = pinkArray[i];
    p.update();
    p.display();
  }
}

function keyPressed() {
  // K key - pulses
  if (keyCode == 75) {
    let c = random(pastelColors);
    let ripple;
    if (bgm.currentTime() <= 111) {
      // set 1 second after 110
      ripple = new PulsingCircle(
        random(50, windowWidth - 50),
        random(50, windowHeight - 50),
        c,
        -15,
        100,
        -12,
        100
      );
    }
    if (bgm.currentTime() > 111) {
      ripple = new PulsingCircle(
        random(50, windowWidth - 50),
        random(50, windowHeight - 50),
        c,
        -12,
        200,
        -6,
        200
      );
    }
    rippleArray.push(ripple);
  }
  // E key - rects
  else if (keyCode == 69) {
    let c = random(pastelColors);
    let rect = new FallingRectangle(30, 100, c, 200, -9);
    rectangleArray.push(rect);
  }
  // Q key - golds
  else if (keyCode == 81) {
    let dir = random(100) < 50 ? "left" : "right";
    let y = random(150, height - height / 2);
    let g = new GoldButterfly(y, dir);
    goldArray.push(g);
  }
  // W key - pinks
  else if (keyCode == 87) {
    let dir = random(100) < 50 ? "left" : "right";
    let y = random(500, height - height / 4);
    let p = new PinkButterfly(y, dir);
    pinkArray.push(p);
  }
  // L key - gongs
  else if (keyCode == 76) {
    let c = random(pastelColors);
    let ripple = new PulsingCircle(
      windowWidth / 2,
      windowHeight / 2,
      c,
      -4,
      400,
      -4,
      400
    );
    rippleArray.push(ripple);
  }
}

// Renders the crown
function crownRender() {
  let time = bgm.currentTime();

  // Set to 244 to 318
  crownX = map(time, 244, 318, -70, windowWidth + 70);
  crownY = sin(crownT) * 150 + height / 2;

  crown.size(70, 70);
  crown.position(crownX, crownY);
  crownT += 0.008;
}

// Renders end card
function endRender() {
  alpha++;
  tint(255, alpha);

  if (endcard.height > endcard.width) {
    let hRatio = height / endcard.height;
    h = endcard.height * hRatio;
    w = endcard.width * hRatio;
    image(endcard, width / 2, height / 2, w, h);
  } else if (endcard.width > endcard.height) {
    let wRatio = width / endcard.width;
    h = endcard.height * wRatio;
    w = endcard.width * wRatio;
    image(endcard, width / 2, height / 2, w, h);
  } else image(endcard, width / 2, height / 2, windowWidth, windowHeight);
}
