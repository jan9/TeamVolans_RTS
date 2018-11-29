function minerAI(miner, kingdom){
  if(miner.isIdle() ){
    //randomly chooses which mine to go to
    let randMine = Math.floor(Math.random() * 2);
    miner.move(kingdom.goldDeposits[randMine].x, kingdom.goldDeposits[randMine].y, kingdom.scene, {"name": "Mine", "kingdom": kingdom});
  }
}


function structureAI(structure, kingdom){
  if(structure.isIdle()){

    if(kingdom.getCurrentBuild() === structure.unitProduced){

        var unitInfo = kingdom.getUnitInfo(kingdom.getCurrentBuild());

        //only increase currentBuild if we have enough gold to make the unit
        if(unitInfo.cost < kingdom.getGold()){
          structure.startBuildUnit(kingdom.getCurrentBuild(), kingdom, kingdom.game);
          kingdom.incrementBuildOrder();
        }
      }
    }
}

function royaltyAI(royal, kingdom){

  // the castle gain 5 extra health every 30 seconds for each royal inside it
  var castle = royal.isInCastle(kingdom);
  let currentBuildItem = kingdom.getCurrentBuild();

  if(currentBuildItem === "Castle" && royal.isIdle()){
    var structureInfo = kingdom.getStructureInfo(currentBuildItem);

      //only increase currentBuild if we have enough gold to make the structure
      if(structureInfo.cost < kingdom.getGold()){
        let coordinates = kingdom.findOpenArea(kingdom.startingX, kingdom.startingY);
        royal.move(coordinates.x+32, coordinates.y-32, kingdom.game, {"name": "Build", "kingdom": kingdom, "buildingType": currentBuildItem});
        kingdom.incrementBuildOrder();
      }
  }
  else if(!castle){
    let foundCastle = royal.findCastle(kingdom);
    royal.royalBonus(foundCastle, kingdom);
  }
}


function villagerAI(villager, kingdom){

  //building takes precedence over mining
  if(villager.isIdle() || villager.getState()==="Mine"){

    let currentBuildItem = kingdom.getCurrentBuild();
    if(currentBuildItem === "Mine"
      || currentBuildItem === "Barracks"
      || currentBuildItem === "Town Center"
      || currentBuildItem === "Archery Range"
      || currentBuildItem === "Temple"
      || currentBuildItem === "Machinery"){

      var structureInfo = kingdom.getStructureInfo(currentBuildItem);
      //only increase currentBuild if we have enough gold to make the structure
      if(structureInfo.cost < kingdom.getGold()){
        kingdom.incrementBuildOrder();
        let coordinates = kingdom.findOpenArea(kingdom.startingX, kingdom.startingY);
        villager.move(coordinates.x+32, coordinates.y-32, kingdom.game, {"name": "Build", "kingdom": kingdom, "buildingType": currentBuildItem});
      }

    }
    //if nothing to build and not already mining, then mine
    if (villager.isIdle()){
      //randomly chooses which mine to go to
      let randMine = Math.floor(Math.random() * 2);
      villager.move(kingdom.goldDeposits[randMine].x, kingdom.goldDeposits[randMine].y, kingdom.scene, {"name": "Mine", "kingdom": kingdom});
    }
  }
}
