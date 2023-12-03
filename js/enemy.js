class Enemy extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 1;
    this.left = 100;
    this.top = 100;
    this.height = 30;
    this.width = 30;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 0.4;

    this.element.src = "./images/enemy_regular_monster.png";
    this.setSizeAndPos();
  }
}
