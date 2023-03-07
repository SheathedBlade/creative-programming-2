// Song: E:verydaytor4 - Hiroyuki Sawano

/* 
The song is divided into 3 acts
1: Playfulness: Set in the present/future
2: Fairytale/Fantasy music, could be twisted into a nostalgic theme (dream sequence of nostalgia from ages past)
3: Royalty (as in like, Medieval royalty), oath to protect the crown.

*/

let crown;
let bgm;

function preload() {
  soundFormats("mp3");
  // Load song
  bgm = loadSound("./assets/song.mp3");

  // Load crown asset
  crown = createImg("./assets/crown.gif");
  // Load dream sequence assets

  // Load present assets

  // Load song as bgm
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Act as update function to change based on song duration.

function draw() {
  background(111, 156, 186);
  crown.position(width / 2, height / 2);
  crown.size(width / 5, height / 5);
}

function Act1() {}

function Act2() {}

function Act3() {}
