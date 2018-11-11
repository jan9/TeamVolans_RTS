class AIKingdom extends Kingdom{

  constructor(kingdomInformation, xCoord, yCoord, game, startingObjects, isHardMode){
      super(kingdomInformation, xCoord, yCoord, false, game, startingObjects);
      this.buildOrder = kingdomInformation.buildOrder;
      this.currentBuild = 0;
      this.isHardMode = isHardMode;
      this.attackGroup = [];


      //keeps track of the AI's current targets of attack
      this.currentTargets = [];

      //will probably also add in separate arrays for all the units (likely don't need one for
      //structures as it's a 10 minute game and the ai will probably only have like 10 or so)
      //probably don't even "need" one for all the unit types either as the max amount of units will be <100
      //BUT I will probably do it...
    }


  //runs every 10 seconds to find the 3 closest enemy units to the castle and find the current structure closest to the castle
  updateCurrentTargetList(playersKingdom){

    //clears out the previous targets
    this.currentTargets.splice(0,this.currentTargets.length)

    //get the closest structure, if it exists, add it to the array
    var closestStructure = this.findClosestStructure(playersKingdom.buildings)
    if(closestStructure){
      this.currentTargets.push(closestStructure);
    }

    //get the closest unit, if it exists add it to the array
    var closestUnit = this.findClosestUnit(playersKingdom.units);
    if(closestUnit){
      this.currentTargets.push(closestUnit);
    }
};

 incrementBuildOrder(){
   this.currentBuild++;
 }
 getCurrentBuild(){
   return this.buildOrder[this.currentBuild];
 }

 findClosestUnit(unitArr){
   if(unitArr.length > 0){
   var closestEnemy = unitArr[0].first;

   //goes through the array and finds the location of the closest enemy
   for(let enemyUnit of unitArr){
     let enemy = enemyUnit.first;
     if(distance(closestEnemy.x, closestEnemy.y, this.startingX, this.startingY) >
     distance(enemy.x, enemy.y, this.startingX, this.startingY)){
       closestEnemy = enemy;
     }
   }
   return closestEnemy;
   }
 }
  //finds the closest enemy in the given array
  findClosestStructure(structureArr){

    if(structureArr.length > 0){
    var closestEnemy = structureArr[0];

    //goes through the array and finds the location of the closest enemy
    for(let enemy of structureArr){
      if(distance(closestEnemy.x, closestEnemy.y, this.startingX, this.startingY) >
      distance(enemy.x, enemy.y, this.startingX, this.startingY)){
        closestEnemy = enemy;
      }
    }
    return closestEnemy;
  }
  }

  //updates the ai kingdom
    updateAIKingdom(enemyKingdom){

      //resets the buildOrder when the end is reached
      if(this.currentBuild >= this.buildOrder.length){
        this.currentBuild = 0;
      }

      //have the miners mine
      for(var i = 0; i < this.units.length; i++){
        var currentUnit = this.units[i];
        var unitType = currentUnit.first.getType();

        //have the miner mine
        if(unitType === "Miner"){
          minerAI(currentUnit, this);
        }

        //have the attack units attack
        else if(unitType ==="Swordsman"
        ||unitType ==="Archer"
        ||unitType ==="Catapult"){
            attackUnitAI(currentUnit, this);
        }

        //have the Villager build structures
        else if(unitType === "Villager"){
            villagerAI(currentUnit, this);
          }

        //have the priests heal
        else if(unitType === "Priest"){
          priestAI(currentUnit, this);
        }
      }


      //goes through the list of buildings and if the building is able to make
      //the current item in the build order and is currently idle,
      //then build the unit
      for( var i = 0; i < this.buildings.length; i++){
        var currentBuilding = this.buildings[i];
          structureAI(currentBuilding, this);
      }

      this.removeDead();
    }
}
