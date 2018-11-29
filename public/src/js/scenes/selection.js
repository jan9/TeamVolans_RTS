var style = { fontSize: '15px', fontFamily: 'Georgia', color: 'white'};
var backToMainMenu = 0;
var kingdomSelection = {name: '', chosen:'no'};
var gameMode = {name:''}; // default mode is easy;
var opponentKingdom = '';
var kingdomPool = ["Dueling Dominion","Equal Empire", "Fortune Federation", "Security Syndicate", "Remote Realm"];
var value = -1;
var warningMessage, aiMessage;
var dd_emblem,ee_emblem,ff_emblem,ss_emblem,rr_emblem;
var dd_text,ee_text,ff_text,ss_text,rr_text;
var easyMode, hardMode;
class Selection extends Phaser.Scene {

  constructor() {
    super({key:'Selection'});
  }

  preload() {
  }

  create() {
    kingdomSelection = {name: '', chosen:'no'};
    gameMode = {name:''};

    // 0. load the background and button to go back to the main menu
    this.scene.setVisible(false,'gameHUD');
    this.add.image(400,300,'title_g');
    currentLevel = 0;
    homeButton(this);
    var box1 = this.add.image(_width*0.05, _height*0.05,'selectionBox').setOrigin(0,0).setDisplaySize(_width*0.9,_height*0.9).setAlpha(1);

    // 1. Player selects a kingdom
    // choose from Dueling Dominion, Equal Empire, Fortune Federation, Legendary League, Remote Realm, Security Syndicate
    // enblem generator: http://nailek.net/gw2/emblemeditor/#
    //var selection_text1 = this.add.text(_width*0.11, _height*0.15, "Select a kingdom: ", {font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);

    dd_emblem = this.emblemsetup(_width*0.13,_height*0.225,"Dueling Dominion");
    dd_text = this.emblem_textSetup(_width*0.13,_height*0.225,"Dueling Dominion", dd_emblem);

    ee_emblem = this.emblemsetup(_width*0.28,_height*0.225,"Equal Empire");
    ee_text = this.emblem_textSetup(_width*0.28,_height*0.225,"Equal Empire", ee_emblem);

    ff_emblem = this.emblemsetup(_width*0.44,_height*0.225,"Fortune Federation");
    ff_text = this.emblem_textSetup(_width*0.44,_height*0.225,"Fortune Federation", ff_emblem);

    ss_emblem = this.emblemsetup(_width*0.60,_height*0.225,"Security Syndicate");
    ss_text = this.emblem_textSetup(_width*0.60,_height*0.225,"Security Syndicate", ss_emblem);

    rr_emblem = this.emblemsetup(_width*0.76,_height*0.225,"Remote Realm");
    rr_text = this.emblem_textSetup(_width*0.76,_height*0.225,"Remote Realm", rr_emblem);
    //var ll_emblem = this.emblemsetup(1200,180,"Legendary League");

    // 2. Player selects the game level
    //var selection_text2 = this.add.text(_width*0.11, _height*0.55, "Select a game difficulty: ",{font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
    easyMode = this.modeSetup(_width*0.45, _height*0.65, "easy");
    hardMode = this.modeSetup(_width*0.65, _height*0.65, "hard");

    //3. Random assignment of the AI kingdom
    value = Phaser.Math.Between(0, 4);  // Phaser's random number generator
    opponentKingdom = kingdomPool[value];

    // 4. Start the Game
    warningMessage = this.add.text(_width*0.11, _height*0.75, "Please select a kingdom and game mode!",{font: "32px Georgia", color: "red"}).setPadding(1,1);
    aiMessage = aiMessage = this.add.text(_width*0.11, _height*0.75, '' ,{font: "32px Georgia", color: "black"}).setPadding(1,1);

    console.log('[Selection] create() complete');
    }

  update() {
    if (backToMainMenu === 1) {
      backToMainMenu = 0;
      this.scene.start('Title');
    }
    homeButton(this);
    check_gameover = 0;
    currentData = "";
    if (kingdomSelection.name != '' && gameMode.name != '') {
      warningMessage = warningMessage.setText('');
      aiMessage = aiMessage.setText("Your AI opponent will be: " + opponentKingdom);
      this.level1Button();
    } else if (kingdomSelection.name != '' || gameMode.name != '') {
      aiMessage = aiMessage.setText('');
      warningMessage = warningMessage.setText('Please select a kingdom and game mode!');
    }

    this.checkSelectionButtons();
}
  /* Helper functions  */

  // start level 1
  level1Button() {
    // button directed to level 1
    var shadow = this.add.sprite(_width*0.775+5, _height*0.78+5,'startButton');
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;
    var button2 = this.add.sprite(_width*0.775,_height*0.78,'startButton');
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level1');}, this);
  }

  // emblem and emblem text setup functions
  emblemsetup(x, y, name) {
    var emblem = this.add.sprite(x, y, name).setDisplaySize(150,150).setOrigin(0,0);
    emblem.alpha = 1;
    return emblem;
  }

  emblem_textSetup(x, y, name, emblem) {
    var emblem_text = this.add.text(x,y+150,name,{font: "25px Georgia Black", color: "black", backgroundColor: "white"}).setDisplaySize(150,30).setPadding(1,1);
    emblem.setInteractive({useHandCursor:true});
    emblem.on('pointerdown', function(pointer) {
      if (kingdomSelection.chosen === 'yes' && kingdomSelection.name === name) {
        emblem.alpha = 1;
        emblem_text.setBackgroundColor('#ffffff');
        kingdomSelection.chosen = 'no'
        kingdomSelection.name = '';
      } else if (kingdomSelection.chosen === 'yes' && kingdomSelection.name != name) {
        emblem.alpha = 1;
        emblem_text.setBackgroundColor('#ffffff');
        kingdomSelection.chosen = 'yes'
      } else {
        kingdomSelection.name = name;
        emblem.alpha = 0.5;
        emblem_text.setBackgroundColor('#99e699');
        kingdomSelection.chosen = 'yes';
      }
      //console.log(kingdomSelection);
    }, this);
    return emblem_text;
  }

  // creating game difficulty buttons
  modeSetup(x, y, mode) {
    var text = this.add.text(x,y,mode, {font: "32px Georgia", color: "black", backgroundColor: "white"}).setPadding(1,1);
    text.setInteractive({useHandCursor:true});
    text.on('pointerdown', function(pointer) {
      if (gameMode.name === '' && mode != '') {
        gameMode.name = mode;
        text.setBackgroundColor('#99e699');
      } else if (gameMode.name != '' && gameMode.name === mode) {
        gameMode.name ='';
        text.setBackgroundColor('#ffffff');
      }
      //console.log(gameMode);
    }, this);
    return text;
  }

  // checks to see if previous selections are still valid
  checkSelectionButtons () {
    if (kingdomSelection.name === dd_emblem.texture.key) {
      dd_emblem.alpha = 0.5;
      dd_text.setBackgroundColor('#99e699');
    } else if (kingdomSelection.name === ff_emblem.texture.key) {
      ff_emblem.alpha = 0.5;
      ff_text.setBackgroundColor('#99e699');
    } else if (kingdomSelection.name === ee_emblem.texture.key) {
      ee_emblem.alpha = 0.5;
      ee_text.setBackgroundColor('#99e699');
    } else if (kingdomSelection.name === ss_emblem.texture.key) {
      ss_emblem.alpha = 0.5;
      ss_text.setBackgroundColor('#99e699');
    } else if (kingdomSelection.name === rr_emblem.texture.key) {
      rr_emblem.alpha = 0.5;
      rr_text.setBackgroundColor('#99e699');
    } else {
      dd_emblem.alpha = 1; dd_text.setBackgroundColor('#ffffff');
      ee_emblem.alpha = 1; ee_text.setBackgroundColor('#ffffff');
      ff_emblem.alpha = 1; ff_text.setBackgroundColor('#ffffff');
      ss_emblem.alpha = 1; ss_text.setBackgroundColor('#ffffff');
      rr_emblem.alpha = 1; rr_text.setBackgroundColor('#ffffff');
    }

    if (gameMode.name === easyMode._text) {
      easyMode.style.setBackgroundColor('#99e699');
    } else if (gameMode.name === hardMode._text) {
      hardMode.style.setBackgroundColor('#99e699');
    } else {
      easyMode.style.setBackgroundColor('#ffffff');
      hardMode.style.setBackgroundColor('#ffffff');
    }
  }

}
