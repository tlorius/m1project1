class Settings {
  constructor(gamePauseScreen) {
    this.gamePauseScreen = gamePauseScreen;
    this.restoreDefaultKeybinds();
    // this.keybindMoveUp = "KeyW";
    // this.keybindMoveDown = "KeyS";
    // this.keybindMoveLeft = "KeyA";
    // this.keybindMoveRight = "KeyD";
    // this.keybindAimUp = "ArrowUp";
    // this.keybindAimDown = "ArrowDown";
    // this.keybindAimLeft = "ArrowLeft";
    // this.keybindAimRight = "ArrowRight";
    // this.keybindLevelUpDmg = "KeyE"; //spacebar probably
    // this.keybindLevelUpAtkSpeed = "KeyQ"; //shift or control probably

    //features to be potentially added
    // this.volume = 1;
    // this.muted = false;
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
    this.keybindLevelUpDmg = "KeyE";
    this.keybindLevelUpAtkSpeed = "KeyQ";
  }
}
