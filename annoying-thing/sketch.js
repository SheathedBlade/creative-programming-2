let buttonXPos, buttonYPos;
let button, currTime;

let sfx1, sfx2, sfx3, sfx4, bg, bg2;
let r, g, b;

let buttonTexts = [
  "LMAO",
  "Click me?",
  "Can't catch me lol",
  "Skill issue",
  "How are you this bad?",
];

let annoyingSounds = [];

function preload() {
  soundFormats("mp3", "wav");
  sfx1 = loadSound("./assets/sounds/chewing.mp3");
  bg = loadSound("./assets/sounds/screaming.wav");
  bg2 = loadSound("./assets/sounds/beaver.wav");
  sfx2 = loadSound("./assets/sounds/ringing.mp3");
  sfx3 = loadSound("./assets/sounds/alarm.mp3");
  sfx4 = loadSound("./assets/sounds/crowd_boo.wav");

  annoyingSounds.push(sfx1, sfx2, sfx3);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set up randomly located button on start
  buttonXPos = Math.random() * (windowWidth - 200);
  buttonYPos = Math.random() * (windowHeight - 100);
  button = createButton(buttonTexts[1]);
  button.mousePressed(playSound).position(buttonXPos, buttonYPos);

  bg.setVolume(1);
  bg2.setVolume(1);
  sfx1.setVolume(50);
  sfx2.setVolume(2);
  sfx3.setVolume(2);

  r = Math.round(Math.random() * 100);
  g = Math.round(Math.random() * 100);
  b = Math.round(Math.random() * 100);
}

function draw() {
  currTime = millis();
  if (Math.round(currTime) % 25 == 0) {
    r = Math.round(Math.random() * 100);
    g = Math.round(Math.random() * 100);
    b = Math.round(Math.random() * 100);
  }
  background(r, g, b);

  // Play bg is it's not already playing
  if (!bg.isPlaying()) bg.loop();
  if (!bg2.isPlaying()) bg2.loop();

  if (
    Math.abs(buttonXPos - mouseX) < 150 &&
    Math.abs(buttonYPos - mouseY) < 150
  )
    relocateButton();
}

// Relocate button if cursor is close to the button.
// Sometimes this function will work, sometimes it won't.
function relocateButton() {
  let chance = Math.random();
  if (chance <= 0.6) {
    buttonXPos = Math.random() * (windowWidth - 200);
    buttonYPos = Math.random() * (windowHeight - 100);
    button.position(buttonXPos, buttonYPos);
    button.html(
      buttonTexts[Math.round(Math.random() * (buttonTexts.length - 1))]
    );
    if (!sfx4.isPlaying()) sfx4.play();
  }
}

// If button is clicked on, play annoying sound (randomly picked)
function playSound() {
  annoyingSounds[Math.floor(Math.random() * annoyingSounds.length)].play();
  buttonXPos = Math.random() * (windowWidth - 200);
  buttonYPos = Math.random() * (windowHeight - 100);
  button.position(buttonXPos, buttonYPos);
  button.html("Enjoy the sound");
}
