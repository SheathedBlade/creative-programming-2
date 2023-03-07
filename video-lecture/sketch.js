let video;
let angle = 0;
let w, h;
let dimsLoaded = false;

function preload() {
  video = createVideo("./assets/ceiling.mp4");
  video.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video.loop();
  video.volume(0);
}

function draw() {
  background(220);

  if (video.loadedmetadata && !dimsLoaded) {
    let aspectRatio = video.height / video.width;
    w = width / 2;
    h = w * aspectRatio;
    dimsLoaded = true;
  }

  image(video, 0, 0, w, h);

  let playbackPos = map(video.time(), 0, video.duration(), 0, width);

  stroke(0);
  strokeWeight(8);
  line(playbackPos, height / 2, playbackPos, height / 2 + 20);

  let speed = map(mouseY, 0, height, 0.5, 5);
  video.speed(speed);

  // for (let i = 0; i < height; i += h) {
  //   for (let j = 0; j < width; j += w) {
  //     image(video, j, i, w, h);
  //   }
  // }

  // push();
  // translate(width, 0);
  // scale(-1, 1);
  // image(video, width / 2, 0, w, h);
  // pop();

  // push();
  // translate(width / 2, height / 2);
  // rotate(angle);
  // fill(255);
  // circle(0, -50, 30);
  // circle(50, 0, 30);
  // circle(0, 50, 30);
  // circle(-50, 0, 30);
  // pop();
  // angle += radians(2);
}

function keyPressed() {
  let t = random(0, video.duration());
  video.time(t);
}
