/*
  Level 3: a water and grass map
    Requires successful completion of level 2
*/
class Level3 extends Phaser.Scene {

  constructor() {
    super({key:'Level3'});
  }

  preload() {
    this.load.image('map3','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    this.add.image(screen.width/3, screen.height/3, 'map3');
    //this.buttons();
    this.add.text(100,100,'in level3');

    // checking to have received correct data
    console.log(gameMode.name);
    console.log(kingdomSelection.name);
    console.log(opponentKingdom);

    console.log('[Level3] create() complete');
  }
  update() {
    // randomly assign different AI?
    if (backToMainMenu === 1) {
      this.scene.restart('Title');
      backToMainMenu = 0;
    }
  }

}
