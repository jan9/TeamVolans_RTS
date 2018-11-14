class Kingdom extends Phaser.Physics.Arcade.Group{

  constructor(kingdomInformation, xCoord, yCoord, isPlayer, game, startingObjects) {
    super(game.physics.world, game);
    this.type = kingdomInformation.type;
    this.gold = kingdomInformation.gold;
    this.buildings = [];
    this.units = [];
    this.buildingsAmount = 0;
    this.unitAmount = 0;
    this.game = game;
    this.startingX = xCoord;
    this.startingY = yCoord;
    this.playerKingdom = isPlayer;

    //create the starting buildings and units
    this.createStartingBuildings(kingdomInformation.buildings, startingObjects);
    this.createStartingUnits(kingdomInformation.units, startingObjects);

    //get 6 gold every 15 seconds. Continuously loops
    var getGold = game.time.addEvent({ delay: 10000, callback: this.receiveCastleGold,
      callbackScope: this, loop: true, args: [] });

      //get .5 second remove the dead units...
      var updateDead = game.time.addEvent({ delay: 500, callback: this.removeDead,
        callbackScope: this, loop: true, args: [] });

  }

  //finds an area with no other structures built in it
  findOpenArea(){
    let x = this.startingX;
    let y = this.startingY;

    while(!(this.checkArea(x, y))){

      //Used the following site as a reference to javascript random numbers
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      let randXVal = Math.random() * (20 - 1) + 1;
      let randYVal = Math.random() * (20 - 1) + 1;

      //randomly decide whether x is positive or negative
      let xType = Math.random() * (2-1) + 1;

      if(xType == 2){
        xType = -1;
      }

      x+=randXVal * xType;

      //if the player is building the structure the open area goes up so y needs to decrease
      if(this.isPlayer()){
        y+=(randYVal*-1);
      }
      //if the ai is building the structure the building needs to be built below so y increases
      else{
        y+=randYVal;
      }
    }

    return {"x": x, "y": y};
  }

  checkArea(xCoord, yCoord){
      let areaOpen = true;
    //from the starting point, look for an area that's open for a size 160px (structures only)
    for(let building of this.buildings){
      if (((xCoord - 80) < building.x && (xCoord+80) > building.x) &&
      ((yCoord - 80) < building.y && (yCoord+80) > building.y)){
        areaOpen = false;
      }
    }

    return areaOpen;
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

  findStartingPosition(itemInformation, itemNum, startingObjectsList){

    var positionName = "Player";
    if(!this.isPlayer()){
      positionName = "Enemy";
    }

    var coordinates = {"x": 0, "y": 0};

    if(itemInformation.type === "Castle"){
        positionName+="_Castle";
    }
    else if (itemInformation.baseType === "Structure"){
        positionName+="_Building";
    }
    else{
        positionName+="_Unit"+itemNum.toString();
    }

    for(var i = 0; i < startingObjectsList.length; i++){
      if(startingObjectsList[i].name === positionName){
        coordinates.x = startingObjectsList[i].x;
        coordinates.y = startingObjectsList[i].y;
      }
    }

    return coordinates;
  }


 createStartingBuildings(buildings, startingObjectsList){

   var keys = Object.keys(buildings);

   //goes through and creates the starting buildings based on the given kingdom's information
   for(var i = 0; i < keys.length; i++){

     var buildingInfo = this.getStructureInfo(keys[i]);
     var amount = buildings[keys[i]];



     //creates the correct amount of buildings for the current type
     for(var j = 0; j < amount; j++){
       this.buildingsAmount++;
      var structureCoords = this.findStartingPosition(buildingInfo, this.buildingsAmount, startingObjectsList);
       var structure = new Structure(buildingInfo, structureCoords.x, structureCoords.y, this.game);

       //add the structure to the group
      // this.add(structure);

       //make it so structures can't be moved by collisions
      // structure.body.setImmovable();

       //set the statting x and y to the castle's position
       if(structure.type === "Castle"){
         this.startingX = structure.x;
         this.startingY= structure.y;
       }

       //if this is the player's kingdom, set it to interactive
      if(this.isPlayer()){
         structure.setInteractive();
       }
        this.buildings.push(structure);
     }
 }
}



//creates all the starting units
  createStartingUnits(units, startingObjectsList){

    //gets all the types of the starting units
    var keys = Object.keys(units);

    //goes through the different types of units the kingdom starts with and creates the given kingdom's base starting units
    for(var i = 0; i < keys.length; i++){
      var unitInfo = this.getUnitInfo(keys[i]);
      var amount = units[keys[i]];



      //goes through and creates the starting units
      for(var j = 0; j < amount; j++){
          this.unitAmount++;
          var unitCoords = this.findStartingPosition(unitInfo, this.unitAmount, startingObjectsList);
          var unit = new Unit(unitInfo, unitCoords.x, unitCoords.y, this.game);

          //add the unit to the group
        // this.add(unit);


          if(this.isPlayer()){
            unit.setInteractive();
          }
          this.units.push(unit);
      }
    }
  }



  //destorys the sprite (takes it off screen)
  destroyUnit(unit){
    unit.bar.destroy();
    unit.destroy();
  }

  //removes the dead units (occurs at the end of the update function)
  removeDead(){
    for(var i = 0; i < this.units.length; i++){
      if(this.units[i].isDead()){

        this.units[i].unitAnimations("Die");
        //used to play the death animation for 4 seconds
        var deathEvent = this.game.time.addEvent({ delay: 4000, callback: this.destroyUnit,
          callbackScope: this, loop: false, args: [this.units[i]]});

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

  receiveCastleGold(){
    this.gold+=6;
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



isPlayer(){
  return this.playerKingdom;
}

  updatePlayerKingdom(){
      //TO DO
    for(var i = 0; i < playerUnitSelected.length; i++){
      var add_x, add_y;
      var unit = playerUnitSelected[i];
      // if the unit selected, move it to a new position
      if(i === 0){
        // mouse x and y stored in global variables x and y in level 1
        //only calculate this for the firt item in the list
        add_x = Phaser.Math.RoundAwayFromZero(x-unit.x);
        add_y = Phaser.Math.RoundAwayFromZero(y-unit.y);
      }
      if(unit.player_selected  === true){
        unit.move(Phaser.Math.RoundAwayFromZero(unit.x)+add_x/2,Phaser.Math.RoundAwayFromZero(unit.y)+add_y/2, this.game);
      }
      // if the unit deselected, stop the movement and set its state to idle
      // TODO: add this as an event
      else if(unit.player_selected  === false){
        unit.playerStopMovement();
      }
    }

      // if unit type is attack

        //updateHealth(points);

  }
}
