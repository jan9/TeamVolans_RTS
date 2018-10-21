class Selection extends Phaser.Scene {

  constructor() {
    super({key:'Selection'});
  }

  preload() {
    this.load.image('title_g','assets/UI/sampleSelection.jpg');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.add.image(400,300,'title_g');
    this.buttons();
    console.log('[Selection] create() complete');

    }

  buttons() {
    var style = {
        fontSize: '15px',
        fontFamily: 'Georgia',
        color: '#ffffff'
    };

    // button for going back to the main menu
    var button1 = this.add.sprite(0,0,'button');
    var text1 = this.add.text(0, 0, "Main Menu", style).setOrigin(0,0);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);

    // button directed to level 1
    var button2 = this.add.sprite(400,300,'button');
    var text2 = this.add.text(400, 300, "Start", style).setOrigin(0,0);
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level1');}, this);

  }
}
