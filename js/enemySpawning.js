class EnemySpawning {
  constructor() {
    this.currentWave = 0;
    this.waveSpawnDetails = [
      //wavenumber to reference, odds of a slime spawning, odds of a bat spawning, odds of a boss spawning,
      // duration of wave in seconds, frequency of mobs spawning in seconds
      {
        wavenr: "wave1",
        slime: 1,
        bat: 0,
        boss: 0,
        duration: 30,
        spawnFrequency: 1,
      },
      {
        wavenr: "wave2",
        slime: 0.9,
        bat: 0.1,
        boss: 0,
        duration: 30,
        spawnFrequency: 1,
      },
      {
        wavenr: "wave3",
        slime: 0.8,
        bat: 0.2,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.5,
      },
      {
        wavenr: "wave4",
        slime: 0.7,
        bat: 0.3,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.5,
      },
      {
        wavenr: "wave5",
        slime: 0.6,
        bat: 0.4,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.4,
      },
      {
        wavenr: "wave6",
        slime: 0.5,
        bat: 0.5,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.4,
      },
      {
        wavenr: "wave7",
        slime: 0.4,
        bat: 0.6,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.3,
      },
      {
        wavenr: "wave8",
        slime: 0.3,
        bat: 0.7,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.3,
      },
      {
        wavenr: "wave9",
        slime: 0.05,
        bat: 0.95,
        boss: 0,
        duration: 30,
        spawnFrequency: 0.2,
      },
      {
        wavenr: "wave10",
        slime: 0,
        bat: 0,
        boss: 1,
        duration: 60,
        spawnFrequency: 0.01,
      },
    ];
    this.waveCooldownTime = 5; //in seconds
    this.lastEnemySpawnTime = performance.now();
    this.lastWaveEndTime = performance.now();
    this.currentWaveStartTime = performance.now();
    this.timeLeftInCurrentWave = "No Wave active yet";
    this.isWaveActive = false;
    this.hasBossSpawned = false;
  }
  //make sure to check for when 10th wave is finished
  startNewWave(currentTime) {
    const timeSinceLastWaveEnded = currentTime - this.lastWaveEndTime;
    if (
      !this.isWaveActive &&
      timeSinceLastWaveEnded > this.waveCooldownTime * 1000
    ) {
      this.currentWave += 1;
      this.isWaveActive = true;
      this.currentWaveStartTime = currentTime;
    }
  }

  endWave(currentTime) {
    const timeSinceWaveStarted = currentTime - this.currentWaveStartTime;
    //ends wave if theres an active wave and the duration of the current wave is exceeded
    if (
      this.isWaveActive &&
      timeSinceWaveStarted >
        this.waveSpawnDetails[this.currentWave - 1].duration * 1000
    ) {
      this.isWaveActive = false;
      this.lastWaveEndTime = currentTime;
    }
  }
  //outputs the time thats left in the current wave in seconds
  calcTimeLeftInWave(currentTime) {
    if (this.currentWave > 0) {
      this.timeLeftInCurrentWave =
        this.currentWaveStartTime +
        this.waveSpawnDetails[this.currentWave - 1].duration * 1000 -
        currentTime;
      return this.timeLeftInCurrentWave / 1000; //to fixed 2
    } else {
      return 0;
    }
  }

  //if enough time has passed and there is an active wave, we can spawn an enemy in the game
  canEnemySpawn(currentTime) {
    const timeSinceLastSpawn = currentTime - this.lastEnemySpawnTime;
    if (
      this.isWaveActive === true &&
      timeSinceLastSpawn >
        this.waveSpawnDetails[this.currentWave - 1].spawnFrequency * 1000 &&
      this.hasBossSpawned === false
    ) {
      return true;
    } else {
      return false;
    }
  }

  //logic to decide which monster should spawn, odds are predefined per wave
  //result gets randomized: if enemy has odds of 1, it will always spawn, if it has odds of 0 it will never spawn in that wave
  randomizeSpawn(currentTime) {
    const slimeSpawnResult =
      Math.random() * this.waveSpawnDetails[this.currentWave - 1].slime;
    const batSpawnResult =
      Math.random() * this.waveSpawnDetails[this.currentWave - 1].bat;
    const bossSpawnResult = this.waveSpawnDetails[this.currentWave - 1].boss;

    this.lastEnemySpawnTime = currentTime;
    // using >= to ensure even if both slime an bat roll a 0, then you will still spawn a slime;
    // boss only gets spawned in the last wave, so removing the randomness of boss spawn
    if (
      slimeSpawnResult >= batSpawnResult &&
      slimeSpawnResult >= bossSpawnResult
    ) {
      return "slime";
    } else if (batSpawnResult >= bossSpawnResult) {
      return "bat";
    } else {
      this.hasBossSpawned = true;
      return "boss";
    }
  }
}
