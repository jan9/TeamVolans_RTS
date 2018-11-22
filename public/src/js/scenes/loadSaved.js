var level1Saved, level2Saved, level3Saved;
var loadingSavedGame = false;
var loadinglevel = 0;
class Load extends Phaser.Scene {

  constructor() {
    super({key:'Load'});
  }

  preload() {
    this.load.image('title_l','Graphics/UI/sampleSelection.jpg');
    this.load.image('mainmenuButton', 'Graphics/screens/start_screen/buttons/Button_MainMenu.png');
    this.load.image('eraseButton', 'Graphics/screens/start_screen/buttons/erase.png');
    this.load.image('loadDataButton', 'Graphics/screens/start_screen/buttons/load.png');
  }

  create() {
    this.scene.sendToBack('Title');
    this.scene.sendToBack('Selection');
    this.scene.setVisible(false,'gameHUD');
    this.add.image(400,300,'title_l');
    this.homeButton();
    var box1 = this.add.image(_width*0.05, _height*0.05,'box').setOrigin(0,0).setDisplaySize(_width*0.9,_height*0.9).setAlpha(1);

    currentLevel = 0;
    check_gameover = 0;
    loadinglevel = 0;

    var loadMenuText = this.add.text(_width*0.38, _height*0.15, "Load Game", {font: "60px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);


    level1Saved = JSON.parse(localStorage.getItem('level1Data'));
    level2Saved = JSON.parse(localStorage.getItem('level2Data'));
    level3Saved = JSON.parse(localStorage.getItem('level3Data'));

    var savedDateInfo = {level1Saved: '', level2Saved: '', level3Saved: ''};
    if (localStorage.hasOwnProperty('level1Data') === true) {
      savedDateInfo.level1Saved = level1Saved.dateSaved;
    }
    if (localStorage.hasOwnProperty('level2Data') === true) {
      savedDateInfo.level2Saved = level2Saved.dateSaved;
    }
    if (localStorage.hasOwnProperty('level3Data') === true) {
      savedDateInfo.level3Saved = level3Saved.dateSaved;
    }

    this.getLevel1Data(savedDateInfo);
    this.getLevel2Data(savedDateInfo);
    this.getLevel3Data(savedDateInfo);

    console.log('[Load] create() complete');
  }

  update() {
  }

  getLevel1Data(savedDateInfo) {
    var lv1_text = this.add.text(_width*0.2, _height*0.31, "Level 1", {font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
    var lv1_info = this.add.text(_width*0.35, _height*0.33, savedDateInfo.level1Saved, {font: "20px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
    var lv1_erase = this.add.sprite(_width*0.6, _height* 0.35, 'eraseButton').setDisplaySize(100, 50);
    var lv1_load = this.add.sprite(_width*0.75, _height* 0.35, 'loadDataButton').setDisplaySize(100, 50);

    lv1_erase.setInteractive({useHandCursor:true});
    lv1_erase.on('pointerdown', function(pointer) {
      if (localStorage.hasOwnProperty('level1Data') === true)  {
        localStorage.removeItem('level1Data');
      }
      lv1_info.setText("");
    }, this);

    lv1_load.setInteractive({useHandCursor:true});
    lv1_load.on('pointerdown', function(pointer) {
      if (localStorage.hasOwnProperty('level1Data') === true)  {
        loadingSavedGame = true;
        loadinglevel = 1;
        this.scene.start('Level1');
      }
    }, this);
  }

 getLevel2Data(savedDateInfo) {
   var lv2_text = this.add.text(_width*0.2, _height*0.46, "Level 2", {font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
   var lv2_info = this.add.text(_width*0.35, _height*0.48, savedDateInfo.level2Saved, {font: "20px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
   var lv2_erase = this.add.sprite(_width*0.6, _height* 0.5, 'eraseButton').setDisplaySize(100, 50);
   var lv2_load = this.add.sprite(_width*0.75, _height* 0.5, 'loadDataButton').setDisplaySize(100, 50);

   lv2_erase.setInteractive({useHandCursor:true});
   lv2_erase.on('pointerdown', function(pointer) {
     if (localStorage.hasOwnProperty('level2Data') === true)  {
       localStorage.removeItem('level2Data');
     }
     lv2_info.setText("");
   }, this);

   lv2_load.setInteractive({useHandCursor:true});
   lv2_load.on('pointerdown', function(pointer) {
     if (localStorage.hasOwnProperty('level2Data') === true)  {
       loadingSavedGame = true;
       loadinglevel = 2;
       this.scene.start('Level2');
     }
   }, this);
 }

 getLevel3Data(savedDateInfo) {
   var lv3_text = this.add.text(_width*0.2, _height*0.61, "Level 3", {font: "40px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
   var lv3_info = this.add.text(_width*0.35, _height*0.63, savedDateInfo.level3Saved, {font: "20px Georgia", color: "black"}).setOrigin(0,0).setPadding(1,1);
   var lv3_erase = this.add.sprite(_width*0.6, _height* 0.65, 'eraseButton').setDisplaySize(100, 50);
   var lv3_load = this.add.sprite(_width*0.75, _height* 0.65, 'loadDataButton').setDisplaySize(100, 50);

   lv3_erase.setInteractive({useHandCursor:true});
   lv3_erase.on('pointerdown', function(pointer) {
     if (localStorage.hasOwnProperty('level3Data') === true)  {
       localStorage.removeItem('level3Data');
     }
     lv3_info.setText("");
   }, this);

   lv3_load.setInteractive({useHandCursor:true});
   lv3_load.on('pointerdown', function(pointer) {
     if (localStorage.hasOwnProperty('level3Data') === true)  {
       loadingSavedGame = true;
       loadinglevel = 3;
       this.scene.start('Level3');
     }
   }, this);
 }

  level1Button() {
    // button directed to level 1
    var shadow = this.add.sprite(_width*0.775+5, _height*0.78+5,'startButton');
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;
    var button2 = this.add.sprite(_width*0.775,_height*0.78,'startButton');
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Level1');}, this);
  }

  homeButton() {
    // button for going back to the main menu
    var homeButton = this.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40).setDepth(20);
    homeButton.setInteractive({useHandCursor:true});
    homeButton.on('pointerdown', function(pointer) {this.scene.start('Title');}, this);
  }
}
