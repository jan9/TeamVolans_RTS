class AIKingdom extends Kingdom{

  constructor(kingdomInformation, xCoord, yCoord, game){
      super(kingdomInformation, xCoord, yCoord, game);
      this.buildOrder = kingdomInformation.buildOrder;
      this.currentBuild = 0;

      //will probably also add in separate arrays for all the units (likely don't need one for
      //structures as it's a 10 minute game and the ai will probably only have like 10 or so)
      //probably don't even "need" one for all the unit types either as the max amount of units will be <100
      //BUT I will probably do it...
    }


    updateAIKingdom(){

      for(var i = 0; i < this.units.length; i++){
        if(this.units[i].getType() === "Miner" || this.units[i].getType() === "Villager" ){
            if(this.units[i].getState() === "Idle" ){
              mine(this.units[i], this, this.game);
            }
        }
      }

    }

}
