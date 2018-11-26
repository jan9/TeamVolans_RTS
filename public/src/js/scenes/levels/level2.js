/*
  Level 2:
    Requires successful completion of level 1
*/
class Level2 extends Phaser.Scene {

  constructor() {
    super({key:'Level2'});
  }

  preload() {

  }

  create() {
    /*createUnitAnims(this);*/

    //this.scene.sendToBack('Level1');
    this.map = this.add.tilemap('map2');
    var tileset =[this.map.addTilesetImage('BackgroundComplete', 'tiles')];
    this.map.createDynamicLayer("Layer1", tileset);
    this.map.createDynamicLayer("Layer2", tileset);
    this.map.createDynamicLayer("Layer3", tileset);

    // sets a boundary for main camera
    this.cameras.main.setBounds(-100, -100, this.map.widthInPixels+200, this.map.heightInPixels+200);
    this.cameras.main.centerOn(_width*1.2, _height*2.75);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    // the parameter values hold true only for level 2 map
    getMiniMap(this, _width*-0.125, _height*0.365, 375, 375, 0.085);
    //getMiniMap(this, -160, 260, 375, 375, 0.085);

    var cursors = this.input.keyboard.createCursorKeys();

    this.input.on('gameobjectdown', onObjectClicked, this.scene);

    var W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    var A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    var D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    var controlConfig = {
        camera: this.cameras.main,
        left: A,
        right: D,
        up: W,
        down: S,
        acceleration: 0.001,
        drag: 0.0005,
        maxSpeed: 0.6
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    currentData = "";
    if (loadingSavedGame === true) {
      switch(loadinglevel) {
        case 1:
          currentData = level1Saved;
          break;
        case 2:
          currentData = level2Saved;
          break;
        case 3:
          currentData = level3Saved;
          break;
      }
      gameMode.name = currentData.gameMode;
      kingdomSelection.name = currentData.kingdomName;
      opponentKingdom = currentData.enemyKingdomName;

    }


    // checking to have received correct data
    console.log(gameMode.name);
    let hardMode = false;
    if(gameMode.name === "hard"){
      hardMode = true;
    }

    var startingObjects = this.map.getObjectLayer("GameObjects").objects;
    if (loadingSavedGame === true) {
      startingObjects = currentData.objects;
    }

    // set up the player kingdom
    console.log(kingdomSelection.name);
    if (kingdomSelection.name === "Dueling Dominion") {
      player = new Kingdom(duelingDominionInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Equal Empire") {
      player = new Kingdom(equalEmpireInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Fortune Federation") {
      player = new Kingdom(fortuneFederationInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Security Syndicate") {
      player = new Kingdom(securitySyndicateInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Remote Realm") {
      player = new Kingdom(remoteRealmInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    };


    // set up the ai kingdom
    console.log(opponentKingdom);
    if (opponentKingdom === "Dueling Dominion") {
      ai = new AIKingdom(duelingDominionInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Equal Empire") {
      ai = new AIKingdom(equalEmpireInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Security Syndicate") {
      ai = new AIKingdom(securitySyndicateInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Remote Realm") {
      ai = new AIKingdom(remoteRealmInfo, 50, 50, this, startingObjects, hardMode);
    };

    //runs every 1 second to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 1000, callback: this.aiUpdate,
    callbackScope: this, loop: true, args: [] });

    playerWon = false;
    currentLevel = 2;
    goto = 'Level3';
    gameStartTime = Date.now();
    if (loadingSavedGame === true) {
      player.gold = currentData.gold;
      player.unitAmount = currentData.unitAmount;
    }
    currentGold = player.gold;
    currentPopulation = player.unitAmount;

    dragSelect(this, player);
    this.pointerInput();

    this.input.keyboard.on('keydown_' + 'P', this.pauseGame, this.scene);
    console.log('[Level2] create() complete');
  }


  update(delta) {
      controls.update(delta);
    // randomly assign different AI?
    if (backToMainMenu === 1 && currentLevel === 2) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }

    ai.updateAIKingdom(player);
    player.updatePlayerKingdom(player);
  }

  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  pauseGame() {
  pauseStartTime = Date.now();
  if (gamePaused === true) {
    this.resume();
    console.log("game resumed");
  }
  else {
    gamePaused = true;
    this.pause();
    console.log("game paused");
  }
}
pointerInput() {
  this.input.on('pointerdown', function(pointer) {
    var structureInfo;
    x = Phaser.Math.RoundAwayFromZero(pointer.worldX);
    y = Phaser.Math.RoundAwayFromZero(pointer.worldY);
    console.log("[Level1] pointerInput() x,y: "+ x +","+y);
},this);
}
}
