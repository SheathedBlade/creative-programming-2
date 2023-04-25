let score = 0;
let balls = [];
let playerPaddles = [];
let computerPaddles = [];
let pongSound;

function preload() {
  pongSound = loadSound("./assets/pong.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  balls.push(new Ball(250));
  playerPaddles.push(new PlayerPaddle(0, 500, 250));
  computerPaddles.push(new ComputerPaddle(0, 500, 250));
}

function draw() {
  background(220);

  fill(0);
  noStroke();
  text("SCORE: " + score, 15, 20);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update(playerPaddles[i], computerPaddles[i]);
    balls[i].display();

    playerPaddles[i].update();
    playerPaddles[i].display();

    computerPaddles[i].update(balls[i]);
    computerPaddles[i].display();
  }
}
