class Ball {
  constructor(courtPos) {
    this.dia = 10;
    this.respawnPoint = courtPos;
    this.respawn(courtPos);
  }
  update(
    player,
    computer,
    leftWallPos,
    rightWallPos,
    topWallPos,
    bottomWallPos
  ) {
    this.position.add(this.speed);

    if (this.position.y + this.dia / 2 <= player.y + player.h / 2) {
      let hit = this.checkPlayerCollision(player);
      if (hit) {
        this.speed.y *= -1.01;
        this.speed.x += (this.position.x - player.x) / 20;
      }
    } else {
      if (this.position.y + this.dia / 2 > bottomWallPos.y - player.h / 2) {
        this.respawn(this.respawnPoint);
        score--;
      }
    }

    if (this.position.y - this.dia / 2 >= computer.y - computer.h / 2) {
      let compHit = this.checkComputerCollision(computer);
      if (compHit) {
        this.speed.y *= -1.01;
        this.speed.x += (this.position.x - computer.x) / 20;
      }
    } else {
      if (this.position.y - this.dia / 2 < topWallPos.y + computer.h / 2) {
        this.respawn(this.respawnPoint);
        score++;
      }
    }

    if (
      this.position.x < leftWallPos.x + this.dia / 2 + 5 ||
      this.position.x > rightWallPos.x - this.dia / 2 - 5
    ) {
      this.speed.x *= -1;
    }
  }
  display() {
    fill(0);
    noStroke();
    circle(this.position.x, this.position.y, this.dia);
  }
  respawn(posVec) {
    this.position = createVector(posVec.x, posVec.y);
    this.speed = createVector(random(-5, 5), random(2, 5));
  }

  checkPlayerCollision(p) {
    if (
      this.position.y + this.dia / 2 > p.y - p.h / 2 &&
      this.position.x > p.x - p.w / 2 &&
      this.position.x < p.x + p.w / 2 &&
      this.speed.y > 0
    ) {
      return true;
    }
    return false;
  }
  checkComputerCollision(c) {
    if (
      this.position.y + this.dia / 2 < c.y + c.h * 2 &&
      this.position.x > c.x - c.w / 2 &&
      this.position.x < c.x + c.w / 2 &&
      this.speed.y < 0
    ) {
      return true;
    }
    return false;
  }
}
