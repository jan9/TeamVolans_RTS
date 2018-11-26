class Instructions extends Phaser.Scene {

  constructor() {
    super({key:'Instructions'});
  }

  preload() {
  }

  create() {
    this.add.image(_width/2.7,_height/2,'title_bg').setAlpha(0.8);
    homeButton(this);
    this.instruction_guide();
    console.log('[Instructions] create() complete');
  }

  update() {
      currentLevel = 0;
      check_gameover = 0;
      if (backToMainMenu === 1) {
        backToMainMenu = 0;
        this.scene.start('Title');
      }
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
