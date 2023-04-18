let score;
let enemies;
let playerBullets, enemyBullets;
let obstacles;
let lives;
let player;

function setup() {
  createCanvas(windowWidth, windowHeight);

  score = 0;
  lives = 3;
  enemies = [];
  playerBullets = [];
  enemyBullets = [];
  obstacles = [];

  player = new Player();
}

function draw() {
  background(220);
}
