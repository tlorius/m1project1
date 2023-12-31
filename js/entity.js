class Entity {
  constructor(mainGameScreen) {
    this.mainGameScreen = mainGameScreen;
    this.health = 3;
    this.left = 0;
    this.top = 0;
    this.height = 0;
    this.width = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.previousMoveTimestamp = performance.now();
    this.speed = 150;

    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.mainGameScreen.appendChild(this.element);
  }

  updateSize() {
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
  }

  setInitialPos() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move(currentTime) {
    const elapsedTimeInSeconds =
      (currentTime - this.previousMoveTimestamp) / 1000;
    this.previousMoveTimestamp = currentTime;

    this.left += this.directionX * this.speed * elapsedTimeInSeconds;
    this.top += this.directionY * this.speed * elapsedTimeInSeconds;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(objectToCollideWith) {
    const mainEntityRect = this.element.getBoundingClientRect();
    const objectToCollideWithRect =
      objectToCollideWith.element.getBoundingClientRect();
    //reducing hitbox by 25% per side to create a more accurate hitbox of the actual character
    const mainReducedHeight = 0.25 * mainEntityRect.height;
    const mainReducedWidth = 0.25 * mainEntityRect.width;
    const secondaryReducedHeight = 0.25 * objectToCollideWithRect.height;
    const secondaryReducedWidth = 0.25 * objectToCollideWithRect.width;

    if (
      mainEntityRect.left + mainReducedWidth <
        objectToCollideWithRect.right - secondaryReducedWidth &&
      mainEntityRect.right - mainReducedWidth >
        objectToCollideWithRect.left + secondaryReducedWidth &&
      mainEntityRect.top + mainReducedHeight <
        objectToCollideWithRect.bottom - secondaryReducedHeight &&
      mainEntityRect.bottom - mainReducedHeight >
        objectToCollideWithRect.top + secondaryReducedHeight
    ) {
      return true;
    } else {
      return false;
    }
  }

  stopSound(audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  playSound(audioElement, volume, duration) {
    audioElement.volume = volume;
    audioElement.play();

    if (duration) {
      setTimeout(() => this.stopSound(audioElement), duration);
    }
  }
}
