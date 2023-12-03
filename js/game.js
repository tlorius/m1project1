class Game {
  constructor() {
    this.introScreen = document.getElementById("game-intro-screen");
    this.mainGameScreen = document.getElementById("main-game-screen");
    this.gameOverScreen = document.getElementById("post-game-screen");
    this.player = null;
    this.height = 600;
    this.width = 600;
    this.enemies = [];
    this.projectiles = [];
    this.gameLoopAnimationId = null;
    this.lastEnemySpawnTime = performance.now();
    this.gameState = "Ongoing"; //"Ongoing", "Win", "Lose"
  }

  startGame() {
    this.introScreen.style.display = "none";
    this.gameOverScreen.style.display = "none";
    this.mainGameScreen.style.display = "block";

    this.mainGameScreen.style.height = `${this.height}px`;
    this.mainGameScreen.style.width = `${this.width}px`;

    this.player = new Player(this.mainGameScreen);

    //remove this code later when better enemy code is implemented
    this.enemies.push(new Enemy(this.mainGameScreen));
    this.enemies.push(new Enemy(this.mainGameScreen));

    //pseudo code to move second enemy out of collision remove later
    this.enemies[1].left = 200;
    this.enemies[1].move();
    //end of pseudo code
    this.gameLoop();
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

  gameLoop() {
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
          this.player.bulletDamage
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
            if (currentEnemy.diedFromReceivedDamage(currentProjectile.damage)) {
              this.player.score += currentEnemy.pointsReceivedIfKilled;
              enemiesToRemove.push(currentEnemy);
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

      if (this.player.didCollide(currentEnemy)) {
        enemiesToRemoveAfterPlayerCollision.push(currentEnemy);
        this.player.health -= 1;
      }
    });

    this.purgeEnemies(enemiesToRemoveAfterPlayerCollision);

    //create enemies here

    const currentTime = performance.now();
    const timeSinceLastSpawn = currentTime - this.lastEnemySpawnTime;

    //spawn enemy every X ms
    if (timeSinceLastSpawn > 2000) {
      this.enemies.push(new Enemy(this.mainGameScreen));
      this.lastEnemySpawnTime = currentTime;
    }

    //wave logic might need to be worked out/in here

    document.getElementById("score").innerText = this.player.score;
    document.getElementById("health").innerText = this.player.health;

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
