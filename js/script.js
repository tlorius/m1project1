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
};
