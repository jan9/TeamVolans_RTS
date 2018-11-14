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



      //keeps track of the AI's current targets of attack
      this.currentTargets = [];

      this.hardModeBonus();


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

  //runs every 10 seconds to find the 3 closest enemy units to the castle and find the current structure closest to the castle
  updateCurrentTargetList(playersKingdom){

    //clears out the previous targets
    this.currentTargets.splice(0,this.currentTargets.length)

    //get the closest structure, if it exists, add it to the array
    var closestStructure = this.findClosest(playersKingdom.buildings)
    if(closestStructure){
      this.currentTargets.push(closestStructure);
    }

    //get the closest unit, if it exists add it to the array
    var closestUnit = this.findClosest(playersKingdom.units);
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
            attackUnitAI(currentUnit, this);
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
    }
}
