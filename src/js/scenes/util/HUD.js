// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class gameHUD extends Phaser.Scene {

  constructor() {
    super({key:'gameHUD'});
  }

  preload() {
    this.load.image('button_mine','assets/UI/buildButtons/1.png');
    this.load.image('button_archeryRange','assets/UI/buildButtons/2.png');
    this.load.image('button_townCenter','assets/UI/buildButtons/3.png');
    this.load.image('button_barracks','assets/UI/buildButtons/4.png');
    this.load.image('button_castle','assets/UI/buildButtons/5.png');
    this.load.image('button_temple','assets/UI/buildButtons/6.png');
    this.load.image('button_machinery','assets/UI/buildButtons/7.png');
  }

  create() {
    // where the info is displayed
    var topHUD = this.add.rectangle(0, 0, _width-32, 50, 0x161616).setStrokeStyle(4, 0xefc53f).setOrigin(0,0);
    topHUD.alpha = 0.5;
    this.button_Title();
    this.buildButtons();

  }

  update(time, delta) {
    // 10 minute timer
    // resource info update

  }

  button_Title() {
  // button for going back to the main menu
  //var button1 = this.add.sprite(5,5,'button');
  var text1 = this.add.text(0, 0, "Main Menu", { fontSize: '15px', fontFamily: 'Georgia', color: '#ffffff', backgroundColor: 'green'}).setOrigin(0,0).setPadding(4,4);
  text1.setInteractive({useHandCursor:true});
  text1.on('pointerdown', function(pointer) { backToMainMenu = 1},this);
  }


  // build structures
  /*// create buttons using hud and if button is clicked, then trigger it to build a buildings
  // player needs to place the building

  this.input.on('pointerdown', function (pointer) {

      this.add.image(pointer.x, pointer.y, 'archer');

  }, this);
*/
  buildButtons() {
    // archeryRange
    var buildButton_archeryRange = this.add.sprite(_width-460, _height-25,"button_archeryRange").setOrigin(0.5,0.5);
    buildButton_archeryRange.setInteractive({useHandCursor:true});
    buildButton_archeryRange.on('pointerdown', function(pointer) {
      console.log("archery range button");
      buildArcheryRange = 1;
    }, this);

    // barracks
    var buildButton_barracks = this.add.sprite(_width-400, _height-25,"button_barracks").setOrigin(0.5,0.5);
    buildButton_barracks.setInteractive({useHandCursor:true});
    buildButton_barracks.on('pointerdown', function(pointer) {
      console.log("barracks button");
    }, this);

    // castle
    var buildButton_castle = this.add.sprite(_width-340, _height-25,"button_castle").setOrigin(0.5,0.5);
    buildButton_castle.setInteractive({useHandCursor:true});
    buildButton_castle.on('pointerdown', function(pointer) {
      console.log("castle button");
    }, this);

    // machinery
    var buildButton_machinery = this.add.sprite(_width-280, _height-25,"button_machinery").setOrigin(0.5,0.5);
    buildButton_machinery.setInteractive({useHandCursor:true});
    buildButton_machinery.on('pointerdown', function(pointer) {
      console.log("machinery button");
    }, this);

    // mine
    var buildButton_mine = this.add.sprite(_width-220, _height-25,"button_mine").setOrigin(0.5,0.5);
    buildButton_mine.setInteractive({useHandCursor:true});
    buildButton_mine.on('pointerdown', function(pointer) {
      console.log("mine button");
    }, this);

    // temple
    var buildButton_temple = this.add.sprite(_width-160, _height-25,"button_temple").setOrigin(0.5,0.5);
    buildButton_temple.setInteractive({useHandCursor:true});
    buildButton_temple.on('pointerdown', function(pointer) {
      console.log("temple button");
    }, this);

    // towncenter
    var buildButton_townCenter = this.add.sprite(_width-100, _height-25,"button_townCenter").setOrigin(0.5,0.5);
    buildButton_townCenter.setInteractive({useHandCursor:true});
    buildButton_townCenter.on('pointerdown', function(pointer) {
      console.log("town center button");
    }, this);
  }

}
