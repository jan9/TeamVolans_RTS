class Gameover extends Phaser.Scene {
  constructor() {
    super({key:'Gameover'});
  }

  preload() {
    this.load.image('bg_Gameover','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('gameover','Graphics/UI/Game-Over (1).png');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    // add background image
    this.add.image(0,0,'bg_Gameover').setOrigin(0,0).setDisplaySize(_width,_height);
    this.add.image(_width*0.5, _height*0.78,'box').setDisplaySize(_width/2,_height/2.5);
    this.add.image(_width*0.5, _height*0.73, 'gameover');
    this.homeButton();
    console.log("[Gameover] create() complete");
  }

  update() {
    currentLevel = 0;
  }
  homeButton() {
    var homeButton = this.add.sprite(_width*0.4, _height*0.82,'mainmenuButton').setOrigin(0,0).setDisplaySize(240,80);
    homeButton.setInteractive({useHandCursor:true});
    homeButton.on('pointerdown', function(pointer) { this.scene.start('Title');}, this);
  }
}
