class Load extends Phaser.Scene {

  constructor() {
    super({key:'Load'});
  }

  preload() {
    this.load.image('title_l','assets/UI/sampleSaved.jpg');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    this.add.image(_width/2,_height/2,'title_l').setDisplaySize(_width-200, _height-200);
    this.buttons();
    console.log('[Load] create() complete');
  }

  update() {

  }

  buttons() {
    // button for going back to the main menu
    var button1 = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
