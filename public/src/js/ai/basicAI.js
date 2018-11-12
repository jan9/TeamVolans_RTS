function minerAI(unit, kingdom){
  let miner = unit.first;
  if(miner.isIdle() ){
    miner.mine(kingdom, kingdom.game);
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
function priestAI(unit, kingdom){

  let priest = unit.first;
  var radius = 100;
  var injuredUnit = priest.closestInjured(kingdom.units);

  //if the priest is idle check if anyone near the kingdom needs healing
  //if so (and if the priest is close to the injured unit), move to heal the unit
  if(priest.isIdle()){
    if(distance(injuredUnit.x, injuredUnit.y, kingdom.startingX, kingdom.startingY) < radius
      && distance(injuredUnit.x, injuredUnited.y, priest.x, priest.y) < radius){
      unit.move(injuredUnit.x, injuredUnit.y, kingdom.game, false);
    }
    else if(distance(injuredUnit.x, injuredUnited.y, priest.x, priest.y) < 2){
      priest.attackEnemy(injuredUnit, kingdom.game);
    }
    //if no close units to heal see if should add to the attack group
    //currently get added to attackgroup as long as the group already
    //has 4 members and not already in the group
    else{
      if(kingdom.attackGroup.length > 4 && kingdom.attackGroup.indexOf(priest) < 0){
        kingdom.attackGroup.push(unit);
      }
    }
  }

  //if the priest has stopped moving find the injured unit and heal them
  else if (priest.getState() === "Move"){
    //check to see if unit should stop moving
    if(priest.checkMovement()){
      //if stop moving, heal the injured unit
      if(distance(injuredUnit.x, injuredUnited.y, priest.x, priest.y) < 2){
        priest.attackEnemy(injuredUnit, kingdom.game);
      }
    }
  }

}

//Not sure what to have royalty do yet. They give health benefits to the castle...
//Maybe more royalty = more gold/time? Or some other bonus...Maybe if a royalty is nearby other units do better?
//heal better, attack better, mine better?
function royaltyAI(priest, kingdom){

}



function attackUnitAI(unit, kingdom){

  let attackUnit = unit.first;


  //if the currentTargets list isn't empty, attack the target
  if(kingdom.currentTargets.length > 0){

    //go after units first
    if(kingdom.currentTargets[1]){
      unit.move(kingdom.currentTargets[1].x, kingdom.currentTargets[1].y, kingdom.game, false);
    }
    //then go after buildings
    else{
      unit.move(kingdom.currentTargets[0].x, kingdom.currentTargets[0].y, kingdom.game, false);
    }
  }
}


function villagerAI(unit, kingdom){

  let villager = unit.first;

  //building takes precedence over mining
  if(villager.isIdle() || villager.getState()==="Mine"){

    if(kingdom.getCurrentBuild() === "Mine"
      || kingdom.getCurrentBuild() === "Barracks"
      || kingdom.getCurrentBuild() === "Town Center"
      || kingdom.getCurrentBuild() === "Archery Range"
      || kingdom.getCurrentBuild() === "Temple"
      || kingdom.getCurrentBuild() === "Machinery"){

      var structureInfo = kingdom.getStructureInfo(kingdom.getCurrentBuild());

      //only increase currentBuild if we have enough gold to make the structure
      if(structureInfo.cost < kingdom.getGold()){
        villager.startBuildStructure(kingdom.getCurrentBuild(), kingdom, kingdom.game);
        kingdom.incrementBuildOrder();
      }

    }
    //if nothing to build and not already mining, then mine
    else if (villager.isIdle()){
      villager.mine(kingdom, kingdom.game)
    }
  }
}
