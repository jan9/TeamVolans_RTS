// global variables
var _width = window.innerWidth;//screen.width;  // game screen width
var _height = window.innerHeight - 30; //screen.height; // game screen height

// Phaser game config
const config = {
  type: Phaser.AUTO,
  width: _width,
  height: _height,
  physics: {
    default: 'arcade'
  },
  scene:[Title,Selection,Load,Instructions,Level1,Level2,Level3,TestAI,gameHUD, Gameover]
}

// create a game
const game = new Phaser.Game(config);
