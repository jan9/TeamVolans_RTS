var currentTime,
    currentLevel;

// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class gameHUD extends Phaser.Scene {

  constructor() {
    super({key:'gameHUD'});
  }

  preload() {
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
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

    // have a message box?
    currentLevel = 1;
    var displayLevel = this.add.text(150,17,'CURRENT LEVEL: ' + currentLevel);

    currentTime = this.add.text(350, 17, 'CURRENT TIME: ');
  }

  update(time, delta) {
    // 10 minute timer
    // resource info update

  }

  button_Title() {
  // button for going back to the main menu
  var button1 = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
  button1.setInteractive({useHandCursor:true});
  button1.on('pointerdown', function(pointer) { backToMainMenu = 1},this);
  }


  // build structures: create buttons using hud and if button is clicked, then trigger it to build a buildings
  buildButtons() {
    // archeryRange
    var buildButton_archeryRange = this.add.sprite(_width-460, _height-25,"button_archeryRange").setOrigin(0.5,0.5);
    buildButton_archeryRange.setInteractive({useHandCursor:true});
    buildButton_archeryRange.on('pointerdown', function(pointer) {
      console.log("archery range button");
      build_signal = 1;
    }, this);

    // barracks
    var buildButton_barracks = this.add.sprite(_width-400, _height-25,"button_barracks").setOrigin(0.5,0.5);
    buildButton_barracks.setInteractive({useHandCursor:true});
    buildButton_barracks.on('pointerdown', function(pointer) {
      console.log("barracks button");
      build_signal = 2;
    }, this);

    // castle
    var buildButton_castle = this.add.sprite(_width-340, _height-25,"button_castle").setOrigin(0.5,0.5);
    buildButton_castle.setInteractive({useHandCursor:true});
    buildButton_castle.on('pointerdown', function(pointer) {
      console.log("castle button");
      build_signal = 3;
    }, this);

    // machinery
    var buildButton_machinery = this.add.sprite(_width-280, _height-25,"button_machinery").setOrigin(0.5,0.5);
    buildButton_machinery.setInteractive({useHandCursor:true});
    buildButton_machinery.on('pointerdown', function(pointer) {
      console.log("machinery button");
      build_signal = 4;
    }, this);

    // mine
    var buildButton_mine = this.add.sprite(_width-220, _height-25,"button_mine").setOrigin(0.5,0.5);
    buildButton_mine.setInteractive({useHandCursor:true});
    buildButton_mine.on('pointerdown', function(pointer) {
      console.log("mine button");
      build_signal = 5;
    }, this);

    // temple
    var buildButton_temple = this.add.sprite(_width-160, _height-25,"button_temple").setOrigin(0.5,0.5);
    buildButton_temple.setInteractive({useHandCursor:true});
    buildButton_temple.on('pointerdown', function(pointer) {
      console.log("temple button");
      build_signal = 6;
    }, this);

    // towncenter
    var buildButton_townCenter = this.add.sprite(_width-100, _height-25,"button_townCenter").setOrigin(0.5,0.5);
    buildButton_townCenter.setInteractive({useHandCursor:true});
    buildButton_townCenter.on('pointerdown', function(pointer) {
      console.log("town center button");
      build_signal = 7;
    }, this);
  }

}
