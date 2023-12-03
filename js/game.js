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
    this.score = 0;
    this.health = 10;
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

    //removes projectiles that are off screen, first with .remove() and then removing them from the array holding their instances
    const remainingProjectiles = [];
    const remainingEnemies = [];
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
          //returns true if they collide
          if (currentProjectile.didCollide(currentEnemy)) {
            //returns true if enemy died
            if (currentEnemy.diedFromReceivedDamage(currentProjectile.damage)) {
              this.score += currentEnemy.pointsReceivedIfKilled; //give points to player
              currentEnemy.element.remove();
            }
            currentProjectile.element.remove();
            projectileStillActive = false;
            break;
          } //TO BE ADDED: use remaining enemies to clean enemies array, enemy collision with player logic
        }
        if (projectileStillActive) {
          remainingProjectiles.push(currentProjectile);
        }
      }
    }
    this.projectiles = remainingProjectiles;

    //maybe run the tracking only every 100 gameloops to save ressources but for now this is working
    this.enemies.forEach((currentEnemy) => {
      currentEnemy.trackPlayerPosition(
        this.player.top,
        this.player.left,
        this.player.height,
        this.player.width
      );
      currentEnemy.move();
    });

    //create enemies here
    //wave logic might need to be worked out/in here
    //update UI elements for HP
    document.getElementById("score").innerText = this.score;
    document.getElementById("health").innerText = this.health;
    //create code shooting/creating a projectile here - projectile should only spawn if any arrowkey is pressed and cooldown is passed
    if (this.gameState === "Win" || this.gameState === "Lose") {
      //Code for won game or lost game, can replace with second if else statement if needed to separate
      console.log("game over");
    } else {
      this.gameLoopAnimationId = requestAnimationFrame(() => this.gameLoop());
    }
  }
}
