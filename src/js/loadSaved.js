class Load extends Phaser.Scene {

  constructor() {
    super({key:'Load'});
  }

  preload() {
    this.load.image('title_l','assets/sample1.jpg');
    this.load.image('button', 'assets/button/button.png');
  }

  create() {
    console.log('in Load');
    this.add.image(400,300,'title_l');
    var style = {
        fontSize: '15px',
        fontFamily: 'Georgia',
        color: '#ffffff'
    };

    // button for going back to the main menu
    var button = this.add.sprite(0,0,'button');
    var text = this.add.text(0,0, "Main Menu", style).setOrigin(0,0);
    button.setInteractive({useHandCursor:true});
    button.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
