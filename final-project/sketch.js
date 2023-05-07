let score;
let enemies;
let playerBullets, enemyBullets;
let obstacles;
let lives;
let player;
let drifter;

function preload() {
  drifter = loadImage("./drifter.gif");
}

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
  image(drifter, 100, 50, 200, 200);
}
