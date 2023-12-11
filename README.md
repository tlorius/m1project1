# Ironhack Project 1: The lone guardian of the galaxy <img src="images/player_down.png" width="30">

[Click here to see deployed game](https://tlorius.github.io/lone-guardian-game/)

<img src="images/rocket_wink.gif" width="120">

## Description

The lone guardian of the galaxy is a game in which the player has to defend himself from incoming hoards of enemies. The player collects score and experience while defeating foes. Levels gained with experience grant skillpoints to level up the players weapons and make him stronger overall. The game ends when the player loses all their health or if they manage to defeat the final boss.

## MVP - Main functionalities

- The player can move withing the boundry of the background using `wasd`
- The player has the ability to shoot at enemies in 4 directions using `arrowkeys`
- Shooting creates a projectile that interacts with enemies on collision
- The projectile needs to spawn with trajectory in the direction the player is aiming
- One type of enemy: slime to be walking in random directions accross the playable area
- Player loses health if they hit by the enemies
- Enemies spawn infinitely in set intervals until the game is over
- Player receives score based on the enemies killed
- Game over screen displays reached score
- Background audio playing to underline the gameplay
- Game user interface displaying current score and player health

## Backlog

- Shooting can now combine 2 directions to allow for 8 directional shooting
- Allow player speed to be adjusted dynamically
- Adding a faster enemy type: bat which has lower health
- Adding a very slow boss enemy type: removes all the players health instantly
- Enemies track player movement and follow them
- Enemies spawn in waves with cooldown periods inbetween
- The waves have increasing difficulty due to the type of enemies that spawn in them and the frequency they spawn with
- The 10th wave includes a boss fight
- Enemies spawn with randomized health and in randomized(but preset) locations
- Current enemy health determines their size
- Enemies shrink if they take damage from the player
- Highscores are now stored using localStorage
- The game over screen includes an input field for the players name
- The game over screen displays the 10 highest locally stored highscores
- Powerups can spawn at random intervals that either: provide the player with additional health or make them invincible for a short amount of time
- Player image updates based on the direction the player is aiming
- **Game user interface displaying**:
- Current wave
- Time left in wave
- Time left during invincibility powerup
- Boss health bar, boss name
- Current level, experience bar
- Available skillpoints, current damage per bullet, bullets shot per second
- Leveling system in which the player receives experience per defeated enemy
- Collecting enough experience the player will level up and for certain level thresholds they will receive skillpoints
- Skillpoints can be used to update your weapon damage with `spacebar` and weapon attack speed with `left shift`
- Bullets spawn with a different color depending on the damage upgrades used
- Pause screen that allows you to pause and unpause the gameloop
- Created prerequisites for changable keybinds but no function to change them yet
- Demo mode: sets player to later wave to reach boss fight faster

## Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Local Storage
- JS Classes

## States

- Intro Screen
- Game Screen
- Pause Screen
- Game Over Screen

# Project Structure

## script.js

- stopMainMenuMusic()
- startNewGame()

**Managing EventListeners**

## game.js

- **Game**()

  - this.introScreen
  - this.mainGameScreen
  - this.gameOverScreen
  - this.gamePauseScreen
  - this.highscoreScreen
  - this.toolTipsUi

  - this.bossBarBorder
  - this.bossBar
  - this.bossName
  - this.experienceBar
  - this.highscoreList
  - this.starTimer
  - this.waveTimer
  - this.waveUi

  - this.invincibleSound
  - this.playerReceiveDamageSound
  - this.gameplayMusic
  - this.bossMusic
  - this.mainMenuMusic
  - this.pauseMusic

  - this.settings
  - this.enemySpawning
  - this.player
  - this.height
  - this.width
  - this.enemies
  - this.projectiles
  - this.powerUps
  - this.gameLoopAnimationId
  - this.gameState
  - this.isGamePaused
  - this.highscores
  - this.currentPlayerHighscoreName
  - this.demoModeActive

- sortHighscoresAndReturnTopTen(scoreArray)
- getHighscores()
- saveHighscoresAndDisplayList()
- stopSound(audioElement)
- playSound(audioElement, volume, duration)
- startGame()
- purgeEnemies(enemiesToPurge)
- purgePowerUps(powerUpsToPurge)
- updateBossBar()
- updateExperienceBar()
- gameLoop()

**Managing Game State**
**Managing Sounds**
**Managing interaction between player, projectiles, enemies and powerups during the gameloop**

## settings.js

- **Settings**(gamePauseScreen)
  - this.keybindMoveUp
  - this.keybindMoveDown
  - this.keybindMoveLeft
  - this.keybindMoveRight
  - this.keybindAimUp
  - this.keybindAimDown
  - this.keybindAimLeft
  - this.keybindAimRight
  - this.keybindLevelUpDmg
  - this.keybindLevelUpAtkSpeed
- restoreDefaultKeybinds()

## entity.js

- **Entity**(mainGameScreen)
  - this.mainGameScreen
  - this.health
  - this.left
  - this.top
  - this.height
  - this.width
  - this.directionX
  - this.directionY
  - this.speed
- updateSize()
- setInitialPos()
- move()
- didCollide(objectToCollideWith)
- stopSound(audioElement)
- playSound(audioElement, volume, duration)

## player.js

- **Player**(mainGameScreen) extends **Entity**(mainGameScreen)

  - super(mainGameScreen)
  - this.levelUpSound
  - this.left
  - this.top
  - this.height
  - this.width
  - this.directionX
  - this.directionY
  - this.aimingUp
  - this.aimingLeft

  - this.score
  - this.experience
  - this.level
  - this.skillPointsAvailable
  - this.speed
  - this.health
  - this.shootingOnCooldown
  - this.shootingCooldownInSeconds
  - this.powerUpOnCooldown
  - this.powerUpCooldownInSeconds
  - this.bulletDamage
  - this.isInvincible
  - this.timeWhenStarConsumed

- aim()
- move()
- shooting()
- gainExperience(experienceGained)
- levelUp()
- upgradeWeaponDmg()
- upgradeWeaponSpeed()
- canPowerUpSpawn()
- consumedStarPowerUp(currentTime)
- takeDamageImage()

## projectile.js

- **Projectile**(mainGameScreen, playerLeft, playerTop, aimingUp, aimingLeft, damageValue, isPlayerInvincible) extends **Entity**(mainGameScreen)
  - this.left
  - this.top
  - this.directionY
  - this.directionX
  - this.speed
  - this.height
  - this.width
  - this.damage

## enemy.js

- **Enemy**(mainGameScreen) extends **Entity**(mainGameScreen)
  - super(mainGameScreen)
  - this.healthSeed
  - this.spawnSeed
  - this.spawnPoints
  - this.left
  - this.top
  - this.angleToPlayer
- diedFromReceivedDamage(damage)
- trackPlayerPosition(playerTop, playerLeft, playerHeight, playerWidth)
- move()

## enemySlime.js

- **EnemySlime**(mainGameScreen) extends **Enemy**(mainGameScreen)
  - super(mainGameScreen)
  - this.health
  - this.height
  - this.width
  - this.speed
  - this.pointsReceivedIfKilled
  - this.experienceIfKilled
- updateSizeBasedOnNewHealth()

## enemyBat.js

- **EnemyBat**(mainGameScreen) extends **Enemy**(mainGameScreen)
  - super(mainGameScreen)
  - this.health
  - this.height
  - this.width
  - this.speed
  - this.pointsReceivedIfKilled
  - this.experienceIfKilled
- updateSizeBasedOnNewHealth()

## enemyBoss.js

- **EnemyBoss**(mainGameScreen) extends **Enemy**(mainGameScreen)
  - super(mainGameScreen)
  - this.health
  - this.maxHealth
  - this.top
  - this.left
  - this.height
  - this.width
  - this.speed
  - this.pointsReceivedIfKilled
  - this.experienceIfKilled

## enemySpawning.js

- **EnemySpawning**()
  - this.currentWave
  - this.waveSpawnDetails
  - this.waveCooldownTime
  - this.lastEnemySpawnTime
  - this.lastWaveEndTime
  - this.currentWaveStartTime
  - this.timeLeftInCurrentWave
  - this.isWaveActive
  - this.hasBossSpawned
- startNewWave(currentTime)
- endWave(currentTime)
- calcTimeLeftInWave(currentTime)
- canEnemySpawn(currentTime)
- randomizeSpawn(currentTime)

## powerup.js

- **Powerup**(mainGameScreen)
  - super(mainGameScreen)
  - this.top
  - this.left
  - this.timeCreated
  - this.typeRandomizer
- makeStar()
- makeHealthPack()

## Links

- [Trello Link](https://trello.com/b/zU9c9cam/the-lone-guardian-of-the-galaxy)
- [Slides Link](https://docs.google.com/presentation/d/1FjjwWV8M4eejIU-FOURFpyHAOxHYBINHO89rit4Me5I/edit#slide=id.g2a36108818a_0_10)
- [Github repository Link](https://github.com/tlorius/lone-guardian-game)
- [Deployment Link](https://tlorius.github.io/lone-guardian-game/)
