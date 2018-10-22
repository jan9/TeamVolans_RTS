/*
  Level 3: a water and grass map
    Requires successful completion of level 2
*/
class Level3 extends Phaser.Scene {

  constructor() {
    super({key:'Level3'});
  }

  preload() {
    this.load.image('map3','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.add.image(screen.width/3, screen.height/3, 'map3');
    this.buttons();
    this.add.text(100,100,'in level3');

    // checking to have received correct data
    console.log(gameMode.name);
    console.log(kingdomSelection.name);

    console.log('[Level3] create() complete');
  }

  buttons() {
  var style = { fontSize: '15px', fontFamily: 'Georgia', color: '#ffffff'};
  // button for going back to the main menu
  var button1 = this.add.sprite(0,0,'button');
  var text1 = this.add.text(10, 3, "Main Menu", style).setOrigin(0,0);
  button1.setInteractive({useHandCursor:true});
  button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
