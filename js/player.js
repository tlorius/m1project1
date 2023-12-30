class Player extends Entity {
  constructor(mainGameScreen, difficulty) {
    super(mainGameScreen);
    this.levelUpSound = document.getElementById("levelup-sound");
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
    this.skillPointsAvailable = 0;
    this.speed =
      difficulty === "easy"
        ? 150
        : difficulty === "default"
        ? 130
        : difficulty === "hard"
        ? 120
        : 110;
    this.health =
      difficulty === "easy"
        ? 30
        : difficulty === "default"
        ? 10
        : difficulty === "hard"
        ? 5
        : 1;
    this.shootingOnCooldown = false;
    this.shootingCooldownInSeconds =
      difficulty === "easy"
        ? 0.2
        : difficulty === "default"
        ? 0.3
        : difficulty === "hard"
        ? 0.35
        : 0.4;
    this.powerUpOnCooldown = true;
    this.powerUpCooldownInSeconds =
      difficulty === "easy"
        ? 15
        : difficulty === "default"
        ? 30
        : difficulty === "hard"
        ? 90
        : 180;
    setTimeout(
      () => (this.powerUpOnCooldown = false),
      1000 * this.powerUpCooldownInSeconds * 1.5
    );
    this.bulletDamage =
      difficulty === "easy"
        ? 2
        : difficulty === "default"
        ? 1.5
        : difficulty === "hard"
        ? 1
        : 1; //1 default allow this to be modified by powerups
    this.experienceMultiplier =
      difficulty === "easy"
        ? 2
        : difficulty === "default"
        ? 1
        : difficulty === "hard"
        ? 0.8
        : 0.7;
    this.isInvincible = false;
    this.timeWhenStarConsumed;

    this.element.src = "images/player_down.png";
    this.updateSize();
    this.setInitialPos();
  }

  aim() {
    //if statement with incinvible effect
    if (this.aimingLeft === 1) {
      this.element.src = this.isInvincible
        ? "images/player_left_invincible.gif"
        : "images/player_left.png";
    } else if (this.aimingLeft === -1) {
      this.element.src = this.isInvincible
        ? "images/player_right_invincible.gif"
        : "images/player_right.png";
    } else if (this.aimingUp === 1) {
      this.element.src = this.isInvincible
        ? "images/player_up_invincible.gif"
        : "images/player_up.png";
    } else if (this.aimingUp === -1) {
      this.element.src = this.isInvincible
        ? "images/player_down_invincible.gif"
        : "images/player_down.png";
    }
  }

  move(currentTime) {
    const elapsedTimeInSeconds =
      (currentTime - this.previousMoveTimestamp) / 1000;
    this.previousMoveTimestamp = currentTime;

    let newLeft =
      this.left + this.directionX * this.speed * elapsedTimeInSeconds;
    let newTop = this.top + this.directionY * this.speed * elapsedTimeInSeconds;

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
  //call everytime you kill a monster
  gainExperience(experienceGained) {
    const newExperience =
      this.experience + experienceGained * this.experienceMultiplier;
    if (Math.floor(this.experience / 100) < Math.floor(newExperience / 100)) {
      this.levelUp();
    }
    this.experience = newExperience;
  }

  levelUp() {
    this.playSound(this.levelUpSound, 0.05, 500);
    this.level += 1;
    switch (this.level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 15:
      case 20:
      case 25:
      case 30:
      case 35:
      case 40:
      case 45:
      case 50:
        this.skillPointsAvailable += 1;
        this.speed += 7;
        break;
    }
  }

  upgradeWeaponDmg() {
    if (this.skillPointsAvailable > 0) {
      this.bulletDamage += 0.5; // 0.5 extra damage per upgrade
      this.skillPointsAvailable -= 1;
    }
  }

  upgradeWeaponSpeed() {
    if (this.skillPointsAvailable > 0) {
      this.shootingCooldownInSeconds -= this.shootingCooldownInSeconds * 0.15; //15% reduction in cooldown per upgrade
      this.skillPointsAvailable -= 1;
    }
  }

  canPowerUpSpawn() {
    if (this.powerUpOnCooldown) {
      return false;
    } else {
      this.powerUpOnCooldown = true;
      setTimeout(() => {
        this.powerUpOnCooldown = false;
      }, this.powerUpCooldownInSeconds * 1000);
      return true;
    }
  }

  consumedStarPowerUp(currentTime) {
    this.timeWhenStarConsumed = currentTime;
    this.isInvincible = true;
  }

  takeDamageImage() {
    if (this.aimingLeft === 1) {
      this.element.src = "images/player_left_hurt.png";
    } else if (this.aimingLeft === -1) {
      this.element.src = "images/player_right_hurt.png";
    } else if (this.aimingUp === 1) {
      this.element.src = "images/player_up_hurt.png";
    } else if (this.aimingUp === -1) {
      this.element.src = "images/player_down_hurt.png";
    }
  }
}
