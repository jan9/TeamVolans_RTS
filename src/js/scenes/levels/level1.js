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
var ai;
var player;

class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {
    this.load.image('map1','assets/UI/sampleMap.png');
    this.load.image('background1','Graphics/TileSets/Background1.png');
    this.load.image('background2','Graphics/TileSets/Background2.png');
    this.load.image('background3','Graphics/TileSets/Background3.png');
    this.load.image('water','Graphics/TileSets/water.png');
    this.load.image('sprite1','Graphics/TileSets/sprite1.png');
    this.load.image('background5','Graphics/TileSets/Background5.png');
    this.load.tilemapTiledJSON('map','Graphics/maps/Level_1..json');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('archer', 'assets/UI/samplePlayer.png');
  }

  create() {
    this.add.image(screen.width, screen.height, 'map1');
    this.buttons();
    /* todo: use tileset and tilemap
    var map = this.make.tilemap({ key: 'map' });

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    var tiles = map.addTilesetImage('background', 'tiles');

    // You can load a layer from the map using the layer name from Tiled, or by using the layer
    // index (0 in this case).
    var layer = map.createStaticLayer(0, tiles, 0, 0);

    */
    // have a message box?
    this.add.text(100,100,'in level1');

    // checking to have received correct data
    console.log(gameMode.name);
    console.log(kingdomSelection.name);
    console.log(opponentKingdom);

    // set up the player kingdom


    /* set up the AI kingdom
    if (kingdomSelection.name === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);};
    */

    console.log('[Level1] create() complete');
  }

  update() {
    // 10 minute timer
    // proceed to the next level if successfully complete:
    //
    // player movement
  }

  buttons() {
    var style = { fontSize: '15px', fontFamily: 'Georgia', color: '#ffffff'};
    // button for going back to the main menu
    var button1 = this.add.sprite(0,0,'button');
    var text1 = this.add.text(10, 3, "Main Menu", style).setOrigin(0,0);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);

    var button2 = this.add.sprite(400,300,'button');
    var text2 = this.add.text(400, 300, "To level 2", style).setOrigin(0,0);
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level2');}, this);

  }
}
