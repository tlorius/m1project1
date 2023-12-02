class Game {
  constructor() {
    this.introScreen = document.getElementById("game-intro-screen");
    this.mainGameScreen = document.getElementById("main-game-screen");
    this.gameOverScreen = document.getElementById("post-game-screen");
    this.player = null;
    this.height = 600;
    this.width = 600;
    this.enemies = [];
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

    this.gameLoop();
  }

  gameLoop() {
    this.player.move();
    //create enemies here
    //wave logic might need to be worked out/in here
    //update UI elements for HP
    if (this.gameState === "Win" || this.gameState === "Lose") {
      //Code for won game or lost game, can replace with second if else statement if needed to separate
      console.log("game over");
    } else {
      this.gameLoopAnimationId = requestAnimationFrame(() => this.gameLoop());
    }
  }
}
