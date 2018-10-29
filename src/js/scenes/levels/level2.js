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
  }

  create() {
    this.scene.sendToBack('Level1');
    this.scene.launch('gameHUD');
    this.scene.setVisible(true,'gameHUD');
    this.scene.bringToTop('gameHUD');
    this.add.image(screen.width/4, screen.height/4, 'map2');

    // checking to have received correct data
    console.log(gameMode.name);
    // set up the player kingdom
    console.log(kingdomSelection.name);
    player = new Kingdom(fortuneFederationInfo, 100, -150, this);

    // set up the ai kingdom
    console.log(opponentKingdom);

    ai = new AIKingdom(fortuneFederationInfo, 50, 50, this);

    currentLevel = 2;
    goto = 'Level3';
    gameStartTime = Date.now();
    currentGold = player.gold;
    currentPopulation = player.unitAmount;
    console.log('[Level2] create() complete');
  }

  update() {
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
        player.gold -= archeryRangeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 2) {
        player.buildings.push(new Structure(barracksInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 3) {
        player.buildings.push(new Structure(castleInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= barracksInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 4) {
        player.buildings.push(new Structure(machineryInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= machineryInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 5) {
        player.buildings.push(new Structure(mineInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= mineInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 6) {
        player.buildings.push(new Structure(templeInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= templeInfo.cost;
        build_signal = 0;
      }
      else if (build_signal === 7) {
        player.buildings.push(new Structure(townCenterInfo, x, y, this));
        player.buildingsAmount++;
        player.gold -= townCenterInfo.cost;
        build_signal = 0;
      }
    },this);
  }
}
