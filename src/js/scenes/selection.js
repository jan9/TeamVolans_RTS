var style = { fontSize: '15px', fontFamily: 'Georgia', color: 'white'};
var ai;
var player;
var backToMainMenu = 0;
var kingdomSelection = {name: '', chosen:'no'};
var gameMode = {name:''}; // default mode is easy;
var opponentKingdom = '';
var kingdomPool = ["Dueling Dominion","Equal Empire", "Fortune Federation", "Security Syndicate", "Remote Realm"];
var value = -1;
var warningMessage, aiMessage;

class Selection extends Phaser.Scene {

  constructor() {
    super({key:'Selection'});
  }

  preload() {
    this.load.image('title_g','assets/UI/sampleSelection.jpg');
    // this.load.image('box','Graphics/screens/start_screen/StartScreen_Box.png');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/misc_buttons/Button_MainMenu.png');
    this.load.image('Dueling Dominion', 'assets/UI/emblem/Dueling Dominion.svg');
    this.load.image('Equal Empire', 'assets/UI/emblem/Equal Empire.svg');
    this.load.image('Fortune Federation', 'assets/UI/emblem/Fortune Federation.svg');
    this.load.image('Remote Realm', 'assets/UI/emblem/Remote Realm.svg');
    this.load.image('Security Syndicate', 'assets/UI/emblem/Security Syndicate.svg');
    //this.load.image('Legendary League', 'assets/UI/emblem/Legendary League.svg');
  }

  create() {
    // 0. load the background and button to go back to the main menu
    this.scene.setVisible(false,'gameHUD');
    this.add.image(400,300,'title_g');
    var box1 = this.add.image(_width*0.05, _height*0.05,'box').setOrigin(0,0).setDisplaySize(_width*0.9,_height*0.9).setAlpha(1);
    this.backbutton();

    // 1. Player selects a kingdom
    // choose from Dueling Dominion, Equal Empire, Fortune Federation, Legendary League, Remote Realm, Security Syndicate
    // enblem generator: http://nailek.net/gw2/emblemeditor/#
    var text1 = this.add.text(_width*0.11, _height*0.15, "Select a kingdom: ", {font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
    var dd_emblem = this.emblemsetup(_width*0.13,_height*0.225,"Dueling Dominion");
    var ee_emblem = this.emblemsetup(_width*0.28,_height*0.225,"Equal Empire");
    var ff_emblem = this.emblemsetup(_width*0.44,_height*0.225,"Fortune Federation");
    var ss_emblem = this.emblemsetup(_width*0.60,_height*0.225,"Security Syndicate");
    var rr_emblem = this.emblemsetup(_width*0.76,_height*0.225,"Remote Realm");
    //var ll_emblem = this.emblemsetup(1200,180,"Legendary League");

    // 2. Player selects the game level
    var text2 = this.add.text(_width*0.11, _height*0.55, "Select a game difficulty: ",{font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
    var easyMode = this.modeSetup(_width*0.6, _height*0.57, "easy");
    var hardMode = this.modeSetup(_width*0.8, _height*0.57, "hard");

    //3. Random assignment of the AI kingdom
    value = Phaser.Math.Between(0, 4);  // Phaser's random number generator
    //opponentKingdom = kingdomPool[value];
    opponentKingdom = kingdomPool[2]; // Fortune Federation

    // 4. Start the Game
    warningMessage = this.add.text(_width*0.11, _height*0.75, "Please select a kingdom and game mode!",{font: "32px Georgia", color: "red"}).setPadding(1,1);
    aiMessage = aiMessage = this.add.text(_width*0.11, _height*0.75, '' ,{font: "32px Georgia", color: "black"}).setPadding(1,1);

    // optional: player provides a kingdom name (to be used when saving/loading a game)?
    console.log('[Selection] create() complete');
    }

  update() {

      if (kingdomSelection.name != '' && gameMode.name != '') {
        warningMessage = warningMessage.setText('');
        aiMessage = aiMessage.setText("Your AI opponent will be: " + opponentKingdom);
        this.level1Button();
      } else if (kingdomSelection.name != '' || gameMode.name != '') {
        aiMessage = aiMessage.setText('');
        warningMessage = warningMessage.setText('Please select a kingdom and game mode!');
      }

  }

  /* Helper functions  */
  backbutton() {
    // button for going back to the main menu
    var button1 = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40);
    button1.setInteractive({useHandCursor:true});
    button1.once('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }

  level1Button() {
    // button directed to level 1
    var shadow = this.add.sprite(_width*0.775+5, _height*0.78+5,'startButton');
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;
    var button2 = this.add.sprite(_width*0.775,_height*0.78,'startButton');
    button2.setInteractive({useHandCursor:true});
    button2.once('pointerdown', function(pointer) {this.scene.start('Level1');}, this);
  }

  emblemsetup(x, y, name) {
  var emblem = this.add.sprite(x, y, name).setDisplaySize(150,150).setOrigin(0,0);
  emblem.alpha = 1;
  var text = this.add.text(x,y+150,name,{font: "25px Georgia Black", color: "black", backgroundColor: "white"}).setDisplaySize(150,30).setPadding(1,1);
  emblem.setInteractive({useHandCursor:true});
  emblem.on('pointerdown', function(pointer) {
    if (kingdomSelection.chosen === 'yes' && kingdomSelection.name === name) {
      emblem.alpha = 1;
      text.setBackgroundColor('#ffffff');
      kingdomSelection.chosen = 'no'
      kingdomSelection.name = '';
    } else if (kingdomSelection.chosen === 'yes' && kingdomSelection.name != name) {
      emblem.alpha = 1;
      text.setBackgroundColor('#ffffff');
      kingdomSelection.chosen = 'yes'
    } else {
      kingdomSelection.name = name;
      emblem.alpha = 0.5;
      text.setBackgroundColor('#99e699');
      kingdomSelection.chosen = 'yes';
    }
    //console.log(kingdomSelection);
    }, this);
  }

  modeSetup(x, y, mode) {
    var text;
    if (mode == "easy") {
      text = this.add.text(x,y,mode, {font: "32px Georgia", color: "black", backgroundColor: "white"}).setPadding(1,1);
    } else {
      text = this.add.text(x,y,mode, {font: "32px Georgia", color: "black", backgroundColor: "white"}).setPadding(1,1);
    }
    text.setInteractive({useHandCursor:true});
    text.on('pointerdown', function(pointer) {
      if (gameMode.name === '' && mode != '') {
        gameMode.name = mode;
        if (mode === 'easy') {
          text.setBackgroundColor('#99e699');
        } else {
          text.setBackgroundColor('#99e699');
        }
      } else if (gameMode.name != '' && gameMode.name === mode) {
        gameMode.name ='';
        text.setBackgroundColor('#ffffff');
      }
      //console.log(gameMode);
    }, this);
  }

}
