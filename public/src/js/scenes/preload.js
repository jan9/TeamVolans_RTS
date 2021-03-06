// Reference: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
      // "Preload" assets
      var progressBar = this.add.graphics().setDepth(1);
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0x89AD81, 0.4);
      progressBox.fillRect(_width*0.375-10, _height*0.5-10, 320, 50);
      var loadingText = this.make.text({
          x: _width*0.5,
          y: _height*0.5 - 50,
          text: 'Loading...',
          style: {
              font: '35px Georgia',
              fill: '#ffffff'
          }
      });
      loadingText.setOrigin(0.5, 0.5);

      //common assets that appear multiple times
      this.load.image('mainmenuButton', 'Graphics/screens/start_screen/buttons/Button_MainMenu.png');
      this.load.image('tiles', 'Graphics/TileSets/BackgroundComplete.png'); //levels 2 & 3

      // "Title" assets
      this.load.image('bg_Title','Graphics/screens/start_screen/StartScreen_NoBox.png');
      this.load.image('box','Graphics/screens/start_screen/boxes/StartScreen_Box.png');
      this.load.image('startButton','Graphics/screens/start_screen/buttons/StartScreen_Start.png');
      this.load.image('howtoplayButton','Graphics/screens/start_screen/buttons/Button_HowtoPlay.png');
      this.load.image('loadButton', 'Graphics/screens/start_screen/buttons/StartScreen_Load.png');
      this.load.image('quitButton', 'Graphics/screens/start_screen/buttons/StartScreen_Quit.png');
      this.load.image('button', 'Graphics/UI/button/button1.png');  // for AI testing

      // "Selection" assets
      this.load.image('title_g','Graphics/UI/sampleSelection.jpg');
      this.load.image('selectionBox','Graphics/screens/start_screen/boxes/selectionMenu.png');
      this.load.image('Dueling Dominion', 'Graphics/UI/emblem/Dueling Dominion.svg');
      this.load.image('Equal Empire', 'Graphics/UI/emblem/Equal Empire.svg');
      this.load.image('Fortune Federation', 'Graphics/UI/emblem/Fortune Federation.svg');
      this.load.image('Remote Realm', 'Graphics/UI/emblem/Remote Realm.svg');
      this.load.image('Security Syndicate', 'Graphics/UI/emblem/Security Syndicate.svg');
      //this.load.image('Legendary League', 'assets/UI/emblem/Legendary League.svg');

      // "Gameover" assets
      this.load.image('bg_Gameover','Graphics/screens/start_screen/StartScreen_NoBox.png');
      this.load.image('gameover','Graphics/UI/Game-Over (1).png');

      // "Instructions" assets
      this.load.image('instructions_bg','Graphics/UI/sampleSelection.jpg');
      this.load.image('howToPlay1','Graphics/screens/start_screen/boxes/howToPlay1.png');
      this.load.image('howToPlay2','Graphics/screens/start_screen/boxes/howToPlay2.png');
      this.load.image('howToPlay3','Graphics/screens/start_screen/boxes/kingdoms.png');
      this.load.image('howToPlay4','Graphics/screens/start_screen/boxes/buildings.png');
      this.load.image('howToPlay5','Graphics/screens/start_screen/boxes/units.png');
      this.load.image('arrowButton','Graphics/UI/arrow.png');

      // "gameHUD" assets
      this.load.image('win','Graphics/UI/You-won.png');
      this.load.image('levelComplete','Graphics/UI/Level-Complete.png');
      this.load.image('victory','Graphics/UI/victory.png');
      this.load.image('lackOfGold','Graphics/UI/Not-Enough-Gold.png');
      this.load.image('pauseBoxMenu','Graphics/screens/start_screen/boxes/pauseBox.png');

      this.load.image('buttonMine','Graphics/UI/buildButtons/1.png');
      this.load.image('buttonArcheryRange','Graphics/UI/buildButtons/2.png');
      this.load.image('buttonTownCenter','Graphics/UI/buildButtons/3.png');
      this.load.image('buttonBarracks','Graphics/UI/buildButtons/4.png');
      this.load.image('buttonCastle','Graphics/UI/buildButtons/5.png');
      this.load.image('buttonTemple','Graphics/UI/buildButtons/6.png');
      this.load.image('buttonMachinery','Graphics/UI/buildButtons/7.png');

      this.load.image('buttonMine_selected','Graphics/UI/buildButtons/1_Chosen.png');
      this.load.image('buttonArcheryRange_selected','Graphics/UI/buildButtons/2_Chosen.png');
      this.load.image('buttonTownCenter_selected','Graphics/UI/buildButtons/3_Chosen.png');
      this.load.image('buttonBarracks_selected','Graphics/UI/buildButtons/4_Chosen.png');
      this.load.image('buttonCastle_selected','Graphics/UI/buildButtons/5_Chosen.png');
      this.load.image('buttonTemple_selected','Graphics/UI/buildButtons/6_Chosen.png');
      this.load.image('buttonMachinery_selected','Graphics/UI/buildButtons/7_Chosen.png');

      createOptionsSprites(this);
      this.load.image('boxframe', 'Graphics/screens/start_screen/boxes/BoxFrame.png');
      this.load.image('pauseMenuBox', 'Graphics/screens/start_screen/boxes/pauseMenu.png');
      this.load.image('pauseButton', 'Graphics/screens/start_screen/buttons/paused.png');
      this.load.image('pauseCloseButton', 'Graphics/screens/start_screen/buttons/pauseClose.png');
      this.load.image('saveButton', 'Graphics/screens/start_screen/buttons/save.png');
      this.load.image('yesButton', 'Graphics/screens/start_screen/buttons/yes.png');
      this.load.image('noButton', 'Graphics/screens/start_screen/buttons/no.png');

      // "Load" assets
      this.load.image('title_l','Graphics/UI/sampleSelection.jpg');
      this.load.image('loadBox','Graphics/screens/start_screen/boxes/loadGame.png');
      this.load.image('eraseButton', 'Graphics/screens/start_screen/buttons/erase.png');
      this.load.image('loadDataButton', 'Graphics/screens/start_screen/buttons/load.png');

      // "Level1" assets
      this.load.image('tiles1', 'Graphics/TileSets/Background1.png');
      this.load.image('tiles2', 'Graphics/TileSets/Background2.png');
      this.load.image('tiles5', 'Graphics/TileSets/Background5.png');
      this.load.image('tilesW', 'Graphics/TileSets/water.png');
      this.load.tilemapTiledJSON('map', 'Graphics/maps/Level_1b.json');
      this.load.image('button', 'Graphics/UI/button/button.png');

      // "Level2" assets
      this.load.image('tiles', 'Graphics/TileSets/BackgroundComplete.png');
      this.load.tilemapTiledJSON('map2', 'Graphics/maps/Level_2.json');

      // "Level3" assets
      this.load.tilemapTiledJSON('map3', 'Graphics/maps/Level_3.json');

      //unit/structure/kingdom information
      createTextFiles(this);

      // Animation
      createUnitSprites(this);    // found in scenes/util/createSpriteImages.js
      createStructureSprites(this); // found in scenes/util/createSpriteImages.js
      createHealthBarSprites(this);

      this.load.on('progress', function (value) {
          //console.log(value);
          progressBar.clear();
          progressBar.fillStyle(0x89AD81, 1);
          progressBar.fillRect(_width*0.375, _height*0.5, 300 * value, 30);
      });

      this.load.on('complete', function () {
          //console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
      });
    }

    create() {
      createUnitAnims(this);
      getObjectInformation(this);
      this.scene.start('Title');
      console.log("[Preload] Finished Loading Game Assets");
    }
}
