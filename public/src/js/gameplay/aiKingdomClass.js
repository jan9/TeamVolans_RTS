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
      this.addStartingUnitsToGroup();
    }

    //checks to see whether the kingdom can build the unit (aka has the necessary structure built)
    canBuildUnit(unit){
      return this.hasStructure(unit.buildingProduced);
    }

    //function to add the starting units to the attack closest unit group
    addStartingUnitsToGroup(){
      for(let unit of this.units){
        if(unit.getType() === "Swordsman" || unit.getType() === "Catapult" || unit.getType() === "Archer" || unit.getType() === "Priest"){
          this.closestTargetAttackGroup.push(unit);
        }
      }
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

  //calculates where the unit attacks from (so units aren't all clumped together)
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
    else if(attackUnit.getType() === "Priest"){
      x = -32;
      y = -32;
    }

    return {"x": x, "y": y};
  }


  aiAttackTarget(attackUnit, currentTarget){

    var coordinateChange = this.attackArea(attackUnit);
    if((coordinateChange.x + currentTarget.x) > this.game.map.widthInPixels || (coordinateChange.x + currentTarget.x) < 24){
      coordinateChange.x = 0;
    }
    if((coordinateChange.y + currentTarget.y) > (this.game.map.heightInPixels-8) || (coordinateChange.y + currentTarget.y) < 0){
      coordinateChange.y = 0;
    }

    if(attackUnit.getType() !== "Priest"){
    /*  if((attackUnit.getType() === "Archer" || attackUnit.getType() === "Catapult" ) &&
      distance(currentTarget.x, currentTarget.y, attackUnit.x, attackUnit.y) <= _attackRangeTwo){
        attackUnit.playerStopMovement();
        attackUnit.attackEnemy(currentTarget);
      }
      else if(attackUnit.getType() === "Swordsman" && distance(currentTarget.x, currentTarget.y, attackUnit.x, attackUnit.y) <= _attackRangeOne){
          attackUnit.playerStopMovement();
          attackUnit.attackEnemy(currentTarget);
      }*/
        attackUnit.move(currentTarget.x+coordinateChange.x, currentTarget.y+coordinateChange.y, this.game, {"name": "Attack", "target": currentTarget});
    }
    else{
        attackUnit.move(currentTarget.x+coordinateChange.x, currentTarget.y+coordinateChange.y, this.game, {"name": "Heal", "kingdom": this});
  }
}


  //checks whether or not th especified unit is in a group
  unitInGroup(unit){
    let inGroup = false;
    if(this.closestTargetAttackGroup.includes(unit)
      || this.utilityTargetsAttackGroup.includes(unit)
      || this.supportAttackGroup.includes(unit)
      || this.castleAttackGroup.includes(unit)){
          inGroup = true;
    }

    return inGroup;
  }


  //clean up the groups and remove undefined values (which were deleted earlier when they died)
  //CITATION: Used the following resource in figuring out how to remove undefined Values
  //https://stackoverflow.com/questions/28607451/removing-undefined-values-from-array
  removeUndefinedFromGroups(){
    this.closestTargetAttackGroup.filter(item => item);
    this.utilityTargetsAttackGroup.filter(item => item);
    this.supportAttackGroup.filter(item => item);
    this.castleAttackGroup.filter(item => item);
  }


  //checks to see if the group already has units
  groupHasUnits(group){
    return group[0];
  }


  //checks to see if the group is reasonably close to the unit
  groupReasonablyClose(unitToCheck, group){

    let closeDistance = false;

    //If the group is close to the unit or the castle, have the unit join the group
    if(distance((unitToCheck.x, unitToCheck.y, group[0].x, group[0].y) <= 200 || distance(this.startingX, this.startingY, group[0].x, group[0].y) <= 200)){
      closeDistance = true;
    }

    return closeDistance
  }


  //checks to find if the fit is good for the unit (group is close enough if it already has units)
  overallGroupCheck(unitToCheck, group){
    let groupPassesCheck = false;

    if(this.groupHasUnits(group)){
        if(this.groupReasonablyClose(unitToCheck, group)){
          groupPassesCheck = true;
        }
    }
    else{
      groupPassesCheck = true;
    }

    return groupPassesCheck;
  }


  //finds the best fit for the priest unit. Each group gets 1 priest max but support group can have more and is default
  priestBestFit(unit){

    if(this.overallGroupCheck(unit, this.closestTargetAttackGroup) && !this.priestInGroup(this.closestTargetAttackGroup)){
      this.closestTargetAttackGroup.push(unit);
    }
    else if(this.overallGroupCheck(unit, this.utilityTargetsAttackGroup) && !this.priestInGroup(this.utilityTargetsAttackGroup)){
      this.utilityTargetsAttackGroup.push(unit);
    }
    else if(this.overallGroupCheck(unit, this.castleAttackGroup) && !this.priestInGroup(this.castleAttackGroup)){
      this.castleAttackGroup.push(unit);
    }
    else{
      this.supportAttackGroup.push(unit);
    }
  }


  //checks to see if there is room in the group (groups cap at 6-7)
  attackGroupFull(group){
    return (group.length >= 6);
  }


  //finds the best fit for the attack unit
  //as long as their is room joins the closest target, then the utility group, then the castle group
  //however once groups get to 6 units, stop adding members and just add them to the support group
  attackUnitBestFit(unit){
    if(this.overallGroupCheck(unit, this.closestTargetAttackGroup) && !this.attackGroupFull(this.closestTargetAttackGroup)){
      this.closestTargetAttackGroup.push(unit);
    }
    else if(this.overallGroupCheck(unit, this.utilityTargetsAttackGroup) && !this.attackGroupFull(this.utilityTargetsAttackGroup)){
      this.utilityTargetsAttackGroup.push(unit);
    }
    else if(this.overallGroupCheck(unit, this.castleAttackGroup) && !this.attackGroupFull(this.castleAttackGroup)){
      this.castleAttackGroup.push(unit);
    }
    else{
      this.supportAttackGroup.push(unit);
    }
  }

  //finds the best fit for the unit based on certain criteria
  findBestFitGroup(unit){

    if(unit.getType() === "Priest"){
      this.priestBestFit(unit);
    }
    else{
      this.attackUnitBestFit(unit);
    }

  }


  //runs every seconds to find the following: the closest castle, the closest utility object, and the closest attack enemy
  updateCurrentTargetList(playersKingdom){

    this.closestEnemyAttackUnit = this.findAttackEnemy(playersKingdom.units);

    this.enemyCastle = this.findEnemyCastle(playersKingdom.buildings);

    this.closestEnemyUtilityObj = this.findEnemyUtility(playersKingdom);

    //if there are no more utility objects, attack the castle
    if(!this.closestEnemyUtilityObj){
      this.closestEnemyUtilityObj = this.enemyCastle;
    }
    //If there is no closestEnemyAttack unit, set it to be the closest utility object
    if(!this.closestEnemyAttackUnit){
      this.closestEnemyAttackUnit = this.closestEnemyUtilityObj;
    }


/*
    console.log("Attack group:");
    console.log(this.closestTargetAttackGroup);
    console.log("SupportGroup:");
    console.log(this.supportAttackGroup);
    console.log("Utility group:");
    console.log(this.utilityTargetsAttackGroup);
    console.log("Castle group:");
    console.log(this.castleAttackGroup);
    */

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


  //action: 1 is attack, 0 is move back to home castle
  attackGroupAction(group, currentTarget, action){

    //move each member to the location and have them attack/heal
    for(let member of group){

      if(action == 0){
        if(member.getType() === "Priest"){
        member.move(this.startingX, this.startingY, this.game, {"action": "Heal", "kingdom": this});
        }
        else{
          member.move(this.startingX, this.startingY, this.game);
        }
      }
      else{
          this.aiAttackTarget(member, currentTarget);
      }
  }

  }


  //checks to see if the enemy unit is near the castle, if so attacks it
  enemyNearCastle(enemyUnit){
    let closeToCastle = false;

    if(distance(enemyUnit.x, enemyUnit.y, this.startingX, this.startingY) < 200){
      closeToCastle = true;
    }

    return closeToCastle;
  }


  //sends the different attack groups out to attack their targets
  attackGroupAI(){
    if(this.closestEnemyAttackUnit){

      //if the enemy is near the castle or the attack group is full, send them to attack the closest target
      if(this.enemyNearCastle(this.closestEnemyAttackUnit) || this.closestTargetAttackGroup.length >= 4){
        this.attackGroupAction(this.closestTargetAttackGroup, this.closestEnemyAttackUnit, 1);
      }
      //otherwise move back towards the castle
      else{
        this.attackGroupAction(this.closestTargetAttackGroup, this.closestEnemyAttackUnit, 0);
      }

      //if the closest enemy attack unit is close to the castle, then have the supportAttackGroup come out and help
      if(this.enemyNearCastle(this.closestEnemyAttackUnit)){
        this.attackGroupAction(this.supportAttackGroup, this.closestEnemyAttackUnit, 1);
      }
      else{
        this.attackGroupAction(this.supportAttackGroup, this.closestEnemyAttackUnit, 0);
      }
    }

    //if the group is full and there is a closest enemy utility object, then attack it
    if(this.closestEnemyUtilityObj && this.utilityTargetsAttackGroup.length >= 3){
      this.attackGroupAction(this.utilityTargetsAttackGroup, this.closestEnemyUtilityObj, 1);
    }
    else{
      this.attackGroupAction(this.utilityTargetsAttackGroup, this.closestEnemyUtilityObj, 0);
    }

    //if there is an enemy castle and the group size is 5 or greater, move to attack it. Otherwise, go back to the starting position
    if(this.enemyCastle && this.castleAttackGroup.length >= 5){
      this.attackGroupAction(this.castleAttackGroup, this.enemyCastle, 1);
    }
    else{
      this.attackGroupAction(this.castleAttackGroup, this.enemyCastle, 0);
    }
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

        //if the unit is not already in a group, add it to one
        else if((currentUnit.getType()==="Swordsman"
        ||currentUnit.getType()==="Archer"
        ||currentUnit.getType()==="Catapult"
        ||currentUnit.getType() === "Priest") && !this.unitInGroup(currentUnit)){
            this.findBestFitGroup(currentUnit);
        }

        //have the Villager build structures
        else if(currentUnit.getType() === "Villager"){
            villagerAI(currentUnit, this);
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

      this.attackGroupAI();

      //if the current build order is a unit and that unit cannot be built
      //(because the structure to build it doesn't exist) then skip that build order
      if(_unitList.includes(this.getCurrentBuild())){
        if(!this.canBuildUnit(this.getCurrentBuild())){
          this.incrementBuildOrder();
        }
      }
    }
}
