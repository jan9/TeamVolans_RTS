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
var gameMessage;
var buttons = [];
var optionClicked = "none";
var gamePaused, pauseStartTime, pauseEndTime;
var pauseButton, pauseMenuBox, pauseCloseButton, yesButton, noButton;

// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class gameHUD extends Phaser.Scene {

  constructor() {
    super({key:'gameHUD'});
  }

  preload() {
    
  }

  create() {
    // where the info is displayed
    var topHUD = this.add.rectangle(0, 0, _width-32, 50, 0x161616).setStrokeStyle(4, 0xefc53f).setOrigin(0,0);
    topHUD.alpha = 0.5;
    this.button_Title();
    this.buildButtons();
    this.optionButton();

    //minimap frame
    var minimapbg = this.add.sprite(115, _height-130, "boxframe").setDisplaySize(225,250).setScrollFactor(0);
    minimapbg.setDepth(0);

    // have a message box?
    var displayLevel = this.add.text(150,17,'CURRENT LEVEL: ' + currentLevel);

    currentTime = this.add.text(350, 17, 'CURRENT TIME: ');

  // cheat: start with 1000 GOLD

   displayGold = this.add.text(600,17,'CURRENT GOLD: ');

   displayPop = this.add.text(850,17,'POPULATION: ');
   gameMessage = this.add.text(3, 53, '');
  // gameMessage.setText('');
  this.pauseBox();
     }

  update() {
    var timeElapsed = Math.round((Date.now() - gameStartTime)/1000);
    var readableTime = calculateTime(timeElapsed);
    if (gamePaused === true) {
      pauseStartTime;
      //console.log(pauseStartTime);
      this.pauseBox_shown();
    } else if (gamePaused === false) {
      this.pauseBox_notShown();
    }
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

  pauseBox_shown() {
    pauseMenuBox.setVisible(true);
    pauseButton.setVisible(true);
    yesButton.setVisible(true);
    noButton.setVisible(true);
    pauseCloseButton.setVisible(true);
  }

  pauseBox_notShown() {
    pauseMenuBox.setVisible(false);
    pauseButton.setVisible(false);
    yesButton.setVisible(false);
    noButton.setVisible(false);
    pauseCloseButton.setVisible(false);
  }

  pauseBox() {
  pauseMenuBox = this.add.sprite(_width/2, _height/2, 'pauseMenuBox').setDepth(12).setScrollFactor(0).setVisible(false);
  pauseCloseButton = this.add.sprite(_width*0.69, _height*0.32, 'pauseCloseButton').setDisplaySize(25,25).setDepth(13).setScrollFactor(0).setVisible(false);
  pauseButton = this.add.sprite(_width*0.5, _height*0.275, 'pauseButton').setDepth(13).setVisible(false);
  yesButton = this.add.sprite(_width*0.4, _height*0.55, 'yesButton').setDisplaySize(120, 60).setDepth(13).setVisible(false);
  noButton = this.add.sprite(_width*0.6, _height*0.55, 'noButton').setDisplaySize(120, 60).setDepth(13).setVisible(false);
  var pauseBoxText = this.add.text(_width*0.43, _height*0.65,"", {fontSize: '15px', fontFamily: 'Georgia', color: 'black'}).setDepth(16);

  pauseCloseButton.setInteractive({useHandCursor:true});
  pauseCloseButton.on('pointerdown', function(pointer) {
    pauseBoxText.setText("");
    gamePaused = false;
    pauseEndTime = Date.now();
    this.scene.resume('Level1');
    this.scene.resume('Level2');
    this.scene.resume('Level3');
    }, this);

  noButton.setInteractive({useHandCursor:true});
  noButton.on('pointerdown', function(pointer) {
    pauseBoxText.setText("");
    gamePaused = false;
    pauseEndTime = Date.now();
    this.scene.resume('Level1');
    this.scene.resume('Level2');
    this.scene.resume('Level3');
    }, this);

  yesButton.setInteractive({useHandCursor:true});
  yesButton.on('pointerdown', function(pointer) {
    console.log("save current player and ai data");
    var temp = [], temp2 = [];
    for (var i = 0; i < player.buildings.length; i++) {
      if (player.buildings[i] === "") {
        continue;
      } else {
        var type ="";
        if (player.buildings[i].type === "Castle") {
          type = "Player_Castle";
        } else {
          type = "Player_Building";
        }
        temp[i] = {
          height: player.buildings[i].height,
          id: i,
          rotation: player.buildings[i].rotation,
          name: type,
          baseType: player.buildings[i].baseType,
          type: player.buildings[i].type,
          visible: player.buildings[i].visible,
          width: player.buildings[i].width,
          x: player.buildings[i].x,
          y: player.buildings[i].y
        }
      }
    }

    for (var i = 0; i < player.units.length; i++) {
      if (player.units[i] === "") {
        continue;
      } else {
        temp2[i] = {
          height: player.units[i].height,
          id: i,
          rotation: player.units[i].rotation,
          name: "Player_Unit"+(i+1).toString(),
          type: player.units[i].type,
          visible: player.units[i].visible,
          width: player.units[i].width,
          x: player.units[i].x,
          y: player.units[i].y
      }
    }
  }
  var buildingsInfo = temp;
  var unitsInfo = temp2;
  var info_player = temp.concat(temp2);

    var temp_ai = [], temp_ai2 = [];
    for (var i = 0; i < ai.buildings.length; i++) {
      var type ="";
      if (ai.buildings[i].type === "Castle") {
        type = "Enemy_Castle";
      } else {
        type = "Enemy_Building";
      }
      temp_ai[i] = {
        height: ai.buildings[i].height,
        id: i,
        rotation: ai.buildings[i].rotation,
        name: type,
        baseType: ai.buildings[i].baseType,
        type: ai.buildings[i].type,
        visible: ai.buildings[i].visible,
        width: ai.buildings[i].width,
        x: ai.buildings[i].x,
        y: ai.buildings[i].y
      }
    }

    for (var i = 0; i < ai.units.length; i++) {
      temp_ai2[i] = {
        height: ai.units[i].height,
        id: i,
        rotation: ai.units[i].rotation,
        name: "Enemy_Unit"+(i+1).toString(),
        type: ai.units[i].type,
        visible: ai.units[i].visible,
        width: ai.units[i].width,
        x: ai.units[i].x,
        y: ai.units[i].y
      }
    }
    var ai_buildingsInfo = temp_ai;
    var ai_unitsInfo = temp_ai2;
    var info_ai = temp_ai.concat(temp_ai2);

    var gold_player = [], gold_ai = [];
    for (var i = 0; i < player.goldDeposits.length; i++) {
      gold_player[i] = {
        height: player.goldDeposits[i].height,
        id: i,
        rotation: player.goldDeposits[i].rotation,
        name: "Player_Gold_"+(i+1).toString(),
        type: player.goldDeposits[i].type,
        visible: player.goldDeposits[i].visible,
        width: player.goldDeposits[i].width,
        x: player.goldDeposits[i].x,
        y: player.goldDeposits[i].y,
        properties: {name: "isMine", type: "bool", value: false}
      }
    }
    for (var i = 0; i < ai.goldDeposits.length; i++) {
      gold_ai[i] = {
        height: ai.goldDeposits[i].height,
        id: i,
        rotation: ai.goldDeposits[i].rotation,
        name: "Enemy_Gold_"+(i+1).toString(),
        type: ai.goldDeposits[i].type,
        visible: ai.goldDeposits[i].visible,
        width: ai.goldDeposits[i].width,
        x: ai.goldDeposits[i].x,
        y: ai.goldDeposits[i].y,
        properties: {name: "isMine", type: "bool", value: false}
      }
    }
    var gold = gold_player.concat(gold_ai);
    var info_all = info_player.concat(info_ai);
    var objects = info_all.concat(gold);

    // building and unit info
    var player_buildingList =  [];
    for (var i = 0; i < player.buildings.length; i++) {
        var temp = player.buildings[i].type;
        player_buildingList.push(temp);
    }

    var ai_buildingList =  [];
    for (var i = 0; i < ai.buildings.length; i++) {
        var temp = ai.buildings[i].type;

        ai_buildingList.push(temp);
    }


    var data = {
      dateSaved: timeStamp(),
      gameMode: gameMode.name,
      kingdomName: kingdomSelection.name,
      enemyKingdomName: opponentKingdom,
      objects: objects,

      // player data
      gold: player.gold,
      population:player.units.legnth,
      buildings:  buildingsInfo,
      units: unitsInfo,
      buildingList: player_buildingList,

      // ai data
      ai_gold: ai.gold,
      ai_population: ai.units.legnth,
      ai_buildings:  ai_buildingsInfo,
      ai_units: ai_unitsInfo,
      ai_buildingList: ai_buildingList
    }
    if (currentLevel === 1 ) {
        localStorage.removeItem('level1Data');
        localStorage.setItem('level1Data', JSON.stringify(data));
        if (localStorage.hasOwnProperty('level1Data') === true) {
          pauseBoxText.setText("Current data has been saved");
        }
      } else if (currentLevel === 2) {
        localStorage.removeItem('level2Data');
        localStorage.setItem('level2Data', JSON.stringify(data));
        if (localStorage.hasOwnProperty('level2Data') === true) {
          pauseBoxText.setText("Current data has been saved");
        }
      } else if(currentLevel === 3) {
        localStorage.removeItem('level3Data');
          localStorage.setItem('level3Data', JSON.stringify(data));
          if (localStorage.hasOwnProperty('level3Data') === true) {
            pauseBoxText.setText("Current data has been saved");
          }
      }
    }, this);
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

  removeSelected(){
    for(let button of buttons){
      button.setTexture('button_'+button.name);
    }
  }

  optionButton(){
    var optionButton = this.add.sprite(_width-100, _height-80, "none_option").setOrigin(0.5,0.5);
    for(let option of _options){
      this.optionInput(optionButton, option.key, option.name);
    }
  }

  optionInput(optionButton, key, name){
    this.input.keyboard.on('keydown_'+key, function(event){
        optionClicked = name;
        optionButton.setTexture(name+"_option");
    });
  }

  // build structures: create buttons using hud and if button is clicked, then trigger it to build a buildings
  // TODO: if not enough money -> http://labs.phaser.io/edit.html?src=src/tweens\total%20duration.js
  buildButtons() {
    // archeryRange
    var buildButton_archeryRange = this.add.sprite(_width-460, _height-25,"button_archeryRange").setOrigin(0.5,0.5);
    buildButton_archeryRange.name="archeryRange";

    buttons.push(buildButton_archeryRange);
    buildButton_archeryRange.setInteractive({useHandCursor:true});
    buildButton_archeryRange.on('pointerdown', function(pointer) {
      console.log("archery range button");
      if (player.gold >= archeryRangeInfo.cost) {
        build_signal = 1;
        this.removeSelected();
        buildButton_archeryRange.setTexture('button_archeryRange_selected');
      }
    }, this);

    // barracks
    var buildButton_barracks = this.add.sprite(_width-400, _height-25,"button_barracks").setOrigin(0.5,0.5);
    buildButton_barracks.name="barracks";

    buttons.push(buildButton_barracks);

    buildButton_barracks.setInteractive({useHandCursor:true});
    buildButton_barracks.on('pointerdown', function(pointer) {
      console.log("barracks button");
      if (player.gold >= barracksInfo.cost) {
        build_signal = 2;
        this.removeSelected();
        buildButton_barracks.setTexture('button_barracks_selected');
          }
    }, this);

    // castle
    var buildButton_castle = this.add.sprite(_width-340, _height-25,"button_castle").setOrigin(0.5,0.5);
    buildButton_castle.name="castle";
    buttons.push(buildButton_castle);

    buildButton_castle.setInteractive({useHandCursor:true});
    buildButton_castle.on('pointerdown', function(pointer) {
      console.log("castle button");
      if (player.gold >= castleInfo.cost) {
        this.removeSelected();
        build_signal = 3;
        buildButton_castle.setTexture('button_castle_selected');
      }
    }, this);

    // machinery
    var buildButton_machinery = this.add.sprite(_width-280, _height-25,"button_machinery").setOrigin(0.5,0.5);
    buildButton_machinery.name = "machinery";
    buttons.push(buildButton_machinery);

    buildButton_machinery.setInteractive({useHandCursor:true});
    buildButton_machinery.on('pointerdown', function(pointer) {
      console.log("machinery button");
      if (player.gold >= machineryInfo.cost) {
        this.removeSelected();
        build_signal = 4;
        buildButton_machinery.setTexture('button_machinery_selected');
      }
    }, this);

    // mine
    var buildButton_mine = this.add.sprite(_width-220, _height-25,"button_mine").setOrigin(0.5,0.5);
    buildButton_mine.name = "mine";
    buttons.push(buildButton_mine);
    buildButton_mine.setInteractive({useHandCursor:true});
    buildButton_mine.on('pointerdown', function(pointer) {
      console.log("mine button");
      if (player.gold >= mineInfo.cost) {
        this.removeSelected();
        build_signal = 5;
        buildButton_mine.setTexture('button_mine_selected');
      }
    }, this);

    // temple
    var buildButton_temple = this.add.sprite(_width-160, _height-25,"button_temple").setOrigin(0.5,0.5);
    buildButton_temple.name = "temple";
    buttons.push(buildButton_temple);
    buildButton_temple.setInteractive({useHandCursor:true});
    buildButton_temple.on('pointerdown', function(pointer) {
      console.log("temple button");
      if (player.gold >= templeInfo.cost) {
        this.removeSelected();
        build_signal = 6;
        buildButton_temple.setTexture('button_temple_selected');
      }
    }, this);

    // towncenter
    var buildButton_townCenter = this.add.sprite(_width-100, _height-25,"button_townCenter").setOrigin(0.5,0.5);
    buildButton_townCenter.name = "townCenter";
    buttons.push(buildButton_townCenter);
    buildButton_townCenter.setInteractive({useHandCursor:true});
    buildButton_townCenter.on('pointerdown', function(pointer) {
      console.log("town center button");
      if (player.gold >= townCenterInfo.cost) {
        this.removeSelected();
        build_signal = 7;
        buildButton_townCenter.setTexture('button_townCenter_selected');
      }
    }, this);
  }

  onEvent(){
    build_signal = 0;
    image1.setAlpha(0.5);
  }

}
