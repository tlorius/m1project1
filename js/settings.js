class Settings {
  constructor(gamePauseScreen) {
    this.gamePauseScreen = gamePauseScreen;
    this.restoreDefaultKeybinds();
    this.currentlyReassigning = false;
    this.currentActionToChange = "keybindMoveUp";
    this.currentlyDisplayedMenu = "pauseMainMenu"; // states: pauseMainMenu, pauseKeybindMenu, pauseKeybindModal, pauseSoundMenu
    this.allPauseMenus =
      this.gamePauseScreen.querySelectorAll(".allMenuScreens");
    this.pauseMainMenu = this.gamePauseScreen.querySelector(".mainMenuCtn");
    this.pauseSoundMenu = this.gamePauseScreen.querySelector(".soundsMenuCtn");
    this.pauseKeybindMenu =
      this.gamePauseScreen.querySelector(".keybindsMenuCtn");
    this.pauseKeybindModal = this.gamePauseScreen.querySelector(".modal");
    this.modalFeedbackText =
      this.gamePauseScreen.querySelector("#feedbackText");
    this.isFirstSetup = true;
  }

  displaySelectedMenu(selectedMenu) {
    this.pauseKeybindMenu.style.display = "none";
    this.pauseMainMenu.style.display = "none";
    this.pauseKeybindModal.style.display = "none";
    this.pauseSoundMenu.style.display = "none";

    this[selectedMenu].style.display = "flex";
    this.currentlyDisplayedMenu = selectedMenu;
  }

  handleEscPress() {
    this.pauseKeybindMenu.style.display = "none";
    this.pauseMainMenu.style.display = "none";
    this.pauseKeybindModal.style.display = "none";
    this.pauseSoundMenu.style.display = "none";

    switch (this.currentlyDisplayedMenu) {
      case "pauseKeybindMenu":
      case "pauseSoundMenu":
        this.pauseMainMenu.style.display = "block";
        this.currentlyDisplayedMenu = "pauseMainMenu";
        break;
      case "pauseKeybindModal":
        this.pauseKeybindMenu.style.display = "flex";
        this.currentlyDisplayedMenu = "pauseKeybindMenu";
        this.currentlyReassigning = false;
        break;
    }
  }

  isKeyAlreadyAssigned(keyCode) {
    switch (keyCode) {
      case this.keybindMoveUp:
      case this.keybindMoveDown:
      case this.keybindMoveLeft:
      case this.keybindMoveRight:
      case this.keybindAimUp:
      case this.keybindAimDown:
      case this.keybindAimLeft:
      case this.keybindAimRight:
      case this.keybindLevelUpDmg:
      case this.keybindLevelUpAtkSpeed:
      case "Escape":
        return true;
      default:
        return false;
    }
  }

  restoreDefaultKeybinds() {
    this.keybindMoveUp = "KeyW";
    this.keybindMoveDown = "KeyS";
    this.keybindMoveLeft = "KeyA";
    this.keybindMoveRight = "KeyD";
    this.keybindAimUp = "ArrowUp";
    this.keybindAimDown = "ArrowDown";
    this.keybindAimLeft = "ArrowLeft";
    this.keybindAimRight = "ArrowRight";
    this.keybindLevelUpDmg = "Space";
    this.keybindLevelUpAtkSpeed = "ShiftLeft";
    if (!this.isFirstSetup) {
      this.gamePauseScreen.querySelector(`#currentkeybindMoveUp`).innerText =
        "KeyW";
      this.gamePauseScreen.querySelector(`#currentkeybindMoveDown`).innerText =
        "KeyS";
      this.gamePauseScreen.querySelector(`#currentkeybindMoveLeft`).innerText =
        "KeyA";
      this.gamePauseScreen.querySelector(`#currentkeybindMoveRight`).innerText =
        "KeyD";
      this.gamePauseScreen.querySelector(`#currentkeybindAimUp`).innerText =
        "ArrowUp";
      this.gamePauseScreen.querySelector(`#currentkeybindAimDown`).innerText =
        "ArrowDown";
      this.gamePauseScreen.querySelector(`#currentkeybindAimLeft`).innerText =
        "ArrowLeft";
      this.gamePauseScreen.querySelector(`#currentkeybindAimRight`).innerText =
        "ArrowRight";
      this.gamePauseScreen.querySelector(
        `#currentkeybindLevelUpDmg`
      ).innerText = "Space";
      this.gamePauseScreen.querySelector(
        `#currentkeybindLevelUpAtkSpeed`
      ).innerText = "ShiftLeft";
    }
    this.isFirstSetup = false;
  }

  startReassigning(selectedAction) {
    if (this.currentlyReassigning === false) {
      this.currentActionToChange = selectedAction;
      this.currentlyReassigning = true;
    }
  }

  reassignKeybind(selectedKey) {
    if (this.currentlyReassigning === true) {
      if (this.isKeyAlreadyAssigned(selectedKey)) {
        this.modalFeedbackText.innerText = `${selectedKey} is already in use by another keybind`;
      } else {
        //reassign key in settings class
        this.modalFeedbackText.innerText = `SUCCESS`;
        this[this.currentActionToChange] = selectedKey;
        //change the displayed div for the current keybind
        this.gamePauseScreen.querySelector(
          `#current${this.currentActionToChange}`
        ).innerText = `${selectedKey}`;
        this.currentlyReassigning = false;
        setTimeout(() => {
          this.handleEscPress();
          this.modalFeedbackText.innerText = "";
        }, 500);
      }
    }
  }
}
