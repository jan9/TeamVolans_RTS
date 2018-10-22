class Instructions extends Phaser.Scene {

  constructor() {
    super({key:'Instructions'});
  }

  preload() {
    this.load.image('logo','assets/UI/Medieval-Mayhem.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
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
    var instructions = this.add.text(80, 200,
      'Welcome to Medieval Mayhem!\nHere is how you play the game:\n' +
      '1. Choose a game mode\n' +
      '2. Destroy all the enemys castles to win\n' +
      'To control your units, drage with the left mouse to select and right click to move\n',
      { font: '25px Roboto' });
  }

}
