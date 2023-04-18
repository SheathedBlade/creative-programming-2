class PlayerPaddle {
  constructor(leftX, rightX, paddleX) {
    this.w = 100;
    this.h = 20;

    this.leftConstraint = leftX;
    this.rightConstraint = rightX;

    this.x = paddleX;
    this.y = height - this.h / 2;
  }
  update() {
    this.x = map(mouseX, 0, width, this.leftConstraint, this.rightConstraint);
  }
  display() {
    fill(0, 150, 255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
