class Player extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    //base properties
    this.left = 285;
    this.top = 280;
    this.height = 42;
    this.width = 35;
    this.directionX = 0;
    this.directionY = 0;
    this.aimingUp = 0; // 3 states, -1 = aiming down, 0 = neutral, 1 = aiming up, allows for combination with aiming left for 8 directional aim
    this.aimingLeft = 0;

    //properties that we can modify using powerups
    this.score = 0;
    this.experience = 0;
    this.level = 0;
    this.speed = 0.8; //experiment with this, can also be adjusted with powerups or traps
    this.health = 30;
    this.shootingOnCooldown = false;
    this.shootingCooldownInSeconds = 0.3;
    this.bulletDamage = 1; //allow this to be modified by powerups
    this.isInvincible = false;

    this.element.src = "./images/player_down.png";
    this.setSizeAndPos();
  }

  aim() {
    if (this.aimingLeft === 1) {
      this.element.src = "./images/player_left.png";
    } else if (this.aimingLeft === -1) {
      this.element.src = "./images/player_right.png";
    } else if (this.aimingUp === 1) {
      this.element.src = "./images/player_up.png";
    } else if (this.aimingUp === -1) {
      this.element.src = "./images/player_down.png";
    }
  }

  move() {
    let newLeft = this.left + this.directionX * this.speed;
    let newTop = this.top + this.directionY * this.speed;

    if (newLeft > 0 && newLeft < 600 - this.width) {
      this.left = newLeft;
      this.element.style.left = `${this.left}px`;
    }
    if (newTop > 0 && newTop < 600) {
      this.top = newTop;
      this.element.style.top = `${this.top}px`;
    }
  }

  shooting() {
    //logic for shooting, in script we alrdy have key input checks for changing direction -> reuse
    //define facingUp = -1 0 1 // example up -1, left 1 => facing bottom left;;up 1 left 0, just up; up 0 left
    //define facingleft = -1 0 1
    if (
      (this.aimingLeft === 0 && this.aimingUp === 0) ||
      this.shootingOnCooldown === true
    ) {
      return false;
    } else {
      this.shootingOnCooldown = true;
      setTimeout(() => {
        this.shootingOnCooldown = false;
      }, this.shootingCooldownInSeconds * 1000);
      return true;
    }
  }
}
