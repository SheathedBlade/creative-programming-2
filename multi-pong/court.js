class Court {
  constructor(leftX, rightX, verticalY, topY, bottomY, horizontalX) {
    this.ball = new Ball(createVector(horizontalX, verticalY));
    this.player = new PlayerPaddle(leftX, rightX, horizontalX, bottomY);
    this.computer = new ComputerPaddle(leftX, rightX, horizontalX, topY);

    this.leftWallPos = createVector(leftX, verticalY);
    this.rightWallPos = createVector(rightX, verticalY);
    this.topWallPos = createVector(horizontalX, topY);
    this.bottomWallPos = createVector(horizontalX, bottomY);

    this.horizontalSize = createVector(
      dist(
        this.leftWallPos.x,
        this.leftWallPos.y,
        this.rightWallPos.x,
        this.rightWallPos.y
      ),
      5
    );
    this.verticalSize = createVector(
      5,
      dist(
        this.topWallPos.x,
        this.topWallPos.y,
        this.bottomWallPos.x,
        this.bottomWallPos.y
      )
    );
  }
  update() {
    this.ball.update(
      this.player,
      this.computer,
      this.leftWallPos,
      this.rightWallPos,
      this.topWallPos,
      this.bottomWallPos
    );
    this.ball.display();

    this.player.update();
    this.player.display();

    this.computer.update(this.ball);
    this.computer.display();
  }
  display() {
    fill(150, 255, 150);
    noStroke();
    rectMode(CENTER);

    // left wall
    rect(
      this.leftWallPos.x + this.verticalSize.x / 2,
      this.leftWallPos.y,
      this.verticalSize.x,
      this.verticalSize.y
    );
    // right wall
    rect(
      this.rightWallPos.x - this.verticalSize.x / 2,
      this.rightWallPos.y,
      this.verticalSize.x,
      this.verticalSize.y
    );
    // top wall
    rect(
      this.topWallPos.x,
      this.topWallPos.y,
      this.horizontalSize.x,
      this.horizontalSize.y
    );
    // bottom wall
    rect(
      this.bottomWallPos.x,
      this.bottomWallPos.y,
      this.horizontalSize.x,
      this.horizontalSize.y
    );
  }
}
