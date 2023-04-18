class ComputerPaddle {
  constructor(leftX, rightX, paddleX) {
    this.w = 100;
    this.h = 20;

    this.leftConstraint = leftX;
    this.rightConstraint = rightX;

    this.x = paddleX;
    this.y = this.h / 2;

    this.computerPos = Array.apply(null, Array(10)).map(
      Number.prototype.valueOf,
      paddleX
    );
  }
  update(ball) {
    this.computerPos.push(ball.position.x);
    this.x = this.computerPos.shift();
  }
  display() {
    fill(255, 150, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
