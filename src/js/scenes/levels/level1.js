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
//var pointer;
var x;
var y;
var pointer;
class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {
    this.load.image('map1','assets/UI/sampleMap.png');
    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('archer', 'assets/UI/samplePlayer.png');
    this.load.spritesheet('mine','Graphics/buildings/gold_mine.png',{ frameWidth: 96, frameHeight: 96 });
  }

  create() {
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    let map1 = this.add.image(screen.width, screen.height, 'map1');
    //const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    //const tileset = map.addTilesetImage("tiles");


    //this.buttons();
    /* todo: use tileset and tilemap
    var map = this.make.tilemap({ key: 'map' });

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    var tiles = map.addTilesetImage('background', 'tiles');

    // You can load a layer from the map using the layer name from Tiled, or by using the layer
    // index (0 in this case).
    var layer = map.createStaticLayer(0, tiles, 0, 0);

    */


    // checking to have received correct data
    console.log(gameMode.name);

    // set up the player kingdom
    console.log(kingdomSelection.name);
    player = new Kingdom(fortuneFederationInfo, 100, -150, this);

    console.log(opponentKingdom);
    if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);};



    console.log('[Level1] create() complete');
  }

  update() {
    if (backToMainMenu === 1) {
      this.scene.start('Title');
      backToMainMenu = 0;
    }
    this.addBuildings();
  }

  buttons() {
    var button2 = this.add.sprite(400,300,'button');
    var text2 = this.add.text(400, 300, "To level 2", style).setOrigin(0,0);
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level2');}, this);

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
        player.buildings.push(new Structure(archeryRangeInfo, x, y, this, 'archer'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this, 'mine'));
        player.buildingsAmount++;
        build_signal = 0;
      }
    },this);
  }



}
