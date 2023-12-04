class EnemyBat extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 2;
    this.height = 35;
    this.width = 39;
    this.speed = 1;
    this.pointsReceivedIfKilled = 10;
    this.experienceIfKilled = 10;

    this.element.src = "./images/enemy_bat.png";
    this.setSizeAndPos();
  }
}
