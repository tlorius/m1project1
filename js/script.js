window.onload = function () {
  const startGameBtn = document.getElementById("btn-start-game");
  const restartGameBtn = document.getElementById("btn-restart-game");
  const mainMenuMusic = document.getElementById("main_menu_sound");
  const demoButtonToggle = document.getElementById("demo-checkbox");
  const nameHighscoreInput = document.getElementById("score-name");
  const keybindMenuBtn = document.querySelector(".keybindMenuItem");
  const soundMenuBtn = document.querySelector(".soundMenuItem");
  const rebindBtn = document.querySelectorAll(".rebindBtn");
  const restoreDefaultBtn = document.querySelector("#restoreDefaults");
  const rocket = document.getElementById("rocket");
  let isVisorOpen = false;

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

  rocket.addEventListener("click", () => {
    if (isVisorOpen) {
      rocket.src = "images/rocket_close.gif";
      isVisorOpen = false;
    } else {
      rocket.src = "images/rocket_open.gif";
      isVisorOpen = true;
    }
  });

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
      //pause game if its currently not paused
      if (!game.isGamePaused) {
        game.pauseGame();
        game.isGamePaused = true;
        //unpause game if its paused and we are on the top level menu of the pause screen
      } else if (
        game.isGamePaused &&
        game.settings.currentlyDisplayedMenu === "pauseMainMenu"
      ) {
        game.unpauseGame();
        game.isGamePaused = false;
        game.gamePauseScreen.style.display = "none";
        game.mainGameScreen.style.display = "block";
        game.toolTipsUi.style.display = "block";
        game.gameLoop();
        //handle reverse menu navigation in any other case using esc button
      } else {
        game.settings.handleEscPress();
      }
    }

    if (game.settings.currentlyReassigning === true) {
      game.settings.reassignKeybind(keyDown.code);
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
      case game.settings.keybindMoveUp:
        game.player.directionY =
          keyUp.code === game.settings.keybindMoveUp &&
          game.player.directionY === -1
            ? 0
            : game.player.directionY;
        break;
      case game.settings.keybindMoveDown:
        game.player.directionY =
          keyUp.code === game.settings.keybindMoveDown &&
          game.player.directionY === 1
            ? 0
            : game.player.directionY;
        break;
      case game.settings.keybindMoveRight:
        game.player.directionX =
          keyUp.code === game.settings.keybindMoveRight &&
          game.player.directionX === 1
            ? 0
            : game.player.directionX;
        break;
      case game.settings.keybindMoveLeft:
        game.player.directionX =
          keyUp.code === game.settings.keybindMoveLeft &&
          game.player.directionX === -1
            ? 0
            : game.player.directionX;
        break;
    }
    // this switch statement ensures that the aim is return to neutral if keyUp events are registered
    switch (keyUp.code) {
      case game.settings.keybindAimUp:
        game.player.aimingUp =
          keyUp.code === game.settings.keybindAimUp &&
          game.player.aimingUp === 1
            ? 0
            : game.player.aimingUp;
        break;
      case game.settings.keybindAimDown:
        game.player.aimingUp =
          keyUp.code === game.settings.keybindAimDown &&
          game.player.aimingUp === -1
            ? 0
            : game.player.aimingUp;
        break;
      case game.settings.keybindAimRight:
        game.player.aimingLeft =
          keyUp.code === game.settings.keybindAimRight &&
          game.player.aimingLeft === -1
            ? 0
            : game.player.aimingLeft;
        break;
      case game.settings.keybindAimLeft:
        game.player.aimingLeft =
          keyUp.code === game.settings.keybindAimLeft &&
          game.player.aimingLeft === 1
            ? 0
            : game.player.aimingLeft;
        break;
    }
  });

  keybindMenuBtn.addEventListener("mouseup", () => {
    game.settings.displaySelectedMenu("pauseKeybindMenu");
  });

  soundMenuBtn.addEventListener("mouseup", () => {
    game.settings.displaySelectedMenu("pauseSoundMenu");
  });

  rebindBtn.forEach((btnElement) => {
    btnElement.addEventListener("mouseup", (event) => {
      game.settings.displaySelectedMenu("pauseKeybindModal");
      game.settings.startReassigning(event.target.id);
    });
  });

  restoreDefaultBtn.addEventListener("mouseup", () =>
    game.settings.restoreDefaultKeybinds()
  );
};
