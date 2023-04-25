class PlayerPaddle {
  constructor(leftX, rightX, paddleX, paddleY) {
    this.w = 100;
    this.h = 10;

    this.leftConstraint = leftX;
    this.rightConstraint = rightX;

    this.x = paddleX;
    this.y = paddleY - this.h * 3;
  }
  update() {
    this.x = map(
      mouseX,
      0,
      width,
      this.leftConstraint + this.w / 2 + 5,
      this.rightConstraint - this.w / 2 - 5
    );
  }
  display() {
    fill(0, 150, 255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
