/*
    Level 1
*/
// global variables

var x;
var y;
var pointer;
var playerKingdom, aiKingdom;
var controls;
var selectedUnit;
class TestAI extends Phaser.Scene {

  constructor() {
    super({key:'TestAI'});
  }

  preload() {

    createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
    createStructureSprites(this); // found in scenes/util/createSpriteImages.js
    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
    this.load.image('button', 'assets/UI/button/button.png');

  }

  create() {
    createUnitAnims(this);

    this.scene.sendToBack('Selection');
    this.map = this.add.tilemap('map');
    var tileset =[this.map.addTilesetImage('Background1', 'tiles1'),
    this.map.addTilesetImage('Background2', 'tiles2'),
    this.map.addTilesetImage('Background5', 'tiles5'),
    this.map.addTilesetImage('water_tile', 'tilesW')];

    this.map.createDynamicLayer("Tile Layer 1", tileset);
    this.map.createDynamicLayer("Tile Layer 2", tileset);
    this.map.createDynamicLayer("Tile Layer 3", tileset);

    var startingObjects = this.map.getObjectLayer("GameObjects").objects;

    this.physics.world.setBounds(0,0,50,50);
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    var cursors = this.input.keyboard.createCursorKeys();

    this.input.on('gameobjectdown', onObjectClicked);

    var W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    var A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    var D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    var controlConfig = {
        camera: this.cameras.main,
        left: A,
        right: D,
        up: W,
        down: S,
        acceleration: 0.001,
        drag: 0.0005,
        maxSpeed: 0.6
    };
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


    player = new Kingdom(duelingDominionInfo, _width*0.9, _height*0.9, true, this, startingObjects);


      ai = new AIKingdom(equalEmpireInfo, 50, 50, this, startingObjects);

      //outputs to the console the kingdom info for testing purposes
     var outputInfo = this.time.addEvent({ delay: 20000, callback: this.outputTestingInfo,
         callbackScope: this, loop: true, args: [] });


    //runs every 10 seconds to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 10000, callback: this.aiUpdate,
    callbackScope: this, loop: true, args: [] });

    playerWon = false;
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;

    this.pointerInput();

  }

  outputTestingInfo(){
     console.log(ai);
   }
  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  update(delta) {
    controls.update(delta);
    if (backToMainMenu === 1 && currentLevel === 1) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }
    ai.updateAIKingdom(player);
    player.updatePlayerKingdom();

  }



  // adds buildings to the current player's kingdom
  // TODO: building images need to be corrected,
  // TODO: building time needs to be reflected,
  // TODO: building cost needs to be reflected
  //Thoughts: Have function to see if a villager is available (not already building something)
  //then have villager move to location and build structure
  pointerInput() {
    this.input.on('pointerdown', function(pointer) {
      var structureInfo;
      x = pointer.worldX;
      y = pointer.worldY;

      if(build_signal > 0 && selectedUnit.type === "Villager"){

        if (build_signal === 1) {
          structureInfo = "Archery Range";
          build_signal = 0;
        }
        else if (build_signal === 2) {
          structureInfo = "Barracks";
          build_signal = 0;
        }
        else if (build_signal === 3) {
          structureInfo = "Castle";
          build_signal = 0;
        }
        else if (build_signal === 4) {
          structureInfo = "Machinery";
          build_signal = 0;
        }
        else if (build_signal === 5) {
          structureInfo = "Mine";
          build_signal = 0;
        }
        else if (build_signal === 6) {
          structureInfo = "Temple";
          build_signal = 0;
        }
        else if (build_signal === 7) {
          structureInfo = "Town Center";
          build_signal = 0;
        }
        selectedUnit.startBuildStructure(structureInfo, player, this);
      }
      else{
        if(selectedUnit){
          selectedUnit.move(x, y, this);
        }
      }
  },this);
  }
}
