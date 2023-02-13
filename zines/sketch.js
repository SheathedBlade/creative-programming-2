let angle = 1;
let r, rw, g, gw, b, bw;
let italianFont;

let wordBox = [
  "PIZZA",
  "HUNGRY",
  "CHEESE",
  "PEPPERONI",
  "SPINACH",
  "SAUSAGE",
  "BREAD",
];

function preload() {
  italianFont = loadFont("./assets/Italiana-Regular.ttf");
}

function setup() {
  createCanvas(792, 1224);
  r = Math.round(Math.random() * 255);
  g = Math.round(Math.random() * 255);
  b = Math.round(Math.random() * 255);
  rw = Math.round(Math.random() * 255);
  gw = Math.round(Math.random() * 255);
  bw = Math.round(Math.random() * 255);

  textFont(italianFont);
  textAlign(CENTER, CENTER);

  noLoop();
}

function draw() {
  background(r, g, b);

  // text goes here
  textSize(200);
  textStyle(BOLD);
  for (let i = 0; i < 6; i++) {
    text(
      wordBox[Math.round(Math.random() * (wordBox.length - 1))],
      width / 2,
      i * 215 + 50
    );
  }

  for (let i = 0; i < 3; i++) {
    push();
    translate((width / 2) * i, (height / 2) * i);
    rotate(angle);
    fill(255);
    noStroke();
    rectMode(CENTER);
    square(0, 0, 200);
    pop();

    for (let a = 0; a < radians(360); a += radians(15)) {
      push();
      translate((width / 2) * i, (height / 2) * i);
      rotate(a);
      translate(0, 200);
      rotate(angle);
      noStroke();
      rectMode(CENTER);
      square(0, 0, 50);
      pop();
    }

    for (let b = 0; b < radians(360); b += radians(7)) {
      push();
      translate((width / 2) * i, (height / 2) * i);
      rotate(b);
      translate(0, 300);
      rotate(-angle);
      rectMode(CENTER);
      fill("red");
      noStroke();
      square(0, 0, 50);
      fill("green");
      triangle(0, 0, 25, 25, -25, 25);
      pop();
    }
  }

  angle += radians(Math.random() * 4);

  noFill();
  stroke(255);

  for (let i = 0; i < 3; i++) {
    translate((width / 2) * i, (height / 2) * i);

    for (let i = 0; i < 200; i++) {
      push();
      rotate(sin(frameCount + i) * PI * 100);

      stroke(rw, gw, bw);
      strokeWeight(1);
      rect(0, 100, 700 - i * 3.5, 700 - i * 3.5, 200 - i);
      pop();
    }

    let ang1 = noise(0.01 * frameCount + 10);
    let ang2 = noise(0.01 * frameCount + 20);
    let ang3 = noise(0.01 * frameCount + 30);
    let rx = 60 * noise(0.01 * frameCount + 40);
    let tx = 400 * noise(0.01 * frameCount + 50);
    let size1 = 200 * noise(0.01 * frameCount + 60);
    let size2 = 50 * noise(0.01 * frameCount + 60);

    for (let i = 0; i < 8; i++) {
      push();
      rotate(ang1 + (TWO_PI * i) / 8);
      translate(tx, 0);
      fill(152, 80, 49);
      stroke(152, 80, 49, 150);
      rect(0, 0, size1, size1);
      for (let j = 0; j < 6; j++) {
        push();
        rotate(ang2 + (TWO_PI * j) / 6);
        translate(rx, 0);
        rotate(ang3);
        fill(13, 195, 19, 40);
        stroke(13, 195, 19, 100);
        rect(rx, 0, size2, size2);
        pop();
      }
      translate();
      pop();
    }
  }
  save();
}
