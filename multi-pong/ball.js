class Ball {
  constructor(courtPosX) {
    this.dia = 20;
    this.respawnPoint = courtPosX;
    this.respawn(courtPosX);
  }
  update(player, computer) {
    this.position.add(this.speed);

    let hit = this.checkPlayerCollision(player);
    if (hit) {
      this.speed.y *= -1.01;
      this.speed.x += (this.position.x - player.x) / 20;
    }

    let compHit = this.checkComputerCollision(computer);
    if (compHit) {
      this.speed.y *= -1.01;
      this.speed.x += (this.position.x - computer.x) / 20;
    }

    if (this.position.y < 0) {
      this.respawn(this.respawnPoint);
      score++;
    }

    if (this.position.y > height) {
      this.respawn(this.respawnPoint);
      score--;
    }

    if (
      this.position.x < this.dia / 2 ||
      this.position.x > player.rightConstraint - this.dia / 2
    ) {
      this.speed.x *= -1;
    }
  }
  display() {
    fill(0);
    noStroke();
    circle(this.position.x, this.position.y, this.dia);
  }
  respawn(xPos) {
    this.position = createVector(xPos, height / 2);
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
      this.position.y + this.dia / 2 < c.y + c.h + c.h / 2 &&
      this.position.x > c.x - c.w / 2 &&
      this.position.x < c.x + c.w / 2 &&
      this.speed.y < 0
    ) {
      return true;
    }
    return false;
  }
}
