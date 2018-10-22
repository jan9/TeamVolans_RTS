class Load extends Phaser.Scene {

  constructor() {
    super({key:'Load'});
  }

  preload() {
    this.load.image('title_l','assets/UI/sampleSaved.jpg');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.add.image(_width/2,_height/2,'title_l').setDisplaySize(_width-200, _height-200);
    this.buttons();
    console.log('[Load] create() complete');
  }

  update() {

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
