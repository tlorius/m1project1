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
  }

  displaySelectedMenu(selectedMenu) {
    this.pauseKeybindMenu.style.display = "none";
    this.pauseMainMenu.style.display = "none";
    this.pauseKeybindModal.style.display = "none";
    this.pauseSoundMenu.style.display = "none";

    this[selectedMenu].style.display = "block";
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
        this.pauseKeybindMenu.style.display = "block";
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
  }

  startReassigning(selectedAction) {
    if (this.currentlyReassigning === false) {
      this.currentActionToChange = selectedAction;
      console.log(this.currentActionToChange);
      this.currentlyReassigning = true;
    }
  }

  reassignKeybind(selectedKey) {
    if (this.currentlyReassigning === true) {
      if (this.isKeyAlreadyAssigned(selectedKey)) {
        console.log(`This key is already in use`);
      } else {
        this[this.currentActionToChange] = selectedKey;
        console.log(this.keybindLevelUpAtkSpeed);
        this.currentlyReassigning = false;
      }
    }
  }
}
