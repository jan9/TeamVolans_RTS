//starts building the structure
function startBuildUnit(buildingStructure, unitType, kingdom){


  //set the state to build
  buildingUnit.setState("Build");

  if(buildingStructure.getUnitProduced() === unitType){
    var buildingEvent = this.time.addEvent({ delay: 10000, callback: finishBuildUnit,
      callbackScope: this, loop: false, args: [buildingStructure, unitType, kingdom] });
  }

}


//finished building the unit. occurs 10 seconds after start
function finishBuildUnit(buildingStructure, unitType, kingdom){

  //if unit is still alive and still has their state set to build, build the building
  if(buildingStructure.getState() === "Build" && buildingStructure.health > 0){

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
      kingdom.units.push(new Unit(unitInfo, buildingStructure.x+1, buildingStructure.y+1));
      kingdom.gold-=unitInfo.cost;
      buildingStructure.setState("Idle");
  }
}
