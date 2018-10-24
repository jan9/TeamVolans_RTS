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
var buildArcheryRange = 0;
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
    this.load.spritesheet('mine',
       'Graphics/buildings/gold_mine.png',
       { frameWidth: 96, frameHeight: 96 }
   );
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('archer', 'assets/UI/samplePlayer.png');
  }

  create() {
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    let map = this.add.image(screen.width, screen.height, 'map1');


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
    // have a message box?
    this.add.text(100,100,'in level1');

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

      // TODO: work on getting the pointer XY position
      this.input.on('pointerdown', function(pointer) {
        x = pointer.x;
        y = pointer.y;
        if (buildArcheryRange === 1) {
          player.buildings.push(new Structure(archeryRangeInfo, x, y, this, 'mine'));
          player.buildingsAmount++;
          buildArcheryRange = 0;
        }
      },this);




    if (backToMainMenu === 1) {
      this.scene.start('Title');
      backToMainMenu = 0;
    }
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
