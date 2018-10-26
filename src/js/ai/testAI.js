
var ai;
var ai2;
var clock;
class TestAI extends Phaser.Scene {

  constructor() {
    super({key:'TestAI'});
  }


  preload() {
    this.load.spritesheet('square_unit',
       'assets/units/blue_square.png',
       { frameWidth: 16, frameHeight: 16 }
   );

   createUnitSprites(this);
   createStructureSprites(this);
  }


  create() {



    createUnitAnims(this);

    this.physics.start();

    player = this.physics.add.sprite(100, 450, 'archer');
    player.anims.play('archerWalkN');


    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);
    ai2 = new AIKingdom(fortuneFederationInfo, 400, 400, this);

    console.log('[TestAI]:');
    console.log(ai);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.buttons();

    //runs every 10 seconds to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 10000, callback: this.aiUpdate,
      callbackScope: this, loop: true, args: [ai, ai2] });

      //runs every 10 seconds to get the ai priority attack locations
      var aiEvent = this.time.addEvent({ delay: 10000, callback: this.aiUpdate,
        callbackScope: this, loop: true, args: [ai2, ai] });

    //outputs to the console the kingdom info for testing purposes
    var outputInfo = this.time.addEvent({ delay: 20000, callback: this.outputTestingInfo,
        callbackScope: this, loop: true, args: [] });
  }

//updates the target list of the ai (done every 10 seconds)
aiUpdate(aiKingdom, playerKingdome){
  aiKingdom.updateCurrentTargetList(playerKingdome);
}
  outputTestingInfo(){
    console.log(ai);
  }
  update(){

      ai.updateAIKingdom();
      ai2.updateAIKingdom();
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
