class EnemyBat extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = Math.ceil(this.healthSeed * 3);
    this.height = 22.44 + 6.28 * this.health;
    this.width = 25 + 7 * this.health;
    this.speed = 120;
    this.pointsReceivedIfKilled = 250 + 100 * this.health;
    this.experienceIfKilled = 10 + this.health;

    this.element.src = "images/enemy_bat.png";
    this.updateSize();
    this.setInitialPos();
  }

  updateSizeBasedOnNewHealth() {
    this.height = 22.44 + 6.28 * this.health;
    this.width = 25 + 7 * this.health;
    this.updateSize();
  }
}
