// Resizing reference: https://github.com/samme/phaser3-faq/wiki#how-do-i-scaleresize-the-game-canvas
// global variables
var _width = window.innerWidth;//screen.width;  // game screen width
var _height = window.innerHeight; //screen.height; // game screen height


// Phaser game config
var config = {
  type: Phaser.AUTO,
  width: _width,
  height: _height,
  pixelArt: true,
  disableContextMenu: true, // disables option menu from right click
  physics: {
    default: 'arcade'
  },
  scene:[Preload,Title,Selection,Load,Level1,Level2,Level3,Gameover,Instructions,gameHUD],
  callbacks: {
    postBoot: function (game) {
      game.canvas.style.width = '100%';
      game.canvas.style.height = '100%';
    }
  }
};

// create a game with resizing ability
window.game = new Phaser.Game(config);
