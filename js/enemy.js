class Enemy extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    //using 2 different randomized values so enemies that have the same spawnpoint wont always have the same HP
    this.healthSeed = Math.random();
    this.spawnSeed = Math.floor(Math.random() * 16);
    this.spawnPoints = [
      { left: -50, top: -50 },
      { left: -50, top: 150 },
      { left: -50, top: 300 },
      { left: -50, top: 450 },
      { left: -50, top: 630 },
      { left: 630, top: -50 },
      { left: 630, top: 150 },
      { left: 630, top: 300 },
      { left: 630, top: 450 },
      { left: 630, top: 630 },
      { left: 150, top: -50 },
      { left: 300, top: -50 },
      { left: 450, top: -50 },
      { left: 150, top: 630 },
      { left: 300, top: 630 },
      { left: 450, top: 630 },
    ];
    this.left = this.spawnPoints[this.spawnSeed].left;
    this.top = this.spawnPoints[this.spawnSeed].top;
    this.angleToPlayer = 0;
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
