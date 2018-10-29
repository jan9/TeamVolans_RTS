function minerAI(miner, kingdom){
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

function attackUnitAI(attackUnit, kingdom){

  //if the unit is moving, the check to see if it has found its destination
  if(attackUnit.getState() === "Move"){

    //if the unit has stopped moving, have them find the closest enemy and attack
    if(attackUnit.checkMovement()){
      if(kingdom.currentTargets[1]){
        attackUnit.attackEnemy(kingdom.currentTargets[1]);
      }
      else if(kingdom.currentTargets[0]){
        attackUnit.attackEnemy(kingdom.currentTargets[0]);
      }
    }
  }

  if(kingdom.currentTargets.length > 0){
    if(kingdom.currentTargets[1]){
      attackUnit.move(kingdom.currentTargets[1].x, kingdom.currentTargets[1].y, kingdom.game);
    }
    else{
      attackUnit.move(kingdom.currentTargets[0].x, kingdom.currentTargets[0].y, kingdom.game);
    }
  }
}


function priestAI(priest, kingdom){

}


function villagerAI(villager, kingdom){

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


function royaltyAI(royalty){

}
