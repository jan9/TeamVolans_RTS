class Gameover extends Phaser.Scene {
  constructor() {
    super({key:'Gameover'});
  }

  preload() {
  }

  create() {
    this.scene.sendToBack('Level3');
    currentLevel = 0;
    pausedBeforeQuit =0;
    timer = 0;
    timeElapsed = 0;

    this.scene.setVisible(false,'gameHUD');
    this.scene.stop('gameHUD');
    // add background image
    this.add.image(0,0,'bg_Gameover').setOrigin(0,0).setDisplaySize(_width,_height);
    this.add.image(_width*0.5, _height*0.78,'box').setDisplaySize(_width/2,_height/2.5);
    this.add.image(_width*0.5, _height*0.73, 'gameover');
    var mainButton = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40).setDepth(25);
    mainButton.setInteractive({useHandCursor:true});
    mainButton.on('pointerdown', function() {
        this.scene.start('Title');
    }, this);

    console.log("[Gameover] create() complete");
  }

  update() {

  }

}
