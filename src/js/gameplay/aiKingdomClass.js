class AIKingdom extends Kingdom{

  constructor(kingdomInformation, xCoord, yCoord, game){
      super(kingdomInformation, xCoord, yCoord, game);
      this.buildOrder = kingdomInformation.buildOrder;
      this.currentBuild = 0;

      this.availableAttackUnits = [];
      this.guardUnits = [];

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

    //find the nearest enemy structure location and add it to the list
    this.currentTargets.push(this.findClosest(playersKingdom.buildings));

    //find the closest enemy units locations and add them to the list
    this.currentTargets.push(this.findClosest(playersKingdom.units));
};

  //finds the closest enemy in the given array
  findClosest(enemyArr){

    if(enemyArr.length > 0){
    var closestEnemey= {'x': enemyArr[0].x, 'y': enemyArr[0].y};

    //goes through the array and finds the location of the closest enemy
    for(var i = 0; i < enemyArr.length; i++){
      if(distance(closestEnemey.x, closestEnemey.y, this.startingX, this.startingY) >
      distance(enemyArr[i].x, enemyArr[i].y, this.startingX, this.startingY)){
        closestEnemey.x = enemyArr[i].x;
        closestEnemey.y = enemyArr[i].y;
      }
    }
      return closestEnemey;
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
        if(this.units[i].getType() === "Miner"){
            if(this.units[i].isIdle() ){
              this.units[i].mine(this, this.game);
            }
        }

        //have the swordsman move to the nearest enemy
        if(this.units[i].getType()==="Swordsman"){
            if(this.currentTargets.length > 0){
              this.units[i].move(this.currentTargets[1].x, this.currentTargets[1].y, this.game);
            }
        }

        //have the Villager build structures
        if(this.units[i].getType() === "Villager"){
            if(this.units[i].isIdle()){

              if(this.buildOrder[this.currentBuild] === "Mine"
              || this.buildOrder[this.currentBuild] === "Barracks"
              || this.buildOrder[this.currentBuild] === "Town Center" ){

              this.units[i].startBuildStructure(this.buildOrder[this.currentBuild], this, this.game);
                this.currentBuild++;

            }
          }
        }

        //if the unit is moving, the check to see if it has found its destination
        if(this.units[i].getState() === "Move"){

          //if the unit has stopped moving, have them find the closest enemy and attack
          if(this.units[i].checkMovement()){
            //attack enemy here
          };
        }
      }

      //goes through the list of buildings and if the building is able to make
      //the current item in the build order and is currently idle,
      //then build the unit
      for(var i = 0; i < this.buildings.length; i++){
        if(this.buildings[i].isIdle()){
          if(this.buildOrder[this.currentBuild] === this.buildings[i].unitProduced){

            //need a "check gold" function to make sure we can actually build it and to increment the currentBuild...OR
            //make startBuild return true/false
            this.buildings[i].startBuildUnit(this.buildOrder[this.currentBuild], this, this.game);
            this.currentBuild++;
          }
        }
      }
    }

}
