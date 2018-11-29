var howTo_nextPage, howToBox;
class Instructions extends Phaser.Scene {

  constructor() {
    super({key:'Instructions'});
  }

  preload() {
  }

  create() {
    this.add.image(400,300,'instructions_bg');
    howToBox = this.add.image(_width*0.05, _height*0.05,'howToPlay1').setOrigin(0,0).setDisplaySize(_width*0.9,_height*0.9);
    homeButton(this);
    this.nextPage();
    check_gameover = 0;
    console.log('[Instructions] create() complete');
  }

  update() {
    if (backToMainMenu === 1) { backToMainMenu = 0; this.scene.start('Title'); }
    homeButton(this);
    if (howTo_nextPage === 1 && howToBox.texture.key === 'howToPlay1') {
      howTo_nextPage =0; howToBox.setTexture('howToPlay2'); }
    else if(howTo_nextPage === 1 && howToBox.texture.key === 'howToPlay2') {
      howTo_nextPage=0; howToBox.setTexture('howToPlay1'); }
  }

  nextPage(){
    var arrowButton = this.add.sprite(_width*0.85,_height*0.15,'arrowButton').setOrigin(0,0).setDisplaySize(50,50);
    arrowButton.setInteractive({useHandCursor:true});
    arrowButton.on('pointerdown', function () {
      howTo_nextPage = 1;
      });
    }

}
