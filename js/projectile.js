class Projectile extends Entity {
  constructor(
    mainGameScreen,
    playerLeft,
    playerTop,
    aimingUp,
    aimingLeft,
    damageValue,
    isPlayerInvincible
  ) {
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

    //inverting player aim value to create desired trajectory
    this.directionY = aimingUp * -1;
    this.directionX = aimingLeft * -1;
    this.speed = 300;
    this.height = 10;
    this.width = 10;
    this.damage = damageValue;

    this.element.src =
      this.damage > 1.5
        ? "images/projectile_bullet_yellow.png"
        : "images/projectile_bullet_green.png";

    this.element.src =
      this.damage > 2.5 ? "images/projectile_bullet_red.png" : this.element.src;

    this.element.src = isPlayerInvincible
      ? "images/projectile_rgb_easteregg.gif"
      : this.element.src;

    this.updateSize();
    this.setInitialPos();
  }
}
