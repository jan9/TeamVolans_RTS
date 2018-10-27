/*
  Level 3: a water and grass map
    Requires successful completion of level 2
*/
class Level3 extends Phaser.Scene {

  constructor() {
    super({key:'Level3'});
  }

  preload() {
    this.load.image('map3','assets/UI/sampleMap.png');
    this.load.image('button', 'assets/UI/button/button.png');
  }

  create() {
    this.scene.sendToBack('Level2');
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    this.add.image(screen.width/3, screen.height/5, 'map3');

    // checking to have received correct data
    console.log(gameMode.name);
    // set up the player kingdom
    console.log(kingdomSelection.name);
    player = new Kingdom(fortuneFederationInfo, 100, -150, this);

    // set up the ai kingdom
    console.log(opponentKingdom);

    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);

    currentLevel = 3;
    gameStartTime = Date.now();
    console.log('[Level3] create() complete');
  }
  update() {
    // randomly assign different AI?
    if (backToMainMenu === 1 && currentLevel === 3) {
      this.scene.start('Title');
      backToMainMenu = 0;
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
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this));
        player.buildingsAmount++;
        build_signal = 0;
      }
    },this);
  }
}
