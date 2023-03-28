let img, img2, img3, img4, ui;

function preload() {
  img = loadImage("./assets/Sunset.jpg");
  img2 = loadImage("./assets/xd.jpg");
  img3 = loadImage("./assets/astro.jpg");
  img4 = loadImage("./assets/space.jpg");
  ui = loadImage("./assets/TikTokOverlay.png");
}

function setup() {
  createCanvas(img3.width, img3.height);
  //duotone(img, color("#98eb34"), color("#3471eb"));
  filterSystemOne(img4);
  //filterSystemTwo(img3);
  //image(ui, 0, 0);
}

function threshold(img, cutoff) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let px = img.get(j, i);
      let r = px[0];
      let g = px[1];
      let b = px[2];

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      //? Threshold
      if (bright < cutoff) img.set(j, i, color(0));
      else img.set(j, i, color(255));
    }
  }

  img.updatePixels();
}

function duotone(img, light, dark) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let px = img.get(j, i);
      let r = px[0];
      let g = px[1];
      let b = px[2];

      let bright = map(0.2126 * r + 0.7152 * g + 0.0722 * b, 0, 255, 0, 1);
      img.set(j, i, lerpColor(light, dark, bright));
    }
  }

  img.updatePixels();
}

function tritone(img, color1, color2, color3) {
  img.loadPixels();

  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let px = img.get(j, i);
      let r = px[0];
      let g = px[1];
      let b = px[2];

      let bright = map(0.2126 * r + 0.7152 * g + 0.0722 * b, 0, 255, 0, 1);
      if (bright > 0.5) img.set(j, i, lerpColor(color1, color2, bright));
      else img.set(j, i, lerpColor(color2, color3, bright));
    }
  }

  img.updatePixels();
}

function halftone(
  img,
  constrainR,
  constrainG,
  constrainB,
  constrainHeight,
  minSize,
  maxSize,
  step
) {
  img.loadPixels();
  for (let i = 0; i < img.height; i += step) {
    for (let j = 0; j < img.width; j += step) {
      let px = img.get(j, i);
      let r = px[0];
      let g = px[1];
      let b = px[2];
      if (g > constrainG || b > constrainB || r > constrainR) continue;
      if (i > constrainHeight) continue;

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
      let px = img.get(j, i);
      let r = px[0];
      let g = px[1];
      let b = px[2];

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (bright > highCutoff) img.set(j, i, color(255));
      else if (bright < lowCutoff) img.set(j, i, color(0));
      else img.set(j, i, midtone);
    }
  }

  img.updatePixels();
}

function filterSystemOne(img) {
  tritone(img, color("#ffc414"), color("#d12a2a"), color("#6b0a59"));
  image(img, 0, 0);
  //filter(BLUR, 4);
  halftone(img, 180, 90, 60, img.height, 0, 20, 20);
}

function filterSystemTwo(img) {
  thresholdTritone(img, 200, 100, color(255, 0, 0));
  image(img, 0, 0);
  halftone(img, 0, 0, 0, img.height / 2 - 100, 5, 10, 20);
}
