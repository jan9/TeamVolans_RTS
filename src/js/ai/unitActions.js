//TO DO: Move the unit actions into the unit class
function attackUnit(attackingUnit, attackedUnit){

  //attack if unit isn't dead attack(dead units get removed at end of each update but
  // there's a chance it might have been killed in between)
  if(!attackingUnit.isDead() && !attackedUnit.isDead()){

    //unit has 50% chance of attack landing a hit
    var chance = Math.floor(Math.random() * 2) + 1;

    if(chance % 2 == 0 ){
      attackedUnit.updateHealth(attackingUnit.getAttack());
    }
  }
}

function attackState(attackingUnit, enemyArr){
  var enemyToAttack = findClosestUnit(attackingUnit, enemyArr);
  attackUnit(attackingUnit, attackedUnit);
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

    //if the current distance is closer than the closest distance then set the closest distance to the current distance
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
