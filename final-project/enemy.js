class Enemy {
  constructor() {
    this.position = createVector(
      width + width / 4,
      random(height / 8, height - height / 8)
    );
    this.angle = PI;
    this.isHit = false;
    this.speed;
  }

  update() {}

  display() {}
}

// Enemy's bullet should be targeting a snapshot of the position of player
class EnemyBullet extends Bullet {
  constructor(enemy, player) {
    this.bulletPos = enemy.position.copy();
    this.playerPos = player.position.copy();
  }

  update() {}

  display() {}
}
