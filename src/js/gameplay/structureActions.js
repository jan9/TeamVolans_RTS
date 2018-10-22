//starts building the structure
function startBuildUnit(buildingStructure, unitType, kingdom, game, texture){

  var unitInfo;
  switch(unitType) {
    case "Priest":
      unitInfounitInfo= priestInfo;
      break;
    case "Royalty":
      unitInfo= royalInfo;
      break;
    case "Archer":
      unitInfo=archerInfo;
      break;
    case "Catapult":
      unitInfo= catapultInfo;
      break;
    case "Swordsman":
      unitInfo=swordsmanInfo;
      break;
    case "Villager":
      unitInfo= villagerInfo;
      break;
    case "Miner":
      unitInfo= minerInfo;
      break;
    default:
      unitInfo=villagerInfo;
  }



  if(buildingStructure.getUnitProduced() === unitType){
    if(unitInfo.cost < kingdom.gold){

      //set the state to build
      buildingStructure.setState("Build");

      kingdom.gold -= unitInfo.cost;
    var buildingEvent = game.time.addEvent({ delay: 10000, callback: finishBuildUnit,
      callbackScope: this, loop: false, args: [buildingStructure, unitInfo, kingdom, game, texture] });
  }
}

}


//finished building the unit. occurs 10 seconds after start
function finishBuildUnit(buildingStructure, unitInfo, kingdom, game, texture){

  //if unit is still alive and still has their state set to build, build the building
  if(buildingStructure.getState() === "Build" && buildingStructure.health > 0){
      kingdom.units.push(new Unit(unitInfo, buildingStructure.x+5, buildingStructure.y+5, game, texture));
      kingdom.unitAmount++;
      buildingStructure.setState("Idle");
  }
  else{
    kingdom.gold += unitInfo.cost;

  }
}
