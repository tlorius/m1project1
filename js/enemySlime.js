class EnemySlime extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 3;
    this.height = 30;
    this.width = 30;
    this.speed = 0.4;
    this.pointsReceivedIfKilled = 10;
    this.experienceIfKilled = 5;

    this.element.src = "images/enemy_slime.png";
    this.setSizeAndPos();
  }
}
