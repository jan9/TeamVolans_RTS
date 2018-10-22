// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class HUD extends Phaser.Scene {

  constructor() {
    super({key:'HUD', active: true});
  }

  preload() {

  }

  create() {

  }

  update() {
    // 10 minute timer
    // resource info update
    //
  }

  youwon() {
    // direct them to play any levels again
  }

  youlost(){
    // direct them to either restart or go back to the start menu
  }

  resizeWindow() {
    // option to make the screen full or small
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
