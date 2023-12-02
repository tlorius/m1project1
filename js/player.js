class Player extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 10;
    this.left = 285;
    this.top = 280;
    this.height = 42;
    this.width = 35;
    this.directionX = 0; //check if I need to handle movement differently
    this.directionY = 0;
    this.speed = 0.7; //experiment with this

    this.element.src = "./images/player_down.png";
    this.setSizeAndPos();
  }

  changeFacingDirection(facingDirection) {
    switch (
      facingDirection //"down", "up", "left", "right"
    ) {
      case "down":
        this.element.src = "./images/player_down.png";
        break;
      case "up":
        this.element.src = "./images/player_up.png";
        break;
      case "left":
        this.element.src = "./images/player_left.png";
        break;
      case "right":
        this.element.src = "./images/player_right.png";
        break;
    }
  }
}
