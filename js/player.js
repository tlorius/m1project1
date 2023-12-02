class Player extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 10;
    this.left = 300; //currently doesnt work, same with top
    this.top = 300;
    this.height = 42;
    this.width = 35;
    this.directionX = 0; //check if I need to handle movement differently
    this.directionY = 0;
    this.facingDirection = "down"; //"down", "left", "right", "up"

    this.element.src = "./images/player_down.png";
    this.updatePosition();
  }
  changeFacingDirection() {}
}
