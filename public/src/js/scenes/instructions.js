class Instructions extends Phaser.Scene {

  constructor() {
    super({key:'Instructions'});
  }

  preload() {
    this.load.image('title_bg','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
  }

  create() {
    this.add.image(_width/2.7,_height/2,'title_bg').setAlpha(0.8);
    this.buttons();
    this.instruction_guide();
    console.log('[Instructions] create() complete');
  }

  update() {
      currentLevel = 0;
      check_gameover = 0;
  }
  buttons() {
    var button1 = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }

  instruction_guide() {
    // TODO add what keys and mouse controls needed to play the game
    var content = [
      'Welcome! Here is how you play the game:\n',
      '  1. Select a kingdom and difficulty setting of your AI opponent\n',
      '  2. Destroy all the enemy castles to win\n',
      '  3. If the amount of castles are the same,\n',
      '     then the kingdom with most number of gold wins'
    ];
    this.add.text(_width*0.25, _height*0.5, content, { font: '20px Georgia', align: 'left', linespacing: 10});
    this.add.text(_width*0.10, _height*0.9, 'Use the left mouse button to create your buildings and units, and the WASD keys to move aroud the map.', { font: '20px Georgia', align: 'center', linespacing: 10});

  }

}
