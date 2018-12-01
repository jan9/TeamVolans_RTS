var currentTime,
    currentLevel;
var playerWon;
var goto;
var build_signal = 0; // 1 is build
var check_gameover = 0; // if game is over, then 1
var currentGold;
var currentPopulation;
var displayGold,displayPop,displayMessage,displayTime;
var image1, timedEvent;
var displayMessage, gameMessage;
var buttons = [];
var optionClicked = "none";
var gamePaused, pauseStartTime, pauseEndTime, pausedBeforeQuit;
var pauseButton, pauseMenuBox, pauseCloseButton, yesButton, noButton;
var timer, timeElapsed;
var notEnoughGold;

// future reference https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
class gameHUD extends Phaser.Scene {

  constructor() {
    super({key:'gameHUD'});
  }

  preload() {
  }

  create() {
    // where the info is displayed
    var topHUD = this.add.rectangle(0, 0, _width, 50, 0x161616).setStrokeStyle(4, 0xefc53f).setOrigin(0,0);
    topHUD.alpha = 0.5;
    homeButton(this);
    //this.button_Quit();
    this.buildButtons();
    this.optionButton();

    //minimap frame
    var minimapbg = this.add.sprite(115, _height-130, "boxframe").setDisplaySize(225,250).setScrollFactor(0);
    minimapbg.setDepth(0);

    // have a message box?
    var displayLevel = this.add.text(150,17,'CURRENT LEVEL: ' + currentLevel);

    displayTime = this.add.text(350, 17, 'CURRENT TIME: ');

  // cheat: start with 1000 GOLD

   displayGold = this.add.text(600,17,'CURRENT GOLD: ');

   displayPop = this.add.text(850,17,'POPULATION: ');

   displayMessage = this.add.text(4, 80,'');
   var roundInfo = this.add.text(4, 53, '['+gameMode.name+' mode] '+kingdomSelection.name+'(Player) vs '+opponentKingdom +'(AI)');
   this.pauseBox();
  }

  update() {
    // set up a 10 minute timer
    timeElapsed = timer.getElapsedSeconds();
    if (loadingSavedGame === true) {
      timeElapsed = timer.getElapsedSeconds() + currentData.currentGameTime;
    }

    var currentTime = calculateTime(timeElapsed);
    //console.log("[HUD] readableTime", timeElapsed);
    if (gamePaused === true) {
      this.pauseBox_shown();
    } else if (gamePaused === false) {
      this.pauseBox_notShown();
    }

    displayTime.setText('CURRENT TIME: ' + currentTime);

    // current gold and population
    displayGold.setText('CURRENT GOLD: ' + player.gold);

    displayPop.setText('POPULATION: ' + getPopulation(currentPopulation, player));

    this.checkGameState();

  }


  checkGameState() {
    // make announcements
    if (notEnoughGold === 1) {
      announcement(this, "Not Enough Gold");
      notEnoughGold = 0;
    } else if (gameMessage === 1) {
      announcement(this, "New Player Unit Added");
      gameMessage = 0;
    } else if (gameMessage === 2) {
      announcement(this, "New Player Building Added");
      gameMessage = 0;
    }

    // 1. If game has reached time limit
    if (loadingSavedGame === true) {
      timeElapsed -= currentData.currentGameTime;
    }
    if(timeElapsed === (_timeLimit_ms/1000)){ //600 = 10 minute
      timeElapsed = 0;

      playerWon = calculateWinner(player, ai);
      if ((currentLevel === 1 && playerWon === true)|| (currentLevel === 2&& playerWon === true)){
        this.button_goToLevelX(goto);
      } else if (currentLevel === 3 && playerWon === true) {
        this.button_endReached();
      } else if ((currentLevel === 1 && playerWon === false)||
                 (currentLevel === 2 && playerWon === false)||
                 (currentLevel === 3 && playerWon === false))
                 {
                   check_gameover = 1;
                 }
      }
    // 2. If game hasn't reached time limit
    else if (timeElapsed < _timeLimit_s) {
      var castleCount = 0, aiCastleCount = 0;
      for(var i = 0; i < player.buildings.length; i++){
        if(player.buildings[i].type === "Castle"){
          castleCount++;
        }
      }
      for(var i = 0; i < ai.buildings.length; i++){
        if(ai.buildings[i].type === "Castle"){
          aiCastleCount++;
        }
      }
      if (getPopulation(currentPopulation, player) === 0 ) {  // if num of units is 0
         this.stopGameFinished();
         check_gameover = 1;
         aiGameOver = 1; //console.log("[HUD] #130");
      } else if (player.buildings.length === 0) { // if num of buildings is 0
         this.stopGameFinished();
         check_gameover = 1;
         aiGameOver = 1; //console.log("[HUD] #132");
      } else if (castleCount === 0){  // if num of castles is 0
         this.stopGameFinished();
         check_gameover = 1;
         aiGameOver = 1; //console.log("[HUD] #134");
      } else if (aiCastleCount === 0 || getPopulation(currentPopulation, ai) === 0) {
        playerWon = true;
        aiGameOver = 1;
        this.stopGameFinished();
        if ((currentLevel === 1 && playerWon === true)|| (currentLevel === 2&& playerWon === true)){
          this.button_goToLevelX(goto);
          aiGameOver = 1;
          this.stopGameFinished();
        } else if (currentLevel === 3 && playerWon === true) {
          this.button_endReached();
          aiGameOver = 1;
          this.stopGameFinished();
        }
      }
    }
  }

// stops the timer
  stopGameFinished(){
    this.scene.pause('Level'+currentLevel);
    //timer.paused = true;
    //var temp = player.gold; player.gold = temp;
    //var temp_ai = ai.gold; ai.gold = temp_ai;
    //timer.reset({delay: 0, elapsed: 0 });
    //timer.remove(onTenMinutesUp);
  }

  button_endReached() {
    var youWin_logo = this.add.sprite(_width*0.5, _height*0.5,'win');
    var buttonToReturn = this.add.sprite(_width*0.9,26,'button');

    var buttonToMainMenu= this.add.sprite(_width*0.821,0,'mainmenuButton').setOrigin(0,0).setDisplaySize(200,50);
    buttonToMainMenu.setInteractive({useHandCursor:true});
    if(goto != ""){
      buttonToMainMenu.on('pointerdown', function(pointer) {
        this.scene.stop('Level'+ currentLevel.toString());
        loadingSavedGame = false;
        this.scene.resume('Level3');
        _timeLimit_ms=_timeLimit_s*1000; // for testing
        backToMainMenu = 1;
        this.scene.start('Title');
      }, this);
    }
  }

  button_goToLevelX(goto) {
    var lvlComplete_logo = this.add.sprite(_width*0.5, _height*0.5,'levelComplete');

    var buttonToLevelX = this.add.sprite(_width*0.92,26,'button');
    var textLevelX = this.add.text(_width*0.92,25, "Next Level", {fontSize: '25px'}).setOrigin(0.5,0.5);

    buttonToLevelX.setInteractive({useHandCursor:true});
    if(goto != ""){
      buttonToLevelX.on('pointerdown', function(pointer) {
        this.scene.stop('Level'+ currentLevel.toString());
        loadingSavedGame = false;
        _timeLimit_ms = _timeLimit_s*1000;
        this.scene.start(goto);
      }, this);
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
      timer.paused = false;
      pauseEndTime = timer.getElapsedSeconds();
      this.scene.resume('Level1');
      this.scene.resume('Level2');
      this.scene.resume('Level3');
      if (currentLevel === 1 || currentLevel === 2 || currentLevel === 3) {
        var quitButton = this.add.sprite(10,3,'quitButton').setOrigin(0,0).setDisplaySize(120,40).setDepth(25);
        quitButton.setInteractive({useHandCursor:true});
        quitButton.on('pointerdown', function () {
          pausedBeforeQuit = 1;//backToMainMenu = 1;
          if(pausedBeforeQuit === 1 && backToMainMenu === 0 && currentLevel != 0) {
            pausedBeforeQuit = 2;
            gamePaused = true;
            pauseStartTime = timer.getElapsedSeconds();
            timer.paused = true;
            this.scene.pause('Level1');
            this.scene.pause('Level2');
            this.scene.pause('Level3');
            quitButton.destroy();
          }
          //console.log("[HUD] quitButton");
        }, this); // for quitButton
      }
    }, this); // for pauseCloseButton

    noButton.setInteractive({useHandCursor:true});
    noButton.on('pointerdown', function(pointer) {
      pauseBoxText.setText("");
      gamePaused = false;
      timer.paused = false;
      pauseEndTime = timer.getElapsedSeconds();
      this.scene.resume('Level1');
      this.scene.resume('Level2');
      this.scene.resume('Level3');
      if (pausedBeforeQuit === 2) {
        timer.reset({delay: 0, elapsed: 0 });
        timer.remove(onTenMinutesUp);
        pausedBeforeQuit = 0;
        backToMainMenu = 1; }
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
            y: player.buildings[i].y,
            health: player.buildings[i].getHealth()
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
            y: player.units[i].y,
            health: player.units[i].getHealth(),
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
          y: ai.buildings[i].y,
          health: ai.buildings[i].getHealth()
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
          y: ai.units[i].y,
          health: ai.units[i].getHealth(),
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
        currentGameTime: pauseStartTime, // saves current game time

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

  removeSelected(){
    for(let button of buttons){
      button.setTexture('button'+button.name);
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
    var buildButton_archeryRange = this.add.sprite(_width-460, _height-25,"buttonArcheryRange").setOrigin(0.5,0.5);
    buildButton_archeryRange.name="ArcheryRange";
    buttons.push(buildButton_archeryRange);
    buildButton_archeryRange.setInteractive({useHandCursor:true});
    buildButton_archeryRange.on('pointerdown', function(pointer) {
      //console.log("archery range button");
      if (player.gold >= archeryRangeInfo.cost) {
        this.removeSelected();
        buildButton_archeryRange.setTexture('buttonArcheryRange_selected');
        build_signal = 1;
      } else if (archeryRangeInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // barracks
    var buildButton_barracks = this.add.sprite(_width-400, _height-25,"buttonBarracks").setOrigin(0.5,0.5);
    buildButton_barracks.name="Barracks";
    buttons.push(buildButton_barracks);
    buildButton_barracks.setInteractive({useHandCursor:true});
    buildButton_barracks.on('pointerdown', function(pointer) {
      //console.log("barracks button");
      if (player.gold >= barracksInfo.cost) {
        this.removeSelected();
        buildButton_barracks.setTexture('buttonBarracks_selected');
        build_signal = 2;
      } else if (barracksInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // castle
    var buildButton_castle = this.add.sprite(_width-340, _height-25,"buttonCastle").setOrigin(0.5,0.5);
    buildButton_castle.name="Castle";
    buttons.push(buildButton_castle);
    buildButton_castle.setInteractive({useHandCursor:true});
    buildButton_castle.on('pointerdown', function(pointer) {
      //console.log("castle button");
      if (player.gold >= castleInfo.cost) {
        this.removeSelected();
        buildButton_castle.setTexture('buttonCastle_selected');
        build_signal = 3;
      } else if (castleInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // machinery
    var buildButton_machinery = this.add.sprite(_width-280, _height-25,"buttonMachinery").setOrigin(0.5,0.5);
    buildButton_machinery.name = "Machinery";
    buttons.push(buildButton_machinery);
    buildButton_machinery.setInteractive({useHandCursor:true});
    buildButton_machinery.on('pointerdown', function(pointer) {
      //console.log("machinery button");
      if (player.gold >= machineryInfo.cost) {
        this.removeSelected();
        buildButton_machinery.setTexture('buttonMachinery_selected');
        build_signal = 4;
      } else if (machineryInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // mine
    var buildButton_mine = this.add.sprite(_width-220, _height-25,"buttonMine").setOrigin(0.5,0.5);
    buildButton_mine.name = "Mine";
    buttons.push(buildButton_mine);
    buildButton_mine.setInteractive({useHandCursor:true});
    buildButton_mine.on('pointerdown', function(pointer) {
      //console.log("mine button");
      if (player.gold >= mineInfo.cost) {
        this.removeSelected();
        buildButton_mine.setTexture('buttonMine_selected');
        build_signal = 5;
      } else if (mineInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // temple
    var buildButton_temple = this.add.sprite(_width-160, _height-25,"buttonTemple").setOrigin(0.5,0.5);
    buildButton_temple.name = "Temple";
    buttons.push(buildButton_temple);
    buildButton_temple.setInteractive({useHandCursor:true});
    buildButton_temple.on('pointerdown', function(pointer) {
      //console.log("temple button");
      if (player.gold >= templeInfo.cost) {
        this.removeSelected();
        buildButton_temple.setTexture('buttonTemple_selected');
        build_signal = 6;
      } else if (templeInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);

    // towncenter
    var buildButton_townCenter = this.add.sprite(_width-100, _height-25,"buttonTownCenter").setOrigin(0.5,0.5);
    buildButton_townCenter.name = "TownCenter";
    buttons.push(buildButton_townCenter);
    buildButton_townCenter.setInteractive({useHandCursor:true});
    buildButton_townCenter.on('pointerdown', function(pointer) {
      //console.log("town center button");
      if (player.gold >= townCenterInfo.cost) {
        this.removeSelected();
        buildButton_townCenter.setTexture('buttonTownCenter_selected');
        build_signal = 7;
      } else if (townCenterInfo.cost > player.gold){ notEnoughGold = 1; }
    }, this);
  }

  onEvent(){
    build_signal = 0;
    //image1.setAlpha(0.5);
  }

}
