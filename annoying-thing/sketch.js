let buttonXPos, buttonYPos;
let button, currTime, hasNudged;

let sfx1;

let buttonTexts = [
  "LMAO",
  "Click me?",
  "Can't catch me",
  "Skill issue",
  "How are you this bad?",
];

function preload() {
  soundFormats("mp3", "wav");
  sfx1 = loadSound("./assets/sounds/chewing.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currTime = millis();

  // Set up randomly located button on start
  buttonXPos = Math.random() * (windowWidth - 200);
  buttonYPos = Math.random() * (windowHeight - 100);
  button = createButton(buttonTexts[1]);
  button.mousePressed(playSound).position(buttonXPos, buttonYPos);
  hasNudged = false;
}

function draw() {
  background(220);

  if (
    Math.abs(buttonXPos - mouseX) < 150 &&
    Math.abs(buttonYPos - mouseY) < 150 &&
    hasNudged == false
  ) {
    nudgeButton();
  } else if (
    Math.abs(buttonXPos - mouseX) < 80 &&
    Math.abs(buttonYPos - mouseY) < 80 &&
    hasNudged == true
  )
    relocateButton();
}

// Relocate button if cursor is close to the button.
// Sometimes this function will work, sometimes it won't.
function relocateButton() {
  let chance = Math.random();
  if (chance <= 0.2) {
    buttonXPos = Math.random() * (windowWidth - 200);
    buttonYPos = Math.random() * (windowHeight - 100);
    button.position(buttonXPos, buttonYPos);
    button.html(
      buttonTexts[Math.round(Math.random() * (buttonTexts.length - 1))]
    );
    hasNudged = false;
  }
}

// Nudges the button away from the cursor first
function nudgeButton() {
  // buttonXPos = 0;
  // buttonYPos = 0;
  hasNudged = true;
}

// If button is clicked on, play annoying sound (randomly picked)
function playSound() {
  sfx1.play();
  buttonXPos = Math.random() * (windowWidth - 200);
  buttonYPos = Math.random() * (windowHeight - 100);
  button.position(buttonXPos, buttonYPos);
  button.html("Enjoy the sound");
}
