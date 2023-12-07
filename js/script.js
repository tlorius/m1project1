window.onload = function () {
  const startGameBtn = document.getElementById("btn-start-game");
  const restartGameBtn = document.getElementById("btn-restart-game");
  const mainMenuMusic = document.getElementById("main_menu_sound");
  const demoButtonToggle = document.getElementById("demo-checkbox");
  const nameHighscoreInput = document.getElementById("score-name");

  let game;
  let firstClick = true;
  //modify this to true for demo modifications to be applied
  let demoMode = false;

  function stopMainMenuMusic() {
    mainMenuMusic.pause();
    mainMenuMusic.currentTime = 0;
  }

  // input field for name in highscore -> needs to pass the value to game
  nameHighscoreInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      let highscoreName = nameHighscoreInput.value;
      nameHighscoreInput.style.display = "none";
      game.currentPlayerHighscoreName = highscoreName;
      //call method in game to add new name to list and display list
      restartGameBtn.style.display = "inline";
      game.saveHighscoresAndDisplayList();
    }
  });

  //had to add eventlistener as player has to interact with site before playing sound
  //variable to prevent this music from playing again once we click into the game
  document.addEventListener("click", () => {
    if (firstClick) {
      mainMenuMusic.play();
      mainMenuMusic.volume = 0.05;
      firstClick = false;
    }
  });

  demoButtonToggle.addEventListener("click", () => {
    demoMode = demoButtonToggle.checked;
  });

  function startNewGame() {
    game = new Game();
    if (demoMode) {
      game.demoModeActive = true;
    }
    game.startGame();
  }

  startGameBtn.addEventListener("click", () => {
    stopMainMenuMusic();
    startNewGame();
  });
  restartGameBtn.addEventListener("click", () => location.reload());

  document.addEventListener("keydown", (keyDown) => {
    //character "aiming" direction
    if (keyDown.code === game.settings.keybindAimUp) {
      //implement keybinds here, use class settings and do settings.keyMovementUp
      game.player.aimingUp = 1;
    }
    if (keyDown.code === game.settings.keybindAimDown) {
      game.player.aimingUp = -1;
    }
    if (keyDown.code === game.settings.keybindAimRight) {
      game.player.aimingLeft = -1;
    }
    if (keyDown.code === game.settings.keybindAimLeft) {
      game.player.aimingLeft = 1;
    }
    //character movement inputs
    if (keyDown.code === game.settings.keybindMoveUp) {
      game.player.directionY = -1;
    }
    if (keyDown.code === game.settings.keybindMoveDown) {
      game.player.directionY = 1;
    }
    if (keyDown.code === game.settings.keybindMoveRight) {
      game.player.directionX = 1;
    }
    if (keyDown.code === game.settings.keybindMoveLeft) {
      game.player.directionX = -1;
    }
    if (keyDown.code === "Escape") {
      game.isGamePaused = !game.isGamePaused;
      if (!game.isGamePaused) {
        game.gamePauseScreen.style.display = "none";
        game.mainGameScreen.style.display = "block";
        game.gameLoop();
      }
    }
    if (keyDown.code === game.settings.keybindLevelUpDmg) {
      game.player.upgradeWeaponDmg();
    }

    if (keyDown.code === game.settings.keybindLevelUpAtkSpeed) {
      game.player.upgradeWeaponSpeed();
    }
  });

  document.addEventListener("keyup", (keyUp) => {
    // keyUp logic ensures that the player doesn't stop moving when switching directions
    switch (keyUp.code) {
      case "KeyW":
        game.player.directionY =
          keyUp.code === game.settings.keybindMoveUp &&
          game.player.directionY === -1
            ? 0
            : game.player.directionY;
        break;
      case "KeyS":
        game.player.directionY =
          keyUp.code === game.settings.keybindMoveDown &&
          game.player.directionY === 1
            ? 0
            : game.player.directionY;
        break;
      case "KeyD":
        game.player.directionX =
          keyUp.code === game.settings.keybindMoveRight &&
          game.player.directionX === 1
            ? 0
            : game.player.directionX;
        break;
      case "KeyA":
        game.player.directionX =
          keyUp.code === game.settings.keybindMoveLeft &&
          game.player.directionX === -1
            ? 0
            : game.player.directionX;
        break;
    }
    // this switch statement ensures that the aim is return to neutral if keyUp events are registered
    switch (keyUp.code) {
      case "ArrowUp":
        game.player.aimingUp =
          keyUp.code === game.settings.keybindAimUp &&
          game.player.aimingUp === 1
            ? 0
            : game.player.aimingUp;
        break;
      case "ArrowDown":
        game.player.aimingUp =
          keyUp.code === game.settings.keybindAimDown &&
          game.player.aimingUp === -1
            ? 0
            : game.player.aimingUp;
        break;
      case "ArrowRight":
        game.player.aimingLeft =
          keyUp.code === game.settings.keybindAimRight &&
          game.player.aimingLeft === -1
            ? 0
            : game.player.aimingLeft;
        break;
      case "ArrowLeft":
        game.player.aimingLeft =
          keyUp.code === game.settings.keybindAimLeft &&
          game.player.aimingLeft === 1
            ? 0
            : game.player.aimingLeft;
        break;
    }
  });
};
