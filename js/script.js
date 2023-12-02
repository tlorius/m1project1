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

  window.addEventListener("keydown", (keyDown) => {
    if (keyDown.code === "KeyW") {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.changeFacingDirection("up");
    }
    if (keyDown.code === "KeyS") {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.changeFacingDirection("down");
    }
    if (keyDown.code === "KeyD") {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.changeFacingDirection("right");
    }
    if (keyDown.code === "KeyA") {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.changeFacingDirection("left");
    }
  });
};
