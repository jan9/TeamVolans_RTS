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

  findClosest(enemyArr){

    if(enemyArr.length > 0){
    var closestItem= {'x': enemyArr[0].x, 'y': enemyArr[0].y};
    for(var i = 0; i < enemyArr.length; i++){
      if(distance(closestItem.x, closestItem.y, this.startingX, this.startingY) >
      distance(enemyArr[i].x, enemyArr[i].y, this.startingX, this.startingY)){
        closestItem.x = enemyArr[i].x;
        closestItem.y = enemyArr[i].y;
      }
    }
      return closestItem;
    }
  }


    updateAIKingdom(){

      if(this.currentBuildOrder >= this.buildOrder.length){
        this.currentBuildOrder = 0;
      }

      //have the miners mine
      for(var i = 0; i < this.units.length; i++){
        if(this.units[i].getType() === "Miner"){
            if(this.units[i].isIdle() ){
              mine(this.units[i], this, this.game);
            }
        }

        //have the swordsman move
        if(this.units[i].getType()==="Swordsman"){
            if(this.currentTargets.length > 0){
              move(this.units[i], this.currentTargets[1].x, this.currentTargets[1].y, this.game);
            }
        }
        if(this.units[i].getType() === "Villager"){
            if(this.units[i].isIdle()){

              if(this.buildOrder[this.currentBuild] === "Mine"
              || this.buildOrder[this.currentBuild] === "Temple"
              || this.buildOrder[this.currentBuild] === "Town Center" ){
                  this.currentBuild++;
                startBuildStructure(this.units[i], this.buildOrder[this.currentBuild], this, this.game, 'square_unit');
            }
            }
        }

        if(this.units[i].getState() === "Move"){

          //if the unit has stopped moving, have them find the closest enemy and attack
          if(checkMovement(this.units[i])){
            //attack enemy here
          };
        }
      }

      for(var i = 0; i < this.buildings.length; i++){
        if(this.buildings[i].isIdle()){
          if(this.buildOrder[this.currentBuild] === this.buildings[i].unitProduced){
            startBuildUnit(this.buildings[i], this.buildOrder[this.currentBuild], this, this.game, 'square_unit');
            this.currentBuild++;
          }
        }
      }
    }

}
