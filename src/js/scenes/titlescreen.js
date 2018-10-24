class Title extends Phaser.Scene {
  constructor() {
    super({key:'Title'});
  }

  preload() {
    this.load.image('bg_Title','Graphics/screens/StartMenu.png');
    //this.load.image('logo','assets/UI/logo_golden.png');
    this.load.image('button', 'assets/UI/button/button1.png');
  }

  create() {
    this.scene.setVisible(false,'gameHUD');
    this.add.image(0,0,'bg_Title').setOrigin(0,0).setDisplaySize(_width,_height);
    //var logo = this.add.sprite(_width/2,(_height/2)/3,'logo').setOrigin(0.5,0.5);
    this.buttons();
    console.log("[Title] create() complete");
  }

  // other functions
  buttons() {
    // styling texts that go on top of buttons
    var style = {
        fontSize: '32px',
        fontFamily: 'Georgia',
        color: '#ffffff'
    };
    // Buttons' shadows created first; this way buttons overlays on top
    // button for starting a new game
        var shadow1 = this.add.sprite(410,210,'button');
        shadow1.tint = 0x000000;
        shadow1.alpha = 0.6;
        var button1 = this.add.sprite(400,200,'button');
        var text1 = this.add.text(400, 200, "New Game", style).setOrigin(0.5,0.5);
        button1.setInteractive({useHandCursor:true});
        button1.on('pointerdown', function(pointer) {this.scene.start('Selection');}, this);

      // button for loading a saved game
        var shadow2 = this.add.sprite(410,310,'button');
        shadow2.tint = 0x000000;
        shadow2.alpha = 0.6;
        var button2 = this.add.sprite(400,300,'button');
        var text2 = this.add.text(400, 300, "Saved Game", style).setOrigin(0.5,0.5);
        button2.setInteractive({useHandCursor:true});
        button2.on('pointerdown', function(pointer) {this.scene.start('Load');}, this);

      // button for instructions on how to play the game
        var shadow3 = this.add.sprite(410,410,'button');
        shadow3.tint = 0x000000;
        shadow3.alpha = 0.6;
        var button3 = this.add.sprite(400,400,'button');
        var text3 = this.add.text(400, 400, "How to Play", style).setOrigin(0.5,0.5);
        button3.setInteractive({useHandCursor:true});
        button3.on('pointerdown', function(pointer) {this.scene.start('Instructions');}, this);

      // button for starting a test game
        var shadow4 = this.add.sprite(410,510,'button');
        shadow4.tint = 0x000000;
        shadow4.alpha = 0.6;
        var button4 = this.add.sprite(400,500,'button');
        var text4 = this.add.text(400, 500, "Test AI", style).setOrigin(0.5,0.5);
        button4.setInteractive({useHandCursor:true});
        button4.on('pointerdown', function(pointer) {this.scene.start('TestAI');}, this);

        console.log("[Title] Buttons made");
  }

}
