class Entity {
  constructor(mainGameScreen) {
    this.mainGameScreen = mainGameScreen;
    this.health = 3;
    this.left = 0;
    this.top = 0;
    this.height = 0;
    this.width = 0;
    this.directionX = 0; //check if I need to handle movement differently
    this.directionY = 0;
    this.speed = 1;

    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.mainGameScreen.appendChild(this.element);
  }

  setSizeAndPos() {
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    this.left += this.directionX * this.speed;
    this.top += this.directionY * this.speed;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(objectToCollideWith) {
    const mainEntityRect = this.element.getBoundingClientRect();
    const objectToCollideWithRect =
      objectToCollideWith.element.getBoundingClientRect();

    if (
      mainEntityRect.left < objectToCollideWithRect.right &&
      mainEntityRect.right > objectToCollideWithRect.left &&
      mainEntityRect.top < objectToCollideWithRect.bottom &&
      mainEntityRect.bottom > objectToCollideWithRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
