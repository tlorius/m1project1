class Powerup extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.top = 0;
    this.left = 0;
    this.timeCreated = performance.now();
  }

  makeStar() {}

  makeHealthPack() {}

  consumedStar() {}

  consumedHealthPack() {}
}
