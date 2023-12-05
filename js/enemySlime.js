class EnemySlime extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = Math.ceil(this.healthSeed * 4);
    this.height = 10 + 7.5 * this.health;
    this.width = 10 + 7.5 * this.health;
    this.speed = 0.4;
    this.pointsReceivedIfKilled = 10;
    this.experienceIfKilled = 5;

    this.element.src = "images/enemy_slime.png";
    this.updateSize();
    this.setInitialPos();
  }

  updateSizeBasedOnNewHealth() {
    this.height = 10 + 7.5 * this.health;
    this.width = 10 + 7.5 * this.health;
    this.updateSize();
  }
}
//find a way to update enemy size everytime they are hit
