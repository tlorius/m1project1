class EnemyBoss extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 1337;
    this.maxHealth = this.health;
    this.top = 700;
    this.left = 230;
    this.height = 241;
    this.width = 308;
    this.speed = 0.2;
    this.pointsReceivedIfKilled = 50000;
    this.experienceIfKilled = 100;

    this.element.src = "images/enemy_boss.png";
    this.updateSize();
    this.setInitialPos();
  }
}
