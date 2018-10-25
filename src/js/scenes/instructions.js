class Instructions extends Phaser.Scene {

  constructor() {
    super({key:'Instructions'});
  }

  preload() {
    this.load.image('title_bg','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.add.image(_width/2.7,_height/2,'title_bg').setAlpha(0.8);
    this.buttons();
    this.instruction_guide();
    console.log('[Instructions] create() complete');
  }

  buttons() {
    var style = { fontSize: '15px', fontFamily: 'Georgia', color: '#ffffff'};
    // button for going back to the main menu
    var button1 = this.add.sprite(0,0,'button');
    var text1 = this.add.text(10, 3, "Main Menu", style).setOrigin(0,0);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }

  instruction_guide() {
    // TODO add what keys and mouse controls needed to play the game
    var content = [
      'Welcome! Here is how you play the game:\n',
      '1. Choose a game mode\n',
      '2. Destroy all the enemy castles to win',
      '',
      'To control your units, drag with ? to select and ? to move units'
    ];
    this.add.text(_width*0.27, _height*0.5, content, { font: '25px Georgia', align: 'left', linespacing: 20});
  }

}
