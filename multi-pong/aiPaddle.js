class ComputerPaddle {
  constructor(leftX, rightX, paddleX, paddleY) {
    this.w = 100;
    this.h = 10;

    this.leftConstraint = leftX;
    this.rightConstraint = rightX;

    this.x = paddleX;
    this.y = paddleY + this.h * 3;

    this.computerPos = Array.apply(null, Array(10)).map(
      Number.prototype.valueOf,
      paddleX
    );
  }
  update(ball) {
    this.computerPos.push(ball.position.x);
    this.x = map(
      this.computerPos.shift(),
      this.leftConstraint,
      this.rightConstraint,
      this.leftConstraint + this.w / 2,
      this.rightConstraint - this.w / 2
    );
  }
  display() {
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
