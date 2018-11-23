/*
    Level 1
*/
// global variables

/*
Use below code to disable menu coming up on right-click
CITATION: Code from the following stack overflow answer: https://stackoverflow.com/questions/737022/how-do-i-disable-right-click-on-my-web-page
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);
*/

var x;
var y;
var pointer;
var playerKingdom, aiKingdom;
var controls;
var selectedUnit;
var aiObjectSelected;
var specificPlayerSelected;
var dragSelect_Rect;
class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {

    createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
    createStructureSprites(this); // found in scenes/util/createSpriteImages.js
    createHealthBarSprites(this);

    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
    this.load.image('button', 'Graphics/UI/button/button.png');

  }

  create() {
    createUnitAnims(this);

    this.scene.sendToBack('Load');
    this.map = this.add.tilemap('map');
    var tileset =[this.map.addTilesetImage('Background1', 'tiles1'),
    this.map.addTilesetImage('Background2', 'tiles2'),
    this.map.addTilesetImage('Background5', 'tiles5'),
    this.map.addTilesetImage('water_tile', 'tilesW')];

    this.map.createDynamicLayer("Tile Layer 1", tileset);
    this.map.createDynamicLayer("Tile Layer 2", tileset);
    this.map.createDynamicLayer("Tile Layer 3", tileset);


    // sets a boundary for main camera
    this.cameras.main.setBounds(-100, -100, this.map.widthInPixels+200, this.map.heightInPixels+200);
    this.cameras.main.centerOn(_width*0.5, _height*2.5);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    // the parameter values hold true only for level 1 map
    getMiniMap(this, -160, 260, 400, 400, 0.125);

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

    if (loadingSavedGame === true) {
      gameMode.name = level1Saved.gameMode;
      kingdomSelection.name = level1Saved.kingdomName;
      opponentKingdom = level1Saved.enemyKingdomName;
    }

    // checking to have received correct data
    console.log(gameMode.name);
    let hardMode = false;
    if(gameMode.name === "hard"){
      hardMode = true;
    }

    var startingObjects = this.map.getObjectLayer("GameObjects").objects;
    // starting object if loadingSavedGame is true
    if (loadingSavedGame === true) {
      startingObjects = level1Saved.objects;
    }
    //localStorage.setItem('level1Data', JSON.stringify(data));
    //console.log(startingObjects);
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
    currentLevel = 1;
    goto = 'Level2';
    gameStartTime = Date.now();
    if (loadingSavedGame === true) {
      player.gold = level1Saved.gold;
      player.unitAmount = level1Saved.unitAmount;
    }
    currentGold = player.gold;
    currentPopulation = player.unitAmount;

    dragSelect(this, player);
    this.pointerInput();

    this.input.keyboard.on('keydown_' + 'P', this.pauseGame, this.scene);
    console.log('[Level1] create() complete');
  }


  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  update(delta) {
    controls.update(delta);


    if (backToMainMenu === 1 && currentLevel === 1) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }



    ai.updateAIKingdom(player);
    player.updatePlayerKingdom(player);

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

  test() {
  console.log("I'm in test! I heard 'pause' and paused the game");
}

test2() {
  console.log("I'm in test2! I heard 'resume' and resumed the game");
}

}
