class Title extends Phaser.Scene {
  constructor() {
    super({key:'Title'});
  }

  preload() {
    this.load.image('bg_Title','Graphics/screens/start_screen/StartScreen_NoBox.png');
    this.load.image('box','Graphics/screens/start_screen/boxes/StartScreen_Box.png');
    this.load.image('startButton','Graphics/screens/start_screen/buttons/StartScreen_Start.png');
    this.load.image('howtoplayButton','Graphics/screens/start_screen/buttons/Button_HowtoPlay.png');
    this.load.image('loadButton', 'Graphics/screens/start_screen/buttons/StartScreen_Load.png');
    this.load.image('button', 'Graphics/UI/button/button1.png');  // for AI testing
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    // add background image
    this.add.image(0,0,'bg_Title').setOrigin(0,0).setDisplaySize(_width,_height);
    // add a box where the buttons are going to overlay
    this.add.image(_width*0.5, _height*0.78,'box').setDisplaySize(_width/2,_height/2.5);
    // add the buttons
    this.buttons();
    currentLevel = 0;
    check_gameover = 0;
    loadingSavedGame = false;
    loadinglevel = 0;
    console.log("[Title] create() complete");
  }

  update() {

  }

  /* Helper functions  */
  buttons() {
    // button for starting a new game
    var button1 = this.add.sprite(_width*0.5, _height*0.675, 'startButton');
    button1.setInteractive({useHandCursor:true});
    button1.on('pointerdown', function(pointer) {this.scene.start('Selection');}, this);

    // button for loading a saved game
    var button2 = this.add.sprite(_width*0.5, _height*0.775, 'loadButton');
    button2.setInteractive({useHandCursor:true});
    button2.on('pointerdown', function(pointer) {this.scene.start('Load');}, this);

    // button for instructions on how to play the game
    var button3 = this.add.sprite(_width*0.5, _height*0.875, 'howtoplayButton');
    button3.setInteractive({useHandCursor:true});
    button3.on('pointerdown', function(pointer) {this.scene.start('Instructions');}, this);

    // button for starting a test game
    var shadow4 = this.add.sprite(100,200,'button');
    shadow4.tint = 0x000000;
    shadow4.alpha = 0.6;
    var button4 = this.add.sprite(95,195,'button');
    var text4 = this.add.text(95, 195, "(For dev purpose)\nTest AI", style).setOrigin(0.5,0.5);
    button4.setInteractive({useHandCursor:true});
    button4.on('pointerdown', function(pointer) {this.scene.start('TestAI');}, this);

    //console.log("[Title] Buttons made");
  }

}
