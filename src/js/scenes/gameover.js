class Gameover extends Phaser.Scene {
  constructor() {
    super({key:'Gameover'});
  }

  preload() {
    this.load.image('bg_Gameover','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    //backToMainMenu = 0;
    this.scene.setVisible(false,'gameHUD');
    // add background image
    this.add.image(0,0,'bg_Title').setOrigin(0,0).setDisplaySize(_width,_height);

    this.homeButton();
    console.log("[Gameover] create() complete");
  }

  update() {
  }

  homeButton() {
    // button for going back to the main menu
    var homeButton = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
    homeButton.setInteractive({useHandCursor:true});
    homeButton.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
