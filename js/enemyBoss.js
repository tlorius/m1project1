class EnemyBoss extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 30;
    this.height = 257;
    this.width = 308;
    this.speed = 0.2;
    this.pointsReceivedIfKilled = 1000;
    this.experienceIfKilled = 100;

    this.element.src = "images/enemy_boss.png";
    this.updateSize();
    this.setInitialPos();
  }
}
