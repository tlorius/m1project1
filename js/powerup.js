class Powerup extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.top = Math.floor(Math.random() * 500) + 50;
    this.left = Math.floor(Math.random() * 500) + 50;
    this.timeCreated = performance.now();
    this.typeRandomizer = Math.random() > 0.9 ? "star" : "healthpack"; //90% chance to spawn healthpack instead of star
    this.setInitialPos();
  }

  makeStar() {
    this.height = 26.7;
    this.width = 28;
    this.updateSize();
    this.element.src = "images/star.png";
  }

  makeHealthPack() {
    this.height = 21;
    this.width = 28;
    this.updateSize();
    this.element.src = "images/healthpack.png";
  }
}
