class Projectile extends Entity {
  constructor(mainGameScreen, playerLeft, playerTop, aimingUp, aimingLeft) {
    super(mainGameScreen);

    //calculating the exact spawn location based on the direction the player is shooting
    if (aimingLeft === 1) {
      this.left = playerLeft - 9;
    } else if (aimingLeft === -1) {
      this.left = playerLeft + 34;
    } else if (aimingUp === 1) {
      this.left = playerLeft + 15;
    } else if (aimingUp === -1) {
      this.left = playerLeft + 10;
    }

    if (aimingLeft === 1) {
      this.top = playerTop + 22;
    } else if (aimingLeft === -1) {
      this.top = playerTop + 22;
    } else if (aimingUp === 1) {
      this.top = playerTop - 8;
    } else if (aimingUp === -1) {
      this.top = playerTop + 37;
    }

    this.directionY = aimingUp * -1;
    this.directionX = aimingLeft * -1;
    this.speed = 1.5;
    this.height = 10;
    this.width = 10;

    this.element.src = "./images/projectile_bullet.png";
    this.setSizeAndPos();
  }
}
//could initialize with start location
//and aiming values like the player to reuse variable given in script
//possible property cooldown to prevent creation of new projectile and allow for powerups to modify it
