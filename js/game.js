class Game {
  constructor() {
    //screens
    this.introScreen = document.getElementById("game-intro-screen");
    this.mainGameScreen = document.getElementById("main-game-screen");
    this.gameOverScreen = document.getElementById("post-game-screen");
    this.gamePauseScreen = document.getElementById("game-pause-screen");

    //on screen elements
    this.bossBarBorder = document.getElementById("boss-health-bar-border");
    this.bossBar = document.getElementById("boss-health-bar");
    this.experienceBar = document.getElementById("experience-bar");

    //audio elements
    this.invincibleSound = document.getElementById("invincible-sound");

    this.settings = new Settings(this.gamePauseScreen);
    this.enemySpawning = new EnemySpawning();
    this.player = null;
    this.height = 600;
    this.width = 600;
    this.enemies = [];
    this.projectiles = [];
    this.powerUps = [];
    this.gameLoopAnimationId = null;
    this.gameState = "Ongoing"; //"Ongoing", "Win", "Lose"
    this.isGamePaused = false;
  }

  startGame() {
    this.introScreen.style.display = "none";
    this.gameOverScreen.style.display = "none";
    this.gamePauseScreen.style.display = "none";
    this.mainGameScreen.style.display = "block";

    this.mainGameScreen.style.height = `${this.height}px`;
    this.mainGameScreen.style.width = `${this.width}px`;

    this.player = new Player(this.mainGameScreen);

    this.playSound(this.invincibleSound, 0.05, 3000);

    //testing new entities remove at the end
    //
    //this.enemySpawning.currentWave = 8; //8 to get a level ahead of boss
    //

    this.gameLoop();
  }

  stopSound(audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  playSound(audioElement, volume, duration) {
    audioElement.volume = volume;
    audioElement.play();

    if (duration) {
      setTimeout(() => this.stopSound(audioElement), duration);
    }
  }

  // Remove enemies from dom and array
  purgeEnemies(enemiesToPurge) {
    enemiesToPurge.forEach((enemyToRemove) => {
      enemyToRemove.element.remove();
    });

    this.enemies = this.enemies.filter(
      (enemy) => !enemiesToPurge.includes(enemy)
    );
  }

  updateBossBar() {
    //bossbar total width 300px
    const bossHealthInPixels =
      (this.enemies[0].health / this.enemies[0].maxHealth) * 300;
    this.bossBar.style.width = `${bossHealthInPixels}px`;
  }

  updateExperienceBar() {
    const experienceBarInPixels = ((this.player.experience % 100) / 100) * 598;
    this.experienceBar.style.width = `${experienceBarInPixels}px`;
  }

  gameLoop() {
    //opens pause screen if game is paused
    if (this.isGamePaused) {
      this.gamePauseScreen.style.display = "block";
      this.mainGameScreen.style.display = "none";
      //prevents gameloop from running until unpaused
    } else {
      this.player.move();
      this.player.aim();

      if (this.player.shooting()) {
        //create new instance of projectile at players location with players current aim(pass on creation)
        this.projectiles.push(
          new Projectile(
            this.mainGameScreen,
            this.player.left,
            this.player.top,
            this.player.aimingUp,
            this.player.aimingLeft,
            this.player.bulletDamage,
            this.player.isInvincible
          )
        );
      }

      //LOGIC: checks all projectiles, for collision: checks all current enemies
      //dead enemies get removed from array and from dom, projectiles that leave area or collide get removed from array and dom

      const remainingProjectiles = [];
      const enemiesToRemove = [];

      for (const currentProjectile of this.projectiles) {
        currentProjectile.move();

        if (
          currentProjectile.top < -10 ||
          currentProjectile.left < -10 ||
          currentProjectile.top > 640 ||
          currentProjectile.left > 610
        ) {
          currentProjectile.element.remove();
        } else {
          let projectileStillActive = true;

          for (const currentEnemy of this.enemies) {
            if (currentProjectile.didCollide(currentEnemy)) {
              const diedFromDmg = currentEnemy.diedFromReceivedDamage(
                currentProjectile.damage
              );
              //score addition and priming enemy for removal
              if (diedFromDmg) {
                this.player.score += currentEnemy.pointsReceivedIfKilled;
                this.player.gainExperience(currentEnemy.experienceIfKilled);
                this.updateExperienceBar();
                enemiesToRemove.push(currentEnemy);
              }
              //updating size of non boss enemies based on damage taken
              if (
                (!diedFromDmg && currentEnemy instanceof EnemySlime) ||
                (!diedFromDmg && currentEnemy instanceof EnemyBat)
              ) {
                currentEnemy.updateSizeBasedOnNewHealth();
              }

              //removing bossbar if boss died
              if (!currentEnemy instanceof EnemyBoss) {
                this.bossBar.style.display = "none";
                this.bossBarBorder.style.display = "none";
              }
              currentProjectile.element.remove();
              projectileStillActive = false;
              break; // No need to check other enemies if collision occurred
            }
          }

          if (projectileStillActive) {
            remainingProjectiles.push(currentProjectile);
          }
        }
      }

      //UPDATE BOSS BAR
      if (this.enemies[0] instanceof EnemyBoss) {
        this.bossBar.style.display = "block";
        this.bossBarBorder.style.display = "block";
        this.updateBossBar();
      }
      //

      this.purgeEnemies(enemiesToRemove);

      this.projectiles = remainingProjectiles;

      //TO BE ADDED: enemy collision with player logic

      const enemiesToRemoveAfterPlayerCollision = [];
      this.enemies.forEach((currentEnemy) => {
        //update enemy player tracking every 50 gameloops, maybe remove this later if game runs smooth anyways
        if (this.gameLoopAnimationId % 50 === 0) {
          currentEnemy.trackPlayerPosition(
            this.player.top,
            this.player.left,
            this.player.height,
            this.player.width
          );
        }
        currentEnemy.move();

        //logic for player to lose hp
        //note: invincibility only applies to non boss monsters, would be too strong
        if (this.player.didCollide(currentEnemy)) {
          enemiesToRemoveAfterPlayerCollision.push(currentEnemy);
          if (currentEnemy instanceof EnemyBoss) {
            this.player.health = 0;
          } else {
            if (!this.player.isInvincible) {
              this.player.health -= 1;
            } else {
              this.player.score += currentEnemy.pointsReceivedIfKilled;
              this.player.gainExperience(currentEnemy.experienceIfKilled);
              this.updateExperienceBar();
            }
          }
        }
      });

      this.purgeEnemies(enemiesToRemoveAfterPlayerCollision);

      //Wave spawning logic, majority of the calculations handled inside enemySpawning instance
      const currentTime = performance.now();
      this.enemySpawning.startNewWave(currentTime);
      this.enemySpawning.endWave(currentTime);

      const timeLeftInWave = parseInt(
        this.enemySpawning.calcTimeLeftInWave(currentTime).toFixed(0)
      );
      if (timeLeftInWave <= 0) {
        document.getElementById("wave-time-left").innerText =
          "Next Wave incoming...";
      } else {
        document.getElementById(
          "wave-time-left"
        ).innerText = `Time left in Wave: ${timeLeftInWave}s`;
      }

      if (this.enemySpawning.canEnemySpawn(currentTime)) {
        const enemyClassToSpawn =
          this.enemySpawning.randomizeSpawn(currentTime);
        if (enemyClassToSpawn === "slime") {
          this.enemies.push(new EnemySlime(this.mainGameScreen));
        } else if (enemyClassToSpawn === "bat") {
          this.enemies.push(new EnemyBat(this.mainGameScreen));
        } else if (enemyClassToSpawn === "boss") {
          this.enemies.push(new EnemyBoss(this.mainGameScreen));
        }
      }
      //maybe put in method
      document.getElementById("score").innerText = this.player.score;
      document.getElementById("health").innerText = this.player.health;
      document.getElementById("wave").innerText =
        this.enemySpawning.currentWave;
      document.getElementById("bullet-dmg").innerText =
        this.player.bulletDamage;
      document.getElementById("atk-speed").innerText = (
        1 / this.player.shootingCooldownInSeconds
      ).toFixed(1);
      document.getElementById("level").innerText = this.player.level;
      document.getElementById("skill-points-avail").innerText =
        this.player.skillPointsAvailable;

      if (this.player.health <= 0) {
        this.gameState = "Lose";
      }

      if (this.gameState === "Win" || this.gameState === "Lose") {
        //Code for won game or lost game, can replace with second if else statement if needed to separate
        this.mainGameScreen.style.display = "none";
        this.gameOverScreen.style.display = "block";
        this.player.element.remove();
        console.log("game over");
      } else {
        this.gameLoopAnimationId = requestAnimationFrame(() => this.gameLoop());
      }
    }
  }
}
