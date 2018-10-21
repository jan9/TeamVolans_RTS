var gameScene = new Phaser.Scene('Title');

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Title, NewGame, Load, Instructions, TestAI]
}

var game = new Phaser.Game(config);
