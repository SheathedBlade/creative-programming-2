let score;
let lives;
let balls = [];
let playerPaddles = [];
let computerPaddles = [];
let courts = [];
let pongSound, scoreSound, livesSound, gameOverSound;

function preload() {
  pongSound = loadSound("./assets/pong.wav");
  scoreSound = loadSound("./assets/score.wav");
  livesSound = loadSound("./assets/live.wav");
  gameOverSound = loadSound("./assets/gameOver.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  score = 0;
  lives = 3;
  balls = [];
  playerPaddles = [];
  computerPaddles = [];
  courts = [];

  courts.push(new Court(0, 500, height / 2, 0, height, 250));
}

function draw() {
  if (lives != 0) {
    background(220);

    fill(0);
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text("SCORE: " + score, 520, 20);
    text("LIVES: " + lives, 520, 40);

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
  } else {
    background(0);
    fill(255);
    textSize(50);
    noStroke();
    textAlign(CENTER);
    cursor();
    text("GAME OVER", width / 2, height / 4);
    text("Your final score is: " + score, width / 2, height / 2);
    text("Click anywhere to try again.", width / 2, height - height / 4);
  }
}

function mouseClicked() {
  if (lives == 0) {
    setup();
  }
}
