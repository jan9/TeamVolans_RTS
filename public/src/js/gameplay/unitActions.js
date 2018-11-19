

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


function spiralLocation(i){

  let coordinates = {"x": 0, "y": 0};

  if(i % 3 == 0){
    coordinates.x = i * 8 * -1;
  }
  else if(i % 2 == 0){
      coordinates.y = i * 8;
      if(i % 4 == 0){
        coordinates.y*=-1;
      }
  }
  else{
      coordinates.x = i * 8;
  }

  //1 is a special case as it is the only one that would be *right* next to the first unit
  if(i == 1){
    coordinates.x += 8;
  }
  
  return coordinates;
}



//calculates the distance between two points (units, structures)
//put helper function in another file
  function distance(oneX, oneY, twoX, twoY){
    xDistance = oneX - twoX;
    yDistance = oneY - twoY;

    return Math.sqrt((xDistance*xDistance) + (yDistance * yDistance));
  }
