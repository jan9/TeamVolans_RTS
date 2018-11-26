class Gameover extends Phaser.Scene {
  constructor() {
    super({key:'Gameover'});
  }

  preload() {

  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    // add background image
    this.add.image(0,0,'bg_Gameover').setOrigin(0,0).setDisplaySize(_width,_height);
    this.add.image(_width*0.5, _height*0.78,'box').setDisplaySize(_width/2,_height/2.5);
    this.add.image(_width*0.5, _height*0.73, 'gameover');
    homeButton(this);
    console.log("[Gameover] create() complete");
  }

  update() {
    currentLevel = 0;
    if (backToMainMenu === 1) {
      backToMainMenu = 0;
      this.scene.start('Title');
    }
  }

}
