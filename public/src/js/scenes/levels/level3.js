/*
  Level 3:
    Requires successful completion of level 2
*/
class Level3 extends Phaser.Scene {

  constructor() {
    super({key:'Level3'});
  }

  preload() {
    createUnitSprites(this);
    createStructureSprites(this);
    createHealthBarSprites(this);
    this.load.image('tiles', 'Graphics/TileSets/BackgroundComplete.png');
    this.load.tilemapTiledJSON('map3', 'Graphics/maps/Level_3.json');
  }

  create() {
    createUnitAnims(this);
    this.scene.sendToBack('Level2');
    this.map = this.add.tilemap('map3');
    var tileset =[this.map.addTilesetImage('BackgroundComplete', 'tiles')];
    this.map.createDynamicLayer("Tile Layer 1", tileset);
    this.map.createDynamicLayer("Tile Layer 2", tileset);
    this.map.createDynamicLayer("Tile Layer 3", tileset);
    this.map.createDynamicLayer("Tile Layer 4", tileset);

    var startingObjects = this.map.getObjectLayer("ObjectLayer").objects;

    // sets a boundary for main camera
    this.cameras.main.setBounds(-100, -100, this.map.widthInPixels+200, this.map.heightInPixels+200);
    this.cameras.main.centerOn(_width*0.5, _height*2.5);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    // the parameter values hold true only for level 3 map
    getMiniMap(this, -160, 260, 375, 375, 0.065);

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
    let hardMode = false;
    if(gameMode.name === "hard"){
      hardMode = true;
    }

    var startingObjects = this.map.getObjectLayer("GameObjects").objects;

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
      ai = new AIKingdom(duelingDominionInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Equal Empire") {
      ai = new AIKingdom(equalEmpireInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Fortune Federation") {
      ai = new AIKingdom(fortuneFederationInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Security Syndicate") {
      ai = new AIKingdom(securitySyndicateInfo, 50, 50, this, startingObjects, hardMode);
    } else if (opponentKingdom === "Remote Realm") {
      ai = new AIKingdom(remoteRealmInfo, 50, 50, this, startingObjects, hardMode);
    };

    //runs every 1 second to get the ai priority attack locations
    var aiEvent = this.time.addEvent({ delay: 1000, callback: this.aiUpdate,
    callbackScope: this, loop: true, args: [] });

    currentLevel = 3;
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;

    dragSelect(this, player);
    this.pointerInput();

    console.log('[Level3] create() complete');
  }

  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  update(delta) {
      controls.update(delta);
    // randomly assign different AI?
    if (backToMainMenu === 1 && currentLevel === 3) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }

      ai.updateAIKingdom(player);
      player.updatePlayerKingdom(player);
  }
  //updates the target list of the ai (done every 10 seconds)
  aiUpdate(){
    ai.updateCurrentTargetList(player);
  }

  pointerInput() {
    this.input.on('pointerdown', function(pointer) {
      var structureInfo;
      x = Phaser.Math.RoundAwayFromZero(pointer.worldX);
      y = Phaser.Math.RoundAwayFromZero(pointer.worldY);
      console.log("[Level1] pointerInput() x,y: "+ x +","+y);
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
}
