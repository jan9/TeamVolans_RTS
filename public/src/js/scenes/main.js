// global variables
var _width = window.innerWidth;//screen.width;  // game screen width
var _height = window.innerHeight - 30; //screen.height; // game screen height

// Phaser game config
const config = {
  type: Phaser.AUTO,
  width: _width,
  height: _height,
  pixelArt: true,
  disableContextMenu: true, // disables option menu from right click
  physics: {
    default: 'arcade'
  },
  scene:[Preload,Title,Selection,Load,Level1,Level2,Level3,Gameover,Instructions,gameHUD]
}

// create a game
const game = new Phaser.Game(config);
