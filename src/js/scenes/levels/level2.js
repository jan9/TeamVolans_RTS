/*
  Level 2: a snow map
    Requires successful completion of level 1
*/
class Level2 extends Phaser.Scene {

  constructor() {
    super({key:'Level2'});
  }

  preload() {
    this.load.image('map2','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
    this.load.image('tiles', 'Graphics/TileSets/BackgroundComplete.png');
    this.load.tilemapTiledJSON('map2', 'Graphics/maps/Level_2.json');
  }

  create() {
    this.scene.sendToBack('Level1');
    this.map = this.add.tilemap('map2');
    var tileset =[this.map.addTilesetImage('BackgroundComplete', 'tiles')];
    this.map.createDynamicLayer("Layer1", tileset);
    this.map.createDynamicLayer("Layer2", tileset);
    this.map.createDynamicLayer("Layer3", tileset);
    //TODO: object layer

    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.01,
        drag: 0.0005,
        maxSpeed: 0.4
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    console.log(gameMode.name);
    // set up the player kingdom
    console.log(kingdomSelection.name);
    player = new Kingdom(fortuneFederationInfo, 100, -150, this);

    // set up the ai kingdom
    // TODO: change the opponentKingdom?
    console.log(opponentKingdom);

    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);

    playerWon = false;
    currentLevel = 2;
    goto = 'Level3';
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;
    console.log('[Level2] create() complete');
  }

  update(delta) {
      controls.update(delta);
    // randomly assign different AI?
    if (backToMainMenu === 1 && currentLevel === 2) {
      backToMainMenu = 0;
      this.scene.start('Title');
    } else if (check_gameover === 1) {
      check_gameover = 0;
      this.scene.start('Gameover');
    }
    this.addBuildings();

  }



  // adds buildings to the current player's kingdom
  // TODO: building images need to be corrected,
  // TODO: building time needs to be reflected,
  // TODO: building cost needs to be reflected
  addBuildings() {
    this.input.on('pointerdown', function(pointer) {
      x = pointer.x;
      y = pointer.y;
      if (build_signal === 1) {
        player.buildings.push(new Structure(archeryRangeInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= archeryRangeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= machineryInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= mineInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= templeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this));
        player.buildingsAmount++;
        currentGold -= townCenterInfo.cost;
        build_signal = 0;
      }
    },this);
  }
}
