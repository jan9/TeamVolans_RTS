/*
    Level 1
*/
// global variables

var x;
var y;
var pointer;
var playerKingdom, aiKingdom;
var controls;
var selectedUnit;
class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {

    createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
    createStructureSprites(this); // found in scenes/util/createSpriteImages.js
    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
    this.load.image('button', 'assets/UI/button/button.png');

  }

  create() {
    createUnitAnims(this);

    this.scene.sendToBack('Selection');
    this.map = this.add.tilemap('map');
    var tileset =[this.map.addTilesetImage('Background1', 'tiles1'),
    this.map.addTilesetImage('Background2', 'tiles2'),
    this.map.addTilesetImage('Background5', 'tiles5'),
    this.map.addTilesetImage('water_tile', 'tilesW')];

    this.map.createDynamicLayer("Tile Layer 1", tileset);
    this.map.createDynamicLayer("Tile Layer 2", tileset);
    this.map.createDynamicLayer("Tile Layer 3", tileset);

    this.physics.world.setBounds(0,0,50,50);
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    var cursors = this.input.keyboard.createCursorKeys();

    this.input.on('gameobjectdown', onObjectClicked);

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

    // checking to have received correct data
    console.log(gameMode.name);

    // set up the player kingdom
    console.log(kingdomSelection.name);
    if (kingdomSelection.name === "Dueling Dominion") {
      player = new Kingdom(duelingDominionInfo, _width*0.9, _height*0.9, this);
    } else if (kingdomSelection.name === "Equal Empire") {
      player = new Kingdom(equalEmpireInfo, _width*0.9, _height*0.9, this);
    } else if (kingdomSelection.name === "Fortune Federation") {
      player = new Kingdom(fortuneFederationInfo, _width*0.9, _height*0.9, this);
    } else if (kingdomSelection.name === "Security Syndicate") {
      player = new Kingdom(securitySyndicateInfo, _width*0.9, _height*0.9, this);
    } else if (kingdomSelection.name === "Remote Realm") {
      player = new Kingdom(remoteRealmInfo, _width*0.9, _height*0.9, this);
    };

    // set up the ai kingdom
    console.log(opponentKingdom);
    if (opponentKingdom === "Dueling Dominion") {
      ai = new AIKingdom(duelingDominionInfo, 50, 50, this);
    } else if (opponentKingdom === "Equal Empire") {
      ai = new AIKingdom(equalEmpireInfo, 50, 50, this);
    } else if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);
    } else if (opponentKingdom === "Security Syndicate") {
      ai = new AIKingdom(securitySyndicateInfo, 50, 50, this);
    } else if (opponentKingdom === "Remote Realm") {
      ai = new AIKingdom(remoteRealmInfo, 50, 50, this);
    };


    //runs every 10 seconds to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 10000, callback: this.aiUpdate,
    callbackScope: this, loop: true, args: [] });

    playerWon = false;
    currentLevel = 1;
    goto = 'Level2';
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;
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
    this.addBuildings();
    ai.updateAIKingdom(player);

  }



  // adds buildings to the current player's kingdom
  // TODO: building images need to be corrected,
  // TODO: building time needs to be reflected,
  // TODO: building cost needs to be reflected
  addBuildings() {
    this.input.on('pointerdown', function(pointer) {
      x = pointer.x;
      y = pointer.y;
      if (build_signal === 1) {
        player.buildings.push(new Structure(archeryRangeInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= archeryRangeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= machineryInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= mineInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= templeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this).setInteractive());
        player.buildingsAmount++;
        currentGold -= townCenterInfo.cost;
        build_signal = 0;
      }
    },this);
  }
}
