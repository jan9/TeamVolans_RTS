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
var dragSelect_Rect;
class Level1 extends Phaser.Scene {

  constructor() {
    super({key:'Level1'});
  }

  preload() {

    createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
    createStructureSprites(this); // found in scenes/util/createSpriteImages.js
    this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
    this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
    this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
    this.load.image('tilesW', 'Graphics/TileSets/water.png');
    this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
    this.load.image('button', 'Graphics/UI/button/button.png');

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

    // sets a boundary for main camera
    this.cameras.main.setBounds(0, -100, _width*1.28, _height*2.6);
    this.cameras.main.centerOn(_width*0.5, _height*2.5);
    this.physics.world.setBounds(0, 0, _width*1.28, _height*2.5);

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    //TODO: minimap
    /*
    //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
   this.minimap = this.cameras.add(0, -100, _width*1.28, _height*2.6).setZoom(0.2).setName('mini');
   //this.minimap.setBackgroundColor(0x002244);
   this.minimap.scrollX = 3600;
   this.minimap.scrollY = 300;
   */
    var cursors = this.input.keyboard.createCursorKeys();

    this.input.on('gameobjectdown', onObjectClicked, this.scene);

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

    // checking to have received correct data
    console.log(gameMode.name);

    // set up the player kingdom
    console.log(kingdomSelection.name);
    if (kingdomSelection.name === "Dueling Dominion") {
      player = new Kingdom(duelingDominionInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Equal Empire") {
      player = new Kingdom(equalEmpireInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Fortune Federation") {
      player = new Kingdom(fortuneFederationInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Security Syndicate") {
      player = new Kingdom(securitySyndicateInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    } else if (kingdomSelection.name === "Remote Realm") {
      player = new Kingdom(remoteRealmInfo, _width*0.9, _height*0.9, true, this, startingObjects);
    };

    // set up the ai kingdom
    console.log(opponentKingdom);
    if (opponentKingdom === "Dueling Dominion") {
      ai = new AIKingdom(duelingDominionInfo, 50, 50, this, startingObjects);
    } else if (opponentKingdom === "Equal Empire") {
      ai = new AIKingdom(equalEmpireInfo, 50, 50, this, startingObjects);
    } else if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this, startingObjects);
    } else if (opponentKingdom === "Security Syndicate") {
      ai = new AIKingdom(securitySyndicateInfo, 50, 50, this, startingObjects);
    } else if (opponentKingdom === "Remote Realm") {
      ai = new AIKingdom(remoteRealmInfo, 50, 50, this, startingObjects);
    };

    updateColliders(this, ai, player);

    //runs every 10 seconds to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 10000, callback: this.aiUpdate,
    callbackScope: this, loop: true, args: [] });

    playerWon = false;
    currentLevel = 1;
    goto = 'Level2';
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;

    console.log('[Level1] create() complete');
  }


  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  update(delta) {
    controls.update(delta);

    this.dragSelect(this);

    if (backToMainMenu === 1 && currentLevel === 1) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }

    this.pointerInput();

    ai.updateAIKingdom(player);
    player.updatePlayerKingdom(player);

  }



  pointerInput() {
    this.input.on('pointerdown', function(pointer) {
      var structureInfo;
      x = Phaser.Math.RoundAwayFromZero(pointer.worldX);
      y = Phaser.Math.RoundAwayFromZero(pointer.worldY);

      //check if we were selecting a game object, not doing pointer Input
      //basically setting the input for gameObjectDown also calls this input function...even if we don't want it Called
      //so this is a check to ignore this function if gameObject is really what we were calling
      if(gameObjectClicked){
        gameObjectClicked = false;
      }

      else{
      if(selectedUnit){
        //if there is a build signa; and a unit selected is villager, build the structure
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
        /*//move the unit to the location
        else if (build_signal <= 0){
            selectedUnit.move(x, y, this);
        }*/
      }
    }
  },this);
  }

  dragSelect(scene) {
    var graphics = this.add.graphics();

    var color = 0xffff00;
    var thickness = 1;
    var alpha = 1;

    var draw = false;
    var downX, downY;

    scene.input.on('pointerdown', function(pointer) {
      if (pointer.leftButtonDown()){
      downX = Phaser.Math.RoundAwayFromZero(pointer.worldX);
      downY = Phaser.Math.RoundAwayFromZero(pointer.worldY);
      draw = true;
      }
    });
    scene.input.on('pointerup', function(){
      draw = false;
    });
    scene.input.on('pointermove', function(pointer){
      if (pointer.leftButtonDown()){
        if (draw) {
          graphics.clear();
          graphics.lineStyle(thickness, color, alpha);
          graphics.strokeRect(downX, downY, pointer.worldX - downX, pointer.worldY - downY);
        }
      }
    });
  }
}
