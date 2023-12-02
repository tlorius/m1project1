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
      game.player.changeFacingDirection("up");
    }
    if (keyDown.code === "ArrowDown") {
      game.player.changeFacingDirection("down");
    }
    if (keyDown.code === "ArrowRight") {
      game.player.changeFacingDirection("right");
    }
    if (keyDown.code === "ArrowLeft") {
      game.player.changeFacingDirection("left");
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
  });
  // keyUp logic ensures that the player doesn't stop moving when switching directions
  document.addEventListener("keyup", (keyUp) => {
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
  });
};
