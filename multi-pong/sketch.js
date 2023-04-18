let score = 0;
let courts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  courts.push(new Court(0, 500, height / 2, 0, height, 250));
}

function draw() {
  background(220);

  fill(0);
  noStroke();
  text("SCORE: " + score, 520, 20);

  for (let i = 0; i < courts.length; i++) {
    courts[i].update();
    courts[i].display();
  }

  if (score == 5 && courts.length == 1) {
    courts.push(
      new Court(600, 1080, height / 4, 0, height / 2, (1080 + 600) / 2)
    );
  }

  if (score == 10 && courts.length == 2) {
    courts.push(
      new Court(
        700,
        1200,
        height - height / 4 + 10,
        height / 2 + 20,
        height,
        950
      )
    );
  }
}
