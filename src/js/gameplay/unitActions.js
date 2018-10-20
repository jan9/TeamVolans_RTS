function attack(attackingUnit){

}

function attackUnit(attackingUnit, attackedUnit){

}

function move(movingUnit, xLocation, yLocation){

  xDistance = xLocation - movingUnit.x;
  yDistance = yLocation - movingUnit.y;

}

//starts building the structure
function startBuildUnit(buildingUnit, buildingType, kingdom){


  //set the state to build
  buildingUnit.setState("Build");

  //a villager can make all buildings except Castle
  //other units can only make their building type
  if((buildingUnit.type === "Villager" && buildingType != "Castle") || buildingUnit.buildingProduced === buildingType){
    var buildingEvent = this.time.addEvent({ delay: 30000, callback: finishBuildUnit,
      callbackScope: this, loop: false, args: [buildingUnit, buildingType, kingdom] });
  }

}

//finished building the structure. occurs 30 seconds after start
function finishBuildUnit(buildingUnit, buildingType, kingdom){

  //if unit is still alive and still has their state set to build, build the building
  if(buildingUnit.getState() === "Build" && buildingUnit.health > 0){

    var buildingInfo;
    switch(buildingType) {
      case "Temple":
        buildingInfo= templeInfo;
        break;
      case "Castle":
        buildingInfo= castleInfo;
        break;
      case "Archery Range":
        buildingInfo=archeryRangeInfo;
        break;
      case "Machinery":
        buildingInfo= machineryInfo;
        break;
      case "Barracks":
        buildingInfo=barracksInfo;
        break;
      case "Town Center":
        buildingInfo= townCenterInfo;
        break;
      case "Mine":
        buildingInfo= mineInfo;
        break;
      default:
        buildingInfo=townCenterInfo;
    }
      kingdom.buildings.push(new Structure(buildingInfo, buildingUnit.x+1, buildingUnit.y+1));
      kingdom.gold-=buildingInfo.cost;
      buildingUnit.setState("Idle");
  }
}

function mine(miningUnit, kingdom){

  //TIMER INFO
  //https://phaser.io/phaser3/devlog/87
  var miningEvent = this.time.addEvent({ delay: 30000, callback: mineGold,
    callbackScope: this, loop: false, args: [miningUnit, kingdom] });
}
function mineGold(miningUnit, kingdom){

  //check to make sure the unit is still alive
  if(miningUnit.health > 0){

    //check to make sure the unit is still meant to be mining
    if(miningUnit.getState() === "mine"){

      //if the unit is a villager, they mine 3 gold every 30 seconds
      if(miningUnit.type === "Villager"){
        kingdom.gold += 3;
      }

      //if the unit is a miner they mine 6 gold every 30 seconds
      else if (miningUnit.type === "Miner"){
        kingdom.gold += 6;
      }

      //call mine again after current mining is done if the state is still mine
      mine(miningUnit, kingdom);
    }
  }
}

//has the guarding unit guard their current area
function guard(guardingUnit){

  //gets the closest enemy unit
  var closestEnemy = findClosestUnit(guardingUnit, playerArray);
  var radius = 20;
  var distanceToEnemy = distance(guardingUnit.x, guardingUnit.y, closestEnemy.x, closestEnemy.y);
  //checks to see if closest enemy is within range
    if(distanceToEnemy < 20){

      //if enemy is within range, set guarding unit's state to attack
      guardingUnit.setState("Attack");
  }
}

//returns the closest unit in the given unitArray near the currentUnit
//expensive to run a lot so...need to figure out a way to "cache" the results
function findClosestUnit(unitToCheck, unitArray){

  //set the base unit and distance to the first unit in the array
  var closestUnit = unitArray[0];
  var closestDistance = distance(unitToCheck.x, unitToCheck.y, unitArray[0].x, unitArray[0].y);

//goes through each of the units and checks to see if they are closest to our unit to check against
  for(let unit of unitArray){
    var currentDistance = distance(unitToCheck.x, unitToCheck.y, unit.x, unit.y);

    if(currentDistance < closestDistance){
      closestUnit = unit;
      closestDistance = currentDistance;
    }
  }

  return closestUnit
}


//calculates the distance between two points (units, structures)
//put helper function in another file
  function distance(oneX, oneY, twoX, twoY){
    xDistance = oneX - twoX;
    yDistance = oneY - twoY;

    return Math.sqrt((xDistance*xDistance) + (yDistance * yDistance));
  }

  function createUnit(unitType){

  }
