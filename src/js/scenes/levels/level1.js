/*
  Level 1: a grass map

Pause a game: http://labs.phaser.io/edit.html?src=src\scenes\pause%20and%20resume.js
/*  this.input.once('pointerup', function () {

  this.scene.pause();
}, this);

adding a building or unit: http://labs.phaser.io/edit.html?src=src\input\pointer\down%20event.js

*/
// https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
// global variables
var build_signal = 0; // 1 is build
var x;
var y;
var pointer;
var playerKingdom, aiKingdom;
class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {

    createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
    createStructureSprites(this); // found in scenes/util/createSpriteImages.js
    this.load.image('map1','assets/UI/sampleMap.png');
    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1.json');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('archer2', 'assets/UI/samplePlayer.png');
  }

  create() {

    this.map = this.add.tilemap('map');
    var tileset =[this.map.addTilesetImage('Background1', 'tiles1'),
    this.map.addTilesetImage('Background2', 'tiles2'),
    this.map.addTilesetImage('hyptosis_til-art-batch-2', 'tiles5'),
    this.map.addTilesetImage('watertileset3qb2tg0', 'tilesW')];

    this.map.createDynamicLayer("Tile Layer 1", tileset);
    this.map.createDynamicLayer("Tile Layer 2", tileset);
    this.map.createDynamicLayer("Tile Layer 3", tileset);

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    // checking to have received correct data
    console.log(gameMode.name);

    // set up the player kingdom
    console.log(kingdomSelection.name);
    player = new Kingdom(fortuneFederationInfo, 100, -150, this);

    // set up the ai kingdom
    console.log(opponentKingdom);

    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);
    /* For testing purpose, all AI kingdom are Fortune Federation
    if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);
    };
    */
    currentLevel = 1;
    goto = 'Level2';
    gameStartTime = Date.now();
    console.log('[Level1] create() complete');
  }

  update() {
    if (backToMainMenu === 1 && currentLevel === 1) {
      this.scene.start('Title');
      backToMainMenu = 0;
    }
    this.addBuildings();

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
        player.buildings.push(new Structure(archeryRangeInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
    },this);
  }
}
