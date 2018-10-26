class Kingdom {

  constructor(kingdomInformation, xCoord, yCoord, game) {
    this.type = kingdomInformation.type;
    this.gold = kingdomInformation.gold;
    this.buildings = [];
    this.units = [];
    this.buildingsAmount = 0;
    this.unitAmount = 0;
    this.game = game;
    this.startingX = xCoord;
    this.startingY = yCoord;

    //create the starting buildings and units
    this.createStartingBuildings(kingdomInformation.buildings);
    this.createStartingUnits(kingdomInformation.units);
  }

  createStartingBuildings(buildings){

    var keys = Object.keys(buildings);

    //goes through and creates the starting buildings based on the given kingdom's information
    for(var i = 0; i < keys.length; i++){

      var buildingInfo;
      var amount = buildings[keys[i]];

      switch(keys[i]) {
        case "temple":
          buildingInfo=templeInfo;
          break;
        case "castle":
          buildingInfo= castleInfo;
          break;
        case "archery_range":
          buildingInfo=archeryRangeInfo;
          break;
        case "machinery":
          buildingInfo= machineryInfo;
          break;
        case "barracks":
          buildingInfo=barracksInfo;
          break;
        case "town_center":
          buildingInfo= townCenterInfo;
          break;
        case "mine":
          buildingInfo= mineInfo;
          break;
        default:
          buildingInfo=townCenterInfo;
      }

      //creates the correct amount of buildings for the current type
      for(var j = 0; j < amount; j++){
        this.buildingsAmount++;
          this.buildings.push(new Structure(buildingInfo, this.startingX+(i*2), this.startingY+(j*2), this.game));
      }
  }
}

//creates all the starting units
  createStartingUnits(units){

    //gets all the types of the starting units
    var keys = Object.keys(units);

    //goes through the different types of units the kingdom starts with and creates the given kingdom's base starting units
    for(var i = 0; i < keys.length; i++){
      var unitInfo;
      var amount = units[keys[i]];

      switch(keys[i]) {
        case "priest":
          unitInfo=priestInfo;
          break;
        case "royalty":
          unitInfo=royaltyInfo;
          break;
        case "archer":
          unitInfo=archerInfo;
          break;
        case "catapult":
          unitInfo= catapultInfo;
          break;
        case "swordsman":
          unitInfo=swordsmanInfo;
          break;
        case "villager":
          unitInfo=villagerInfo;
          break;
        case "miner":
          unitInfo= minerInfo;
          break;
        default:
          unitInfo=villagerInfo;
      }

      //goes through and creates the starting units
      for(var j = 0; j < amount; j++){
          this.unitAmount++;
          this.units.push(new Unit(unitInfo, this.startingX-(i*2), this.startingY-(j*2), this.game));
      }
    }
  }

  //removes the dead units (occurs at the end of the update function)
  removeDeadUnits(){
    for(var i = 0; i < this.units.length; i++){
      if(this.units[i].isDead()){
        this.units.splice(i, 1);
        this.unitsAmount--;
      }
    }
  }
}
