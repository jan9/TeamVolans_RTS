//TO DO: Move the unit actions into the unit class
function attackUnit(attackingUnit, attackedUnit){

  if(!attackingUnit.isDead()){
    //unit has 50% chance of attack landing a hit
    var chance = Math.floor(Math.random() * 2) + 1;

    if(chance % 2 == 0 ){
      attackedUnit.updateHealth(attackingUnit.getAttack());
    }
  }
}


//moves the unit to the desired location
function move(movingUnit, xLocation, yLocation, game){

  if(movingUnit.getState() != "Move"){
    movingUnit.destinationX = xLocation;
    movingUnit.destinationY = yLocation;
    movingUnit.setState("Move");
    game.physics.moveTo(movingUnit, xLocation, yLocation, 2);
    }
    else{
      movingUnit.destinationX = xLocation;
      movingUnit.destinationY = yLocation;
      stopMovement(movingUnit);
      movingUnit.setState("Move");
      game.physics.moveTo(movingUnit, xLocation, yLocation, 2);
    }
}

//checks if the moving unit is at it's destination (right now have it set up to be in a radius of the actual destination)
//and if so stops the unit from moving
function checkMovement(movingUnit){

  var finishedMoving = false;
  var radius = 2.5;
  if(movingUnit.getHealth() > 0 && movingUnit.getState() === "Move"){

    if((movingUnit.destinationX < movingUnit.x + radius &&
      movingUnit.destinationX > movingUnit.x - radius)
      && (movingUnit.destinationY < movingUnit.y + radius
      && movingUnit.destinationY > movingUnit.y - radius)){
        stopMovement(movingUnit);
        finishedMoving = true;
    }
  }

  return finishedMoving;
}

//stops the unit's movement and sets the state to idle
function stopMovement(movingUnit){
  movingUnit.body.velocity.x = 0;
  movingUnit.body.velocity.y = 0;
  movingUnit.setState("Idle");
}

//starts building the structure
function startBuildStructure(buildingUnit, buildingType, kingdom, game, texture){

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

  //a villager can make all buildings except Castle
  //other units can only make their building type
  if((buildingUnit.type === "Villager" && buildingType != "Castle") || buildingUnit.buildingProduced === buildingType){
  //can only build if the money is there for it
    if(buildingInfo.cost < kingdom.gold){

      //set the state to build
      buildingUnit.setState("Build");

      //takes the gold right away from the kingdom
      kingdom.gold -= buildingInfo.cost;
    var buildingEvent = game.time.addEvent({ delay: 30000, callback: finishBuildStructure,
      callbackScope: this, loop: false, args: [buildingUnit, buildingInfo, kingdom, game, texture] });
    }
  }

}

//finished building the structure. occurs 30 seconds after start
function finishBuildStructure(buildingUnit, buildingInfo, kingdom, game, texture){


  //if unit is still alive and still has their state set to build, build the building
  if(buildingUnit.getState() === "Build" && buildingUnit.health > 0){
      kingdom.buildings.push(new Structure(buildingInfo, buildingUnit.x+5, buildingUnit.y+5, game, texture));
      kingdom.buildingsAmount++;
      buildingUnit.setState("Idle");
  }

  //if the unit has been killed or isn't making the building anymore, give the kingdom back the gold from the buildings
  //not sure if this is the best way to do it. I don't think units/buildings should have
  //invincibility while building but should they get back the money at all from a failed build? Should it come right away?
  else{
    kingdom.gold += buildingInfo.cost;
  }
}

function mine(miningUnit, kingdom, game){

  miningUnit.setState("Mine");

  //TIMER INFO
  //https://phaser.io/phaser3/devlog/87
  var miningEvent = game.time.addEvent({ delay: 30000, callback: mineGold,
    callbackScope: this, loop: false, args: [miningUnit, kingdom] });
}
function mineGold(miningUnit, kingdom){

  //check to make sure the unit is still alive
  if(miningUnit.health > 0){

    //check to make sure the unit is still meant to be mining
    if(miningUnit.getState() === "Mine"){

      //if the unit is a villager, they mine 3 gold every 30 seconds
      if(miningUnit.type === "Villager"){
        kingdom.gold += 3;
      }

      //if the unit is a miner they mine 6 gold every 30 seconds
      else if (miningUnit.type === "Miner"){
        kingdom.gold += 6;
      }

      miningUnit.setState("Idle");
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

  return closestUnit;
}


//calculates the distance between two points (units, structures)
//put helper function in another file
  function distance(oneX, oneY, twoX, twoY){
    xDistance = oneX - twoX;
    yDistance = oneY - twoY;

    return Math.sqrt((xDistance*xDistance) + (yDistance * yDistance));
  }
