class Powerup extends Entity {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.top = 0;
    this.left = 0;
  }

  makeStar() {}

  makeHealthPack() {}

  makeRandomEffect() {}

  consumedStar() {}

  consumedHealthPack() {}

  consumedRandomEffect() {}
}
