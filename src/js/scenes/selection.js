var style = { fontSize: '15px', fontFamily: 'Georgia', color: 'white'};
var kingdomSelection = {name: '', chosen:'no'};
var gameMode = {name:''}; // default mode is easy;
var opponentKingdom = '';
var kingdomPool = ["Dueling Dominion","Equal Empire", "Fortune Federation", "Security Syndicate", "Remote Realm"];
var value = -1;


class Selection extends Phaser.Scene {

  constructor() {
    super({key:'Selection'});
  }

  preload() {
    this.load.image('title_g','assets/UI/sampleSelection.jpg');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('Dueling Dominion', 'assets/UI/emblem/Dueling Dominion.svg');
    this.load.image('Equal Empire', 'assets/UI/emblem/Equal Empire.svg');
    this.load.image('Fortune Federation', 'assets/UI/emblem/Fortune Federation.svg');
    //this.load.image('Legendary League', 'assets/UI/emblem/Legendary League.svg');
    this.load.image('Remote Realm', 'assets/UI/emblem/Remote Realm.svg');
    this.load.image('Security Syndicate', 'assets/UI/emblem/Security Syndicate.svg');
  }

  create() {
    // 0. load the background and buttons
    this.add.image(400,300,'title_g');
    this.backbutton();

    // 1. Player selects a kingdom
    // choose from Dueling Dominion, Equal Empire, Fortune Federation, Legendary League, Remote Realm, Security Syndicate
    // enblem generator: http://nailek.net/gw2/emblemeditor/#
    var text1 = this.add.text(_width/10, _height/20, "Select a kingdom: ", {font: "50px Georgia", color: "white", backgroundColor: "#00b8ff"}).setPadding(1,1);
    var dd_emblem = this.emblemsetup(200,180,"Dueling Dominion");
    var ee_emblem = this.emblemsetup(400,180,"Equal Empire");
    var ff_emblem = this.emblemsetup(600,180,"Fortune Federation");
    var ss_emblem = this.emblemsetup(800,180,"Security Syndicate");
    var rr_emblem = this.emblemsetup(1000,180,"Remote Realm");
    //var ll_emblem = this.emblemsetup(1200,180,"Legendary League");

    // 2. Player selects the game level
    var text2 = this.add.text(_width/10, _height/2, "Select a game difficulty: ",{font: "50px Georgia", color: "white", backgroundColor: "#00b8ff"}).setPadding(1,1);
    var easyMode = this.modeSetup(_width*0.6, _height*0.52, "easy");
    var hardMode = this.modeSetup(_width*0.8, _height*0.52, "hard");

    //3. Random assignment of the AI kingdom
    var text2 = this.add.text(_width/10, _height*0.7, "Your AI opponent's kingdom will be randomly assigned.",{font: "40px Georgia", color: "white", backgroundColor: "#00b8ff"}).setPadding(1,1);
    value = Phaser.Math.Between(0, 5);
    opponentKingdom = kingdomPool[value];
    //Math.floor(Math.random()*5)];

    // 4. Start the Game
    // optional: player provides a kingdom name (to be used when saving/loading a game)

    console.log('[Selection] create() complete');
    }

  update() {
    if (kingdomSelection.name != '' && gameMode.name != '') {
      this.level1Button(); //hide until all the selection has been made
    }
  }
  backbutton() {
    // button for going back to the main menu
    var button1 = this.add.sprite(0,0,'button');
    var text1 = this.add.text(10, 3, "Main Menu", style).setOrigin(0,0);
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }

  level1Button() {
    // button directed to level 1
    var shadow = this.add.sprite(_width*0.9+10, _height*0.9+10,'button');
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;
    var button2 = this.add.sprite(_width*0.9,_height*0.9,'button');
    var text2 = this.add.text(_width*0.9, _height*0.9, "Start", {font: "32px Georgia"}).setOrigin(0.5,0.5);
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level1');}, this);
  }

  emblemsetup(x, y, name) {
  var emblem = this.add.sprite(x, y, name).setDisplaySize(150,150);
  emblem.alpha = 1;
  var text = this.add.text(x-70,y+70,name,{font: "25px Georgia Black", color: "black", backgroundColor: "white"}).setDisplaySize(150,30).setPadding(1,1);
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
    console.log(kingdomSelection);
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
      console.log(gameMode);}, this);
      }


}
