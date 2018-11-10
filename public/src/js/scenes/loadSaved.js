class Load extends Phaser.Scene {

  constructor() {
    super({key:'Load'});
  }

  preload() {
    this.load.image('title_l','Graphics/UI/sampleSaved.jpg');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    this.add.image(_width/2,_height/2,'title_l').setDisplaySize(_width-200, _height-200);
    this.homeButton();
    console.log('[Load] create() complete');
  }

  update() {
    currentLevel = 0;
    check_gameover = 0;
  }

  homeButton() {
    // button for going back to the main menu
    var homeButton = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
    homeButton.setInteractive({useHandCursor:true});
    homeButton.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
