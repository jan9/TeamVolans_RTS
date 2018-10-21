
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
    ai = new AIKingdom(fortuneFederationInfo, 30, 30, this);
    console.log(ai);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  }

  update(){
      ai.updateAIKingdom();
  }
}
