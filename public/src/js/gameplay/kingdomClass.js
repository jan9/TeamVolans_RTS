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
    this.goldDeposits = [];

    //create the starting buildings and units
    this.createGoldDeposits(startingObjects);
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
  findOpenArea(startingXPoint, startingYPoint){
    let x = startingXPoint;
    let y = startingYPoint;

    while(!(this.checkArea(x, y))){

      //Used the following site as a reference to javascript random numbers
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      let randXVal = Math.random() * (20 - 1) + 1;
      let randYVal = Math.random() * (20 - 1) + 1;

      //randomly decide whether x is positive or negative
      let xType = Math.floor(Math.random() * 2);

      if(xType == 0){
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
      if (distance(xCoord, yCoord, building.x, building.y) < _maxStructH){
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

    if(itemInformation.type === "Deposit"){
      positionName += "_Gold_"+itemNum.toString();
    }
    else if(itemInformation.type === "Castle"){
        positionName+="_Castle";
    }
    else if (itemInformation.baseType === "Structure"){
        positionName+="_Building";

    }
    else{
        positionName+="_Unit"+itemNum.toString();
    }
    //console.log(positionName);
    for(var i = 0; i < startingObjectsList.length; i++){
      if(startingObjectsList[i].name === positionName){
        coordinates.x = startingObjectsList[i].x;
        coordinates.y = startingObjectsList[i].y;
      }
    }
    //console.log(positionName, coordinates);
    return coordinates;
  }


  createGoldDeposits(startingObjectsList){
    for(var i=0; i<_goldDepositsNum; i++){
      //type: "Deposit", "baseType": "Deposit
      var depositCoords = this.findStartingPosition({type: "Deposit", baseType: "Deposit"}, i+1, startingObjectsList);
      //console.log(depositCoords);
      let goldDeposit = new Phaser.GameObjects.Sprite(this.scene, depositCoords.x, depositCoords.y, 'deposit');
      this.scene.add.existing(goldDeposit);
      this.goldDeposits.push(goldDeposit);
    }
  }

 createStartingBuildings(buildings, startingObjectsList){
   var keys, buildingInfo, amount, structureCoords;
   if (loadingSavedGame === true) {
     if(this.isPlayer() === true) {

         keys = currentData.buildings;
         //console.log("Player keys", keys);

         for(var i = 0; i < keys.length; i++){

           buildingInfo = this.getStructureInfo(keys[i].type);
           //console.log (buildingInfo);
           amount = 1;

           //creates the correct amount of buildings for the current type
           for(var j = 0; j < amount; j++){
             this.buildingsAmount++;

            structureCoords = {
                 x: keys[i].x,
                 y: keys[i].y
               }

            var structure = new Structure(buildingInfo, structureCoords.x, structureCoords.y, this.game, this.isPlayer());

             //set the statting x and y to the castle's position
             if(structure.type === "Castle"){
               this.startingX = structure.x;
               this.startingY= structure.y;
             }

              this.buildings.push(structure);
           }
         }
       } // creating player buildings using saved data
     else {
       keys = currentData.ai_buildings;
       //console.log("AI keys", keys);
       for(var i = 0; i < keys.length; i++){

          buildingInfo = this.getStructureInfo(keys[i].type);
          amount = 1;

         //creates the correct amount of buildings for the current type
         for(var j = 0; j < amount; j++){
           this.buildingsAmount++;

           structureCoords = {
               x: keys[i].x,
               y: keys[i].y
            }
             var structure = new Structure(buildingInfo, structureCoords.x, structureCoords.y, this.game, this.isPlayer());

           //set the statting x and y to the castle's position
           if(structure.type === "Castle"){
             this.startingX = structure.x;
             this.startingY= structure.y;
           }

            this.buildings.push(structure);
         }
       }
     } // creating ai buildings using saved data
   } else {
      keys = Object.keys(buildings);
       //console.log(keys);

       //goes through and creates the starting buildings based on the given kingdom's information
       for(var i = 0; i < keys.length; i++){

          buildingInfo = this.getStructureInfo(keys[i]);
          amount = buildings[keys[i]];

         //creates the correct amount of buildings for the current type
         for(var j = 0; j < amount; j++){
           this.buildingsAmount++;

          structureCoords = this.findStartingPosition(buildingInfo, this.buildingsAmount, startingObjectsList);
           var structure = new Structure(buildingInfo, structureCoords.x, structureCoords.y, this.game, this.isPlayer());

           //add the structure to the group
          // this.add(structure);

           //make it so structures can't be moved by collisions
          // structure.body.setImmovable();

           //set the statting x and y to the castle's position
           if(structure.type === "Castle"){
             this.startingX = structure.x;
             this.startingY= structure.y;
           }

            this.buildings.push(structure);
         }
     }
   } // creating player and ai buildings on a new game
}



//creates all the starting units
  createStartingUnits(units, startingObjectsList){
    var keys, unitInfo, unitCoords, amount;
    if (loadingSavedGame === true) {
      if(this.isPlayer() === true) {
          keys = currentData.units;
          //console.log("Player units", keys);

          for(var i = 0; i < keys.length; i++){

            unitInfo = this.getUnitInfo(keys[i].type);
            //console.log (unitInfo);
            amount = 1;

            //creates the correct amount of buildings for the current type
            for(var j = 0; j < amount; j++){
              this.unitAmount++;

             unitCoords = {
                  x: keys[i].x,
                  y: keys[i].y
                }

              var unit = new Unit(unitInfo, unitCoords.x, unitCoords.y, this.game, this.isPlayer());
              this.units.push(unit);
            }
          }
        } // creating player units using saved data
      else {
        keys = currentData.ai_units;
        //console.log("Enemy units", keys);

        for(var i = 0; i < keys.length; i++){

          unitInfo = this.getUnitInfo(keys[i].type);
          //console.log (unitInfo);
          amount = 1;

          //creates the correct amount of buildings for the current type
          for(var j = 0; j < amount; j++){
            this.unitAmount++;

           unitCoords = {
                x: keys[i].x,
                y: keys[i].y
              }

            var unit = new Unit(unitInfo, unitCoords.x, unitCoords.y, this.game, this.isPlayer());
            this.units.push(unit);
          }
        }
      }
    } // creating ai units using saved data
    else {
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
            var unit = new Unit(unitInfo, unitCoords.x, unitCoords.y, this.game, this.isPlayer());


            this.units.push(unit);
        }
      }
    } // creating player and ai units on a new game
  }




  //destorys the sprite (takes it off screen)
  destroyUnit(unit){
    unit.bar.destroy();
    unit.destroy();

    //if this is an ai kingdom, we need to remove any undefined units from the groups
    if(!this.isPlayer()){
      this.removeUndefinedFromGroups();
    }
  }

  //removes the dead units (occurs at the end of the update function)
  removeDead(){
    for(var i = 0; i < this.units.length; i++){
      if(this.units[i].isDead()){

        this.units[i].unitAnimations("Die");
        //used to play the death animation for 4 seconds

        var deathEvent = this.game.time.addEvent({ delay: 3000, callback: this.destroyUnit,
          callbackScope: this, loop: false, args: [this.units[i]]});

          this.units.splice(i, 1);
          this.unitsAmount--;
      }
    }
    for(var i = 0; i < this.buildings.length; i++){
      let building = this.buildings[i];
      if(building.isDead()){
        building.destroy();
        building.bar.destroy();

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
    //this.unitAmount = this.units.length;
      //TO DO
    for(var i = 0; i < playerUnitSelected.length; i++){

      var unit = playerUnitSelected[i];
      // if the unit selected, move it to a new position

      if(unit.player_selected === true && optionClicked === "mine"){
          unit.mine(this, this.game);
      }
      else if(unit.player_selected === true && optionClicked === "build"){
        if(build_signal > 0){
          let buildingType = signalToStructName(build_signal);

          if(buildingType === "castle" && unit.getType() === "Royalty"){
            unit.startBuildStructure(buildingType, this, this.game);
          }
          else if(buildingType !== "castle" && unit.getType() === "Villager"){
            unit.startBuildStructure(buildingType, this, this.game);
          }
        }
      }
      else if(unit.player_selected && unit.type==="Royalty" && optionClicked === "royalty"){
        let castle = unit.isInCastle(this);
        if(castle){
          unit.startRoyalBonus(castle, this);
        }
      }
      else if(unit.player_selected && optionClicked === "fight" && aiObjectSelected){
        if(unit.getType() !== "Priest"){
          if(unit.checkWithinRange(aiObjectSelected)){
            unit.attackEnemy(aiObjectSelected);
          }
          else{
            let coordinates = spiralLocation(i);
            unit.move(aiObjectSelected.x, aiObjectSelected.y, this.game, {"name": "Attack", "target": aiObjectSelected});
          }
        }
      }
      else if(unit.player_selected && optionClicked === "heal" && specificPlayerSelected){
        unit.healUnit(specificPlayerSelected);
      }
      else if(unit.player_selected  === true && optionClicked === "travel"){
        let coordinates = spiralLocation(i);
        unit.move(x+coordinates.x, y+coordinates.y, this.game);
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
