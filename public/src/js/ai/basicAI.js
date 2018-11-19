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


//finds any injured units within 100px of the castle and heals them
//otherwise, adds them to an attackgroup
function priestAI(priest, kingdom){

  var radius = 100;
  var injuredUnit = priest.closestInjured(kingdom.units);

  //if the priest is idle check if anyone near the kingdom needs healing
  //if so (and if the priest is close to the injured unit), move to heal the unit
  if(priest.isIdle()){
    if(distance(injuredUnit.x, injuredUnit.y, kingdom.startingX, kingdom.startingY) < radius
      && distance(injuredUnit.x, injuredUnited.y, priest.x, priest.y) < radius){
      priest.move(injuredUnit.x, injuredUnit.y, kingdom.game);
    }
    else if(distance(injuredUnit.x, injuredUnited.y, priest.x, priest.y) < 2){
      priest.attackEnemy(injuredUnit, kingdom.game);
    }
    //if no close units to heal see if should add to the attack group
    //currently get added to attackgroup as long as the group already
    //has 4 members and not already in the group
    else{
      if(kingdom.attackGroup.length > 4 && kingdom.attackGroup.indexOf(priest) < 0){
        kingdom.attackGroup.push(priest);
      }
    }
  }

  //if the priest has stopped moving find the injured unit and heal them
  else if (priest.getState() === "Move"){

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

function attackArea(attackUnit){
  let x = 0;
  let y = 0;

  if(attackUnit.type === "Archer"){
    x = 32;
    y = 32;
  }
  else if (attackUnit.type === "Swordsman"){
    x=-32;
    y=0;
  }
  else if (attackUnit.type === "Catapult"){
    x=0;
    y=-40;
  }

  return {"x": x, "y": y};
}


function attackUnitAI(attackUnit, kingdom){

  var coordinateChange = attackArea(attackUnit);
  //if the currentTargets list isn't empty, attack the target
  if(kingdom.currentTargets.length > 0){

    //go after units first
    if(kingdom.currentTargets[1] && attackUnit.getState() !== "Attack"){
      attackUnit.move(kingdom.currentTargets[1].x+coordinateChange.x, kingdom.currentTargets[1].y+coordinateChange.y, kingdom.game, {"name": "Attack", "target": kingdom.currentTargets[1]});
    }
    //then go after buildings
    else if(attackUnit.getState() !== "Attack"){
      attackUnit.move(kingdom.currentTargets[0].x+(coordinateChange.x*2), kingdom.currentTargets[0].y+(coordinateChange.y*2), kingdom.game);
    }
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
    else if (villager.isIdle()){
      //randomly chooses which mine to go to
      let randMine = Math.floor(Math.random() * 2);
      villager.move(kingdom.goldDeposits[randMine].x, kingdom.goldDeposits[randMine].y, kingdom.scene, {"name": "Mine", "kingdom": kingdom});
    }
  }
}
