class EnemyBoss extends Enemy {
  constructor(mainGameScreen) {
    super(mainGameScreen);
    this.health = 2000;
    this.maxHealth = this.health;
    this.top = 700;
    this.left = 230;
    this.height = 241;
    this.width = 308;
    this.speed = 40;
    this.pointsReceivedIfKilled = 50000;
    this.experienceIfKilled = 100;

    this.element.src = "images/enemy_boss.png";
    this.updateSize();
    this.setInitialPos();
  }
}

/*Right now the boss has the same movement logic as all the other mobs
Boss should have an ability with a cooldown to stand still and throw rocks/spit at the player
think about if there should be different levels of accuracy and speed of the projectile based off reached wave and selected difficulty
boss move method needs a variable = isCastingAbility. Then he wont be able to move.

*/
