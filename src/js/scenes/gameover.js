class Gameover extends Phaser.Scene {
  constructor() {
    super({key:'Gameover'});
  }

  preload() {
    this.load.image('bg_Title','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('box','Graphics/screens/start_screen/StartScreen_Box.png');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    // add background image
    this.add.image(0,0,'bg_Title').setOrigin(0,0).setDisplaySize(_width,_height);
    // add a box where the buttons are going to overlay
    this.add.image(_width*0.5, _height*0.78,'box').setDisplaySize(_width/2,_height/2.5);
    // add the buttons
    this.buttons();
    console.log("[Gameover] create() complete");
  }

  update() {
    // when redirected to the titlescreen, restart the page

  }

  /* Helper functions  */
  buttons() {
    // button for starting a new game
    var button1 = this.add.sprite(_width*0.5, _height*0.675, 'Button_MainMenu');
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }

}
