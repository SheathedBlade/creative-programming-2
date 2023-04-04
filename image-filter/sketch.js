let ui;
let numFrames = 1,
  whichFrame = 0,
  frames,
  capture;

function preload() {
  frames = [];
  for (let i = 1; i <= numFrames; i++) {
    let filename = "input/" + nf(i, 6) + ".png";
    let frame = loadImage(filename);
    frames.push(frame);
  }

  ui = loadImage("./assets/TikTokOverlay.png");
}

function setup() {
  let canvas = createCanvas(1080, 1920);
  canvas.id("canvas");

  capture = new CCapture({
    format: "png",
    name: "output",
  });
}

function draw() {
  if (whichFrame === 0) capture.start();
  console.log("- " + whichFrame + "/" + frames.length);

  // overlay
  image(ui, 0, 0);
  capture.capture(document.getElementById("canvas"));
  whichFrame++;
  if (whichFrame === frames.length) {
    capture.stop();
    capture.save();
    noLoop();
  }
}

function threshold(img, cutoff) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let index = (i * img.width + j) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      //? Threshold
      if (bright < cutoff) {
        img.pixels[index] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
      } else {
        img.pixels[index] = 255;
        img.pixels[index + 1] = 255;
        img.pixels[index + 2] = 255;
      }
    }
  }

  img.updatePixels();
}

function duotone(img, light, dark) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let index = (i * img.width + j) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = map(0.2126 * r + 0.7152 * g + 0.0722 * b, 0, 255, 0, 1);

      let lerp = lerpColor(light, dark, bright);
      img.pixels[index] = lerp.levels[0];
      img.pixels[index + 1] = lerp.levels[1];
      img.pixels[index + 2] = lerp.levels[2];
    }
  }

  img.updatePixels();
}

function tritone(img, color1, color2, color3) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let lerp;
      let index = (i * img.width + j) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = map(0.2126 * r + 0.7152 * g + 0.0722 * b, 0, 255, 0, 1);

      if (bright > 0.5) lerp = lerpColor(color1, color2, bright);
      else lerp = lerpColor(color2, color3, bright);

      img.pixels[index] = lerp.levels[0];
      img.pixels[index + 1] = lerp.levels[1];
      img.pixels[index + 2] = lerp.levels[2];
    }
  }

  img.updatePixels();
}

function halftone(img, constraints, minSize, maxSize, step) {
  img.loadPixels();
  for (let i = 0; i < img.height; i += step) {
    for (let j = 0; j < img.width; j += step) {
      let index = (i * img.width + j) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      if (g > constraints[1] || b > constraints[2] || r > constraints[0])
        continue;
      if (i > constraints[3]) continue;

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      let dia = map(bright, 0, 255, minSize, maxSize);
      let alpha = map(i, 0, img.height, 100, 230);
      fill(255, alpha);
      noStroke();
      circle(j, i, dia);
    }
  }
}

function thresholdTritone(img, highCutoff, lowCutoff, midtone) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let index = (i * img.width + j) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (bright > highCutoff) {
        img.pixels[index] = 255;
        img.pixels[index + 1] = 255;
        img.pixels[index + 2] = 255;
      } else if (bright < lowCutoff) {
        img.pixels[index] = 0;
        img.pixels[index + 1] = 0;
        img.pixels[index + 2] = 0;
      } else {
        img.pixels[index] = midtone[0];
        img.pixels[index + 1] = midtone[1];
        img.pixels[index + 2] = midtone[2];
      }
    }
  }

  img.updatePixels();
}

function filterSystemOne(img) {
  tritone(img, color("#ffc414"), color("#d12a2a"), color("#6b0a59"));
  image(img, 0, 0);
  //filter(BLUR, 4);
  halftone(img, [180, 90, 60, img.height], 0, 20, 20);
}

function filterSystemTwo(img) {
  thresholdTritone(img, 200, 100, [255, 0, 0]);
  image(img, 0, 0);
  halftone(img, [0, 0, 0, img.height / 2 - 100], 5, 10, 20);
}
