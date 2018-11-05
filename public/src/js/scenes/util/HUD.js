var currentTime,
    currentLevel;
var gameStartTime;
var playerWon;
var textLevelX;
var goto;
var build_signal = 0; // 1 is build
var check_gameover = 0; // if game is over, then 1
var currentGold;
var currentPopulation;
var displayGold,displayPop;
var image1, timedEvent;
// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class gameHUD extends Phaser.Scene {

  constructor() {
    super({key:'gameHUD'});
  }

  preload() {
    this.load.image('win','assets/UI/WIN.png');
    this.load.image('lackOfGold','assets/UI/Not-Enough-Gold.png');
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
    var displayLevel = this.add.text(150,17,'CURRENT LEVEL: ' + currentLevel);

    currentTime = this.add.text(350, 17, 'CURRENT TIME: ');

  // cheat: start with 1000 GOLD

   displayGold = this.add.text(600,17,'CURRENT GOLD: ');

   displayPop = this.add.text(850,17,'POPULATION: ');
     }

  update() {
    var timeElapsed = Math.round((Date.now() - gameStartTime)/1000);
    var readableTime = calculateTime(timeElapsed);

    //currentTime variable is in HUD so...need to check if it exists first
    if(currentTime){
      currentTime.setText('CURRENT TIME: ' + readableTime);
    }

    // current gold and population
    displayGold.setText('CURRENT GOLD: ' + player.gold);
    displayPop.setText('POPULATION: ' + getPopulation(currentPopulation, player));


    //build_signal = 0;
/* TODO: 'not enough gold' message
    image1 = this.add.image(_width*0.5, _height*0.2,'lackOfGold').setAlpha(0);
    if (build_signal === -1 && image1.alpha === 0) {
      timedEvent = this.time.delayedCall(3000, this.onEvent(), [], this);
    }
    if (build_signal === 0 && image1.alpha != 0) {
      image1.setAlpha(0);
    }
*/
    // stop the 10 minute timer
    //if(gameOver(timeElapsed)){
    if(timeElapsed === 600){ //600 = 10 minute
      currentTime = 0;
      readableTime = 0;
      timeElapsed = 0;

    playerWon = calculateWinner(player, ai);
    if (playerWon === true) {
      var image2 = this.add.sprite(_width*0.5, _height*0.5,'win');
    }

    if ((currentLevel === 1 && playerWon === true)|| (currentLevel === 2&& playerWon === true)){
      this.button_goToLevelX(goto);
    } else if (playerWon === false) {
      check_gameover = 1;
    }
  }
}

  button_Title() {
  // button for going back to the main menu
  var titlebuttonHUD = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
  titlebuttonHUD.setInteractive({useHandCursor:true});
  titlebuttonHUD.on('pointerdown', function(pointer) {backToMainMenu = 1;},this);
  }

  button_goToLevelX(goto) {
    var buttonToLevelX = this.add.sprite(_width*0.9,25,'button');
    textLevelX = this.add.text(_width*0.9,25, "Next Level", {fontSize: '25px'}).setOrigin(0.5,0.5);

    buttonToLevelX.setInteractive({useHandCursor:true});
    if(goto != ""){
    buttonToLevelX.on('pointerdown', function(pointer) {this.scene.start(goto);}, this);
    }
  }

  // build structures: create buttons using hud and if button is clicked, then trigger it to build a buildings
  // TODO: if not enough money -> http://labs.phaser.io/edit.html?src=src/tweens\total%20duration.js
  buildButtons() {
    // archeryRange
    var buildButton_archeryRange = this.add.sprite(_width-460, _height-25,"button_archeryRange").setOrigin(0.5,0.5);
    buildButton_archeryRange.setInteractive({useHandCursor:true});
    buildButton_archeryRange.on('pointerdown', function(pointer) {
      console.log("archery range button");
      if (currentGold >= archeryRangeInfo.cost) {build_signal = 1;} else { build_signal = -1; }
    }, this);

    // barracks
    var buildButton_barracks = this.add.sprite(_width-400, _height-25,"button_barracks").setOrigin(0.5,0.5);
    buildButton_barracks.setInteractive({useHandCursor:true});
    buildButton_barracks.on('pointerdown', function(pointer) {
      console.log("barracks button");
      if (currentGold >= barracksInfo.cost) {build_signal = 2;} else { build_signal = -1; }
    }, this);

    // castle
    var buildButton_castle = this.add.sprite(_width-340, _height-25,"button_castle").setOrigin(0.5,0.5);
    buildButton_castle.setInteractive({useHandCursor:true});
    buildButton_castle.on('pointerdown', function(pointer) {
      console.log("castle button");
      if (currentGold >= castleInfo.cost) {build_signal = 3;} else { build_signal = -1; }
    }, this);

    // machinery
    var buildButton_machinery = this.add.sprite(_width-280, _height-25,"button_machinery").setOrigin(0.5,0.5);
    buildButton_machinery.setInteractive({useHandCursor:true});
    buildButton_machinery.on('pointerdown', function(pointer) {
      console.log("machinery button");
      if (currentGold >= machineryInfo.cost) {build_signal = 4;} else { build_signal = -1; }
    }, this);

    // mine
    var buildButton_mine = this.add.sprite(_width-220, _height-25,"button_mine").setOrigin(0.5,0.5);
    buildButton_mine.setInteractive({useHandCursor:true});
    buildButton_mine.on('pointerdown', function(pointer) {
      console.log("mine button");
      if (currentGold >= mineInfo.cost) {build_signal = 5;} else { build_signal = -1; }
    }, this);

    // temple
    var buildButton_temple = this.add.sprite(_width-160, _height-25,"button_temple").setOrigin(0.5,0.5);
    buildButton_temple.setInteractive({useHandCursor:true});
    buildButton_temple.on('pointerdown', function(pointer) {
      console.log("temple button");
      if (currentGold >= templeInfo.cost) {build_signal = 6;} else { build_signal = -1; }
    }, this);

    // towncenter
    var buildButton_townCenter = this.add.sprite(_width-100, _height-25,"button_townCenter").setOrigin(0.5,0.5);
    buildButton_townCenter.setInteractive({useHandCursor:true});
    buildButton_townCenter.on('pointerdown', function(pointer) {
      console.log("town center button");
      if (currentGold >= townCenterInfo.cost) {build_signal = 7;} else { build_signal = -1; }
    }, this);
  }

  onEvent(){
    build_signal = 0;
    image1.setAlpha(0.5);
  }

}
