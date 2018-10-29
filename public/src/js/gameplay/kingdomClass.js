class Kingdom{

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




getStructureInfo(buildingType){

  var buildingTypeLower =buildingType.toLowerCase();
  var buildingInfo;

  switch(buildingTypeLower) {
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
  return buildingInfo;
}


 getUnitInfo(unitType){

   var unitTypeLower = unitType.toLowerCase();
   var unitInfo;

   switch(unitTypeLower) {
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
   return unitInfo
 }

 createStartingBuildings(buildings){

   var keys = Object.keys(buildings);

   //goes through and creates the starting buildings based on the given kingdom's information
   for(var i = 0; i < keys.length; i++){

     var buildingInfo = this.getStructureInfo(keys[i]);
     var amount = buildings[keys[i]];



     //creates the correct amount of buildings for the current type
     for(var j = 0; j < amount; j++){
       this.buildingsAmount++;
       var structure = new Structure(buildingInfo, this.startingX+((i+40)*2), this.startingY, this.game);
        this.buildings.push(structure);
     }
 }
}


//creates all the starting units
  createStartingUnits(units){

    //gets all the types of the starting units
    var keys = Object.keys(units);

    //goes through the different types of units the kingdom starts with and creates the given kingdom's base starting units
    for(var i = 0; i < keys.length; i++){
      var unitInfo = this.getUnitInfo(keys[i]);
      var amount = units[keys[i]];



      //goes through and creates the starting units
      for(var j = 0; j < amount; j++){
          this.unitAmount++;
          var unit = new Unit(unitInfo, this.startingX-((j+10)*2), this.startingY, this.game);
          this.units.push(unit);
      }
    }
  }

  //removes the dead units (occurs at the end of the update function)
  removeDead(){
    for(var i = 0; i < this.units.length; i++){
      if(this.units[i].isDead()){
        this.units[i].destroy();
        this.units.splice(i, 1);
        this.unitsAmount--;
      }
    }
    for(var i = 0; i < this.buildings.length; i++){
      if(this.buildings[i].isDead()){
        this.buildings[i].destroy();
        this.buildings.splice(i,1);
        this.buildingsAmount--;
      }
    }
  }

  getGold(){
    return this.gold;
  }
  removeGold(cost){
    this.gold -=cost;
  }
  addGold(benefit){
    this.gold += benefit;
  }


//used to make the player's buildings and units interactive
  makeInteractive(){
    for(var i = 0; i < this.buildings.length; i++){
      this.buildings[i].setInteractive();
  }
  for(var i = 0; i< this.units.length; i++){
    this.units[i].setInteractive();
  }
}
}
