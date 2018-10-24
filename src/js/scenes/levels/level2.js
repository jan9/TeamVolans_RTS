/*
  Level 2: a snow map
    Requires successful completion of level 1
*/
class Level2 extends Phaser.Scene {

  constructor() {
    super({key:'Level2'});
  }

  preload() {
    this.load.image('map2','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    this.add.image(screen.width/4, screen.height/4, 'map2');
    //this.buttons();
    this.add.text(100,100,'in level2');

    // checking to have received correct data
    console.log(gameMode.name);
    console.log(kingdomSelection.name);
    console.log(opponentKingdom);

    console.log('[Level2] create() complete');
  }

  update() {
    // randomly assign different AI?
    if (backToMainMenu === 1) {
      this.scene.restart('Title');
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
    button2.on('pointerdown', function(pointer) {this.scene.start('Level3');}, this);
  }
}
