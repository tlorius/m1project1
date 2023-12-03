class Enemy extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 3;
    this.spawnSeed = Math.floor(Math.random() * 16);
    this.spawnPointsLeft = [
      -50, -50, -50, -50, -50, 630, 630, 630, 630, 630, 150, 300, 450, 150, 300,
      450,
    ];
    this.spawnPointsTop = [
      -50, 150, 300, 450, 630, -50, 150, 300, 450, 630, -50, -50, -50, 630, 630,
      630,
    ];
    this.left = this.spawnPointsLeft[this.spawnSeed];
    this.top = this.spawnPointsTop[this.spawnSeed];
    this.height = 30;
    this.width = 30;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 0.4;
    this.pointsReceivedIfKilled = 10;
    this.angleToPlayer = 0;

    this.element.src = "./images/enemy_regular_monster.png";
    this.setSizeAndPos();
  }

  diedFromReceivedDamage(damage) {
    this.health = this.health - damage;
    if (this.health <= 0) {
      return true;
    } else {
      return false;
    }
  }

  trackPlayerPosition(playerTop, playerLeft, playerHeight, playerWidth) {
    let distanceToPlayer = { distTop: 0, distLeft: 0 };
    // playertop + height takes the centerpoint of the player and calculates the distance to the centerpoint of the enemy
    distanceToPlayer.distTop =
      playerTop + playerHeight / 2 - (this.top + this.height / 2);
    distanceToPlayer.distLeft =
      playerLeft + playerWidth / 2 - (this.left + this.width / 2);

    this.angleToPlayer = Math.atan2(
      distanceToPlayer.distTop,
      distanceToPlayer.distLeft
    );
  }

  //math to calculate new position based on the calculated angle
  move() {
    this.left += Math.cos(this.angleToPlayer) * this.speed;
    this.top += Math.sin(this.angleToPlayer) * this.speed;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
