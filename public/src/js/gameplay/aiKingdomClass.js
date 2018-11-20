class AIKingdom extends Kingdom{

  constructor(kingdomInformation, xCoord, yCoord, game, startingObjects, isHardMode){
      super(kingdomInformation, xCoord, yCoord, false, game, startingObjects);
      this.buildOrder = kingdomInformation.buildOrder;
      this.currentBuild = 0;
      this.isHardMode = isHardMode;

      //attack group which attacks whoever is closest to the castle
      this.closestTargetAttackGroup = [];

      //attack group which goes after utility units like miners/villagers or structures
      //to slow down player production
      this.utilityTargetsAttackGroup = [];

      //attack group to attack the castle
      this.castleAttackGroup = [];

      //attack group to support the other attack groups when one is low on units
      this.supportAttackGroup = [];



      //keeps track of the attack unit (swordsman, archer, catapult) closest to the Castle
      this.closestEnemyAttackUnit;

      //keeps track of the enemies castle
      this.enemyCastle;

      //keeps track of the closest enemy utility object (villager/miner, structure)
      this.closestEnemyUtilityObj;


      this.hardModeBonus();


    }

    //checks to see whether the kingdom can build the unit (aka has the necessary structure built)
    canBuildUnit(unit){
      return this.hasStructure(unit.buildingProduced);
    }


    //checks to see whether or not the kingdom has 1 of the structure
    hasStructure(structure){

      let buildingFound = false;
      for(let building of this.buildings){
        if(building.type === structure){
          buildingFound = true;
        }
      }

    return buildingFound;
  }

  hardModeBonus(){
    if(this.isHardMode){

      //ai has starting bonus if game is hardmode
      this.hardModeStartingBonus();

      //after 5 minutes there is a middle-of-the-game bonus for the ai in hardMode
      var middleBonus = this.game.time.addEvent({ delay: (60*1000*5), callback: this.hardModeMiddleBonus,
        callbackScope: this, loop: true, args: [] });
    }
  }

  //hardmode starting bonus starts with an extra 100 gold and the first 3 build orders completed
  hardModeStartingBonus(){
    this.gold+=100;

    //hard mode starts off with first 3 build orders completed
    for(var i = 0; i < 3; i++){
        let currentBuildOrder = this.buildOrder[i];
      if(_unitList.includes(currentBuildOrder)){
        let unit = new Unit(this.getUnitInfo(currentBuildOrder), this.startingX+10, this.startingY-10, this.game);
        this.units.push(unit);
        this.unitAmount++;
      }
      else{
        let structCoords = this.findOpenArea();
        let structure = new Structure(this.getStructureInfo(currentBuildOrder), structCoords.x, structCoords.y, this.game);
        this.buildings.push(structure);
        this.buildingsAmount++;
      }
      this.incrementBuildOrder();
    }
  }


  hardModeMiddleBonus(){

    //gets a bonus of one of each unit type
    for(var i = 0; i < _unitList; i++){
      let unit = new Unit(this.getUnitInfo(currentBuildOrder), this.startingX+10, this.startingY-10, this.game);
      this.units.push(unit);
      this.unitAmount++;
    }

      this.gold+=100;
  }

   attackArea(attackUnit){
    let x = 0;
    let y = 0;

    if(attackUnit.getType() === "Archer"){
      x = 32;
      y = 32;
    }
    else if (attackUnit.getType() === "Swordsman"){
      x=-32;
      y=0;
    }
    else if (attackUnit.getType() === "Catapult"){
      x=0;
      y=-40;
    }

    return {"x": x, "y": y};
  }


  aiAttackTarget(attackUnit, currentTarget){

    var coordinateChange = this.attackArea(attackUnit);
    attackUnit.move(currentTarget.x+coordinateChange.x, currentTarget.y+coordinateChange.y, this.game, {"name": "Attack", "target": currentTarget});
  }


  //checks whether or not th especified unit is in a group
  unitInGroup(unit){
    let inGroup = false;
    if(this.closestTargetAttackGroup.includes(unit)
      || this.utilityTargetsAttackGroup.includes(unit)
      || this.supportAttackGroup.includes(unit)
      ||this.castleAttackGroup.includes(unit)){
          inGroup = true;
    }

    return inGroup;
  }


  priestBestFit(unit){
    if(!this.priestInGroup(this.closestTargetAttackGroup)){
      this.closestTargetAttackGroup.push(unit);
    }

  }

  //finds the best fit for the unit based on certain criteria
  findBestFitGroup(unit){

    let group;

    if(unit.getType() === "Priest"){
      this.priestBestFit(unit);
    }

  }


  //runs every seconds to find the following: the closest castle, the closest utility object, and the closest attack enemy
  updateCurrentTargetList(playersKingdom){

    this.closestEnemyAttackUnit = this.findAttackEnemy(playersKingdom.units);

    this.enemyCastle = this.findEnemyCastle(playersKingdom.buildings);

    this.closestEnemyUtilityObj = this.findEnemyUtility(playersKingdom);

  };

  //find the closest enemy's castle
  findEnemyCastle(buildings){

    let castles = [];
    for(let structure of buildings){
      if(structure.getType() === "Castle"){
        castles.push(structure);
      }
    }

    let castle = this.findClosest(castles);

    return castle;
  }


  //find the closest enemy utility (miner/villager or structure)
  findEnemyUtility(playersKingdom){
    let utilityUnitList = [];
    let closestUtility;

    //get the list of villagers/miners
    for(let unit of playersKingdom.units){
      if(unit.getType() === "Miner" || unit.getType() === "Villager" || "Royalty"){
        utilityUnitList.push(unit);
      }
    }

    //get the closest utility unit and the closest utility structure
    let closestUtilityUnit = this.findClosest(utilityUnitList);
    let closestUtilityStructure = this.findClosest(playersKingdom.buildings);

    //set the closest (unit or structure) to be the closest utility
    if(distance(this.startingX, this.startingY, closestUtilityUnit.x, closestUtilityUnit.y) <
    distance(this.startingX, this.startingY, closestUtilityStructure.x, closestUtilityStructure.y)){
      closestUtility = closestUtilityUnit;
    }
    else{
      closestUtility = closestUtilityStructure;
    }
    return closestUtility;
  }

  findAttackEnemy(units){
    let attackEnemies = [];

    for(let unit of units){
      if(unit.getType() === "Archer" || unit.getType() === "Swordsman"
      || unit.getType() === "Priest" || unit.getType() === "Catapult"){
        attackEnemies.push(unit);
      }
    }

    let closestATKEnemy = this.findClosest(attackEnemies)

    return closestATKEnemy;
  }

 incrementBuildOrder(){
   this.currentBuild++;
 }
 getCurrentBuild(){
   return this.buildOrder[this.currentBuild];
 }
  //finds the closest enemy in the given array
  findClosest(enemyArr){

    if(enemyArr.length > 0){
    var closestEnemy = enemyArr[0];

    //goes through the array and finds the location of the closest enemy
    for(var i = 0; i < enemyArr.length; i++){
      if(distance(closestEnemy.x, closestEnemy.y, this.startingX, this.startingY) >
      distance(enemyArr[i].x, enemyArr[i].y, this.startingX, this.startingY)){
        closestEnemy = enemyArr[i];
      }
    }
      return closestEnemy;
    }
  }

  priestInGroup(groupArr){
    let inGroup = false;
    for(let member of groupArr){
      if(member.type === "Priest"){
        inGroup = true;
      }
    }

    return inGroup;
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

        //have the miner mine
        if(currentUnit.getType() === "Miner"){
          minerAI(currentUnit, this);
        }

        //have the attack units attack
        else if(currentUnit.getType()==="Swordsman"
        ||currentUnit.getType()==="Archer"
        ||currentUnit.getType()==="Catapult"){
            //attackUnitAI(currentUnit, this);
        }

        //have the Villager build structures
        else if(currentUnit.getType() === "Villager"){
            villagerAI(currentUnit, this);
          }

        //have the priests heal
        else if(currentUnit.getType() === "Priest"){
          //priestAI(currentUnit, this);
        }
        //have royalty go to castles and support them
        else if(currentUnit.getType() === "Royalty"){
          royaltyAI(currentUnit, this);
        }
      }


      //goes through the list of buildings and if the building is able to make
      //the current item in the build order and is currently idle,
      //then build the unit
      for( var i = 0; i < this.buildings.length; i++){
        var currentBuilding = this.buildings[i];
          structureAI(currentBuilding, this);
      }

      //if the current build order is a unit and that unit cannot be built
      //(because the structure to build it doesn't exist) then skip that build order
      if(_unitList.includes(this.getCurrentBuild())){
        if(!this.canBuildUnit(this.getCurrentBuild())){
          this.incrementBuildOrder();
        }
      }
    }
}
