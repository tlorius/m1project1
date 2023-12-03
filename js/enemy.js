class Enemy extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 3;
    this.left = 100;
    this.top = 100;
    this.height = 30;
    this.width = 30;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 0.4;
    this.pointsReceivedIfKilled = 1;

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
}
