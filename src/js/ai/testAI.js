
var ai;

class TestAI extends Phaser.Scene {

  constructor() {
    super({key:'TestAI'});
  }


  preload() {
    this.load.spritesheet('square_unit',
       'assets/units/blue_square.png',
       { frameWidth: 16, frameHeight: 16 }
   );
  }


  create() {
    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);
    console.log('[TestAI]:');
    console.log(ai);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.buttons();
  }

  update(){
      ai.updateAIKingdom();
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
  }
}
