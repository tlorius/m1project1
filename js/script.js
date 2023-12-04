window.onload = function () {
  const startGameBtn = document.getElementById("btn-start-game");
  const restartGameBtn = document.getElementById("btn-restart-game");
  let game;

  function startNewGame() {
    game = new Game();
    game.startGame();
  }

  startGameBtn.addEventListener("click", () => startNewGame());
  restartGameBtn.addEventListener("click", () => location.reload());

  document.addEventListener("keydown", (keyDown) => {
    //character "aiming" direction
    if (keyDown.code === "ArrowUp") {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.aimingUp = 1;
    }
    if (keyDown.code === "ArrowDown") {
      game.player.aimingUp = -1;
    }
    if (keyDown.code === "ArrowRight") {
      game.player.aimingLeft = -1;
    }
    if (keyDown.code === "ArrowLeft") {
      game.player.aimingLeft = 1;
    }
    //character movement inputs
    if (keyDown.code === "KeyW") {
      game.player.directionY = -1;
    }
    if (keyDown.code === "KeyS") {
      game.player.directionY = 1;
    }
    if (keyDown.code === "KeyD") {
      game.player.directionX = 1;
    }
    if (keyDown.code === "KeyA") {
      game.player.directionX = -1;
    }
    if (keyDown.code === "Escape") {
      game.isGamePaused = !game.isGamePaused;
      console.log(game.isGamePaused);
      if (!game.isGamePaused) {
        game.gamePauseScreen.style.display = "none";
        game.mainGameScreen.style.display = "block";
        game.gameLoop();
      }
    }

    //console.log(keyDown);
  });

  document.addEventListener("keyup", (keyUp) => {
    // keyUp logic ensures that the player doesn't stop moving when switching directions
    switch (keyUp.code) {
      case "KeyW":
        game.player.directionY =
          keyUp.code === "KeyW" && game.player.directionY === -1
            ? 0
            : game.player.directionY;
        break;
      case "KeyS":
        game.player.directionY =
          keyUp.code === "KeyS" && game.player.directionY === 1
            ? 0
            : game.player.directionY;
        break;
      case "KeyD":
        game.player.directionX =
          keyUp.code === "KeyD" && game.player.directionX === 1
            ? 0
            : game.player.directionX;
        break;
      case "KeyA":
        game.player.directionX =
          keyUp.code === "KeyA" && game.player.directionX === -1
            ? 0
            : game.player.directionX;
        break;
    }
    // this switch statement ensures that the aim is return to neutral if keyUp events are registered
    switch (keyUp.code) {
      case "ArrowUp":
        game.player.aimingUp =
          keyUp.code === "ArrowUp" && game.player.aimingUp === 1
            ? 0
            : game.player.aimingUp;
        break;
      case "ArrowDown":
        game.player.aimingUp =
          keyUp.code === "ArrowDown" && game.player.aimingUp === -1
            ? 0
            : game.player.aimingUp;
        break;
      case "ArrowRight":
        game.player.aimingLeft =
          keyUp.code === "ArrowRight" && game.player.aimingLeft === -1
            ? 0
            : game.player.aimingLeft;
        break;
      case "ArrowLeft":
        game.player.aimingLeft =
          keyUp.code === "ArrowLeft" && game.player.aimingLeft === 1
            ? 0
            : game.player.aimingLeft;
        break;
    }
  });
};
