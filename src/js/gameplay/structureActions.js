//starts building the structure
function startBuildUnit(buildingStructure, unitType, kingdom, game, texture){

  var unitInfo;

  //gets the unit information depending on what type of unit is being built
  switch(unitType) {
    case "Priest":
      unitInfo = priestInfo;
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


  //if the building can create the unit, and has the gold to create it, then creates the unit
  if(buildingStructure.getUnitProduced() === unitType){
    if(unitInfo.cost < kingdom.gold){

      //set the state to build
      buildingStructure.setState("Build");

      kingdom.gold -= unitInfo.cost;

      //creates the unit after 10 seconds
    var buildingEvent = game.time.addEvent({ delay: 10000, callback: finishBuildUnit,
      callbackScope: this, loop: false, args: [buildingStructure, unitInfo, kingdom, game, texture] });
  }
}

}


//finished building the unit. occurs 10 seconds after start
function finishBuildUnit(buildingStructure, unitInfo, kingdom, game, texture){

  //if unit is still alive and still has their state set to build, build the building
  if(buildingStructure.getState() === "Build" && buildingStructure.health > 0){

      //once the unit has been built, add it to the kingdom and increase the unitamount
      kingdom.units.push(new Unit(unitInfo, buildingStructure.x+5, buildingStructure.y+5, game, texture));
      kingdom.unitAmount++;
      buildingStructure.setState("Idle");
  }
  else{

    //if the building was destroyed before the unit was built, give the money back to the kingdom
    kingdom.gold += unitInfo.cost;

  }
}
