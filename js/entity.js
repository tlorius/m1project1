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

    this.element = document.createElement("img");
    //this.element.src = "";
    this.element.style.position = "absolute";
    this.mainGameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
  }
}
