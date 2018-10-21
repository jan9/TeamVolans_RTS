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
var archer1;
var archeryRange;

class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {
    this.load.image('map1','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('archer', 'assets/UI/samplePlayer.png');
  }

  create() {
    this.add.image(screen.width/2, screen.height/2, 'map1');
    this.buttons();
    this.add.text(100,100,'in level1');

    archer1 = new Archer(this, 340, 32, 'archer', 1, '1');
    this.add.existing(archer1);


    console.log(archer1);




    console.log('[Level1] create() complete');
  }

  update() {
    // 10 minute timer
    // resource info update
    //
  }

  buttons() {
    var style = {
      fontSize: '15px',
      fontFamily: 'Georgia',
      color: '#ffffff'
    };

    // button for going back to the main menu
    var button1 = this.add.sprite(0,0,'button');
    var text1 = this.add.text(0,0, "Main Menu", style).setOrigin(0,0);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);

    var button2 = this.add.sprite(400,300,'button');
    var text2 = this.add.text(400, 300, "To level 2", style).setOrigin(0,0);
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level2');}, this);

  }
}
