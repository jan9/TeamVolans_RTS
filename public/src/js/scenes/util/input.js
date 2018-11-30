var oldSelectionArea;
var mousePointerData ={x: 0, y: 0, width: 0, height: 0};
var playerUnitSelected = [];

function onObjectClicked(pointer,gameObject)
{
  if(gameObject.isPlayerObj()){

    if(gameObject.baseType === "Structure" && optionClicked === "create"){
      gameObject.startBuildUnit(gameObject.unitProduced, player, player.game, true);
    }
    else if (gameObject.baseType === "Unit") {
      selectedUnit = gameObject;
      // selected units move
      if (pointer.leftButtonDown() ){
        selectedUnit.player_selected  = true;
        if(!(playerUnitSelected.includes(selectedUnit))){
          playerUnitSelected.push(selectedUnit);
        }
      }
      // if not selected, not move
      if (pointer.rightButtonDown()){
        selectedUnit.player_selected = false;
        for(let unit of playerUnitSelected) {
          unit.playerStopMovement();
          unit.player_selected = false;
          unit.tint = 0xFFFFFF;
        }
        playerUnitSelected = [];
      }
    }
  }
  else{

    //if a unit was already selected, revert it back to what the tint should be
    if(aiObjectSelected){
    aiObjectSelected.tint = 0xFFFFFF;
    }
    console.log(gameObject);
    //update which unit is selected and the tint
    aiObjectSelected = gameObject;
    aiObjectSelected.tint = 0xFF0000; //red
  }
}


// Gets all the coordinates inside the area selected by the player's drag-select motion
function getCoordinatesInsideSelectionArea(x, y, width, height) {
    var coordinates = {};
    coordinates.x = {};
    coordinates.y = {};

    if(width < 0) {
        coordinates.x.from = x + width;
        coordinates.x.to = x;
    } else {
        coordinates.x.from = x;
        coordinates.x.to = x + width;
    }

    if(height < 0) {
        coordinates.y.from = y + height;
        coordinates.y.to = y;
    } else {
        coordinates.y.from = y;
        coordinates.y.to = y + height;
    }

    return coordinates;
}


// adds all the units inside the selected area into a global array "playerUnitSelected"
function addUnitsToPlayerUnitsSelected(scene, kingdom, x, y, width, height) {
      var currentSelection = [];

      for(let unit of kingdom.units) {
          var coordinates = getCoordinatesInsideSelectionArea(x, y, width, height);
          if (unit.x >= coordinates.x.from && unit.x <= coordinates.x.to &&
              unit.y >= coordinates.y.from && unit.y <= coordinates.y.to) {
              currentSelection.push(unit);
              unit.player_selected = true;
              //console.log("pushing in "+ unit.type);
          }
        }

      if (currentSelection.length > 0) {
          playerUnitSelected = currentSelection;
      }

      for(let unitSelected of playerUnitSelected) {
        if(unitSelected){
          unitSelected.tint = 0xFFD700;
        }
      }

      console.log("Selected Units", playerUnitSelected);
}

// player can drag select multiple units
function dragSelect(scene, kingdom) {
  var draw = false;
  scene.input.on('pointerdown', function(pointer) {
    if (pointer.leftButtonDown()){
      mousePointerData.x = Phaser.Math.RoundAwayFromZero(pointer.worldX);
      mousePointerData.y = Phaser.Math.RoundAwayFromZero(pointer.worldY);
      //console.log("x and y clicked");
      draw = true;
    }
    if (pointer.rightButtonDown()){
      mousePointerData = {};
    }
  });
  scene.input.on('pointerup', function() {
    draw = false;
  });
  scene.input.on('pointermove', function(pointer) {
      if (draw) {
          mousePointerData.width = Phaser.Math.RoundAwayFromZero(pointer.worldX) -  mousePointerData.x;
          mousePointerData.height = Phaser.Math.RoundAwayFromZero(pointer.worldY) -  mousePointerData.y;
          //console.log("height and width clicked");
          if(oldSelectionArea) {
            oldSelectionArea.clear();
          }

          var drawNewBox = scene.add.graphics(0,0);
          drawNewBox.lineStyle(2, 0x0f84c7, 1);
          drawNewBox.strokeRect(mousePointerData.x, mousePointerData.y, mousePointerData.width, mousePointerData.height);
          drawNewBox.fillStyle(0x1193df, 0.5);
          drawNewBox.fillRect(mousePointerData.x, mousePointerData.y, mousePointerData.width, mousePointerData.height);
          drawNewBox.alpha = 0.4;
          oldSelectionArea = drawNewBox;
          //console.log("box drawn");
        }
      else {
        if(mousePointerData.hasOwnProperty('x') && mousePointerData.x !== false) {
          // add units to the selections
          addUnitsToPlayerUnitsSelected(scene, kingdom, mousePointerData.x, mousePointerData.y, mousePointerData.width, mousePointerData.height);
        }
        mousePointerData = {};
        if (oldSelectionArea) {
          oldSelectionArea.clear();
          oldSelectionArea = false;
        }
      }
  });
}

function homeButton(scene) {
  var returnButton, quitButton
  // button for going back to the main menu
  if (currentLevel === 1 || currentLevel === 2 || currentLevel === 3) {
    quitButton = scene.add.sprite(10,3,'quitButton').setOrigin(0,0).setDisplaySize(120,40).setDepth(25);
    quitButton.setInteractive({useHandCursor:true});
    quitButton.on('pointerdown', function () {
      pausedBeforeQuit = 1;//backToMainMenu = 1;
      if(pausedBeforeQuit === 1 && backToMainMenu === 0 && currentLevel != 0) {
        pausedBeforeQuit = 2;
        gamePaused = true;
        pauseStartTime = timer.getElapsedSeconds();
        timer.paused = true;
        this.scene.pause('Level1');
        this.scene.pause('Level2');
        this.scene.pause('Level3');
        quitButton.destroy();
      }
    }, scene);
  } else if (currentLevel === 0) {
    returnButton = scene.add.sprite(10,3,'mainmenuButton').setOrigin(0,0).setDisplaySize(120,40).setDepth(25);
    returnButton.setInteractive({useHandCursor:true});
    returnButton.on('pointerdown', function() {
      pausedBeforeQuit = 0;
      if(pausedBeforeQuit === 0 && backToMainMenu === 0 && currentLevel === 0) {
        backToMainMenu = 1;
      }
    }, scene);
  }

}

function signalToStructName(signal){

  let name = "town_center";

  switch(signal){
    case 1:
      name="archery_range";
      break;
    case 2:
      name= "barracks";
      break;
    case 3:
      name="castle";
      break;
    case 4:
      name= "machinery";
      break;
    case 5:
      name="mine";
      break;
    case 6:
      name="temple";
      break;
    default:
      name="town_center";
  }
  return name;
}
