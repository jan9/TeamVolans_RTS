class Unit extends Phaser.GameObjects.Sprite{

  constructor(unitInformation, xCoord, yCoord, scene, playerCheck) {
    super(scene, xCoord, yCoord, unitInformation.texture);
    this.type = unitInformation.type;
    this.health = unitInformation.health;
    this.cost = unitInformation.cost;
    this.buildingProduced = unitInformation.buildingProduced;
    this.attack = unitInformation.attack;
    this.range = unitInformation.range;
    this.state = unitInformation.state;
    this.destinationX=xCoord+1;
    this.destinationY=yCoord+1;
    this.baseType = unitInformation.baseType;
    this.scene = scene

    this.isPlayerObject = playerCheck;

    this.setInteractive();

    //used for keeping track of the amount of time the unit has been in its state
    //(to ensure player can't game the system by something like
    //going mine -> move -> mine -> move, and getting multiple mine events for 1 miner within 30 seconds)
    this.stateLength;

    //used to have the unit be in front of buildings
    this.depth = 1;

    this.player_selected = false;  // for player kingdom
    // set up a health bar

    this.maxHealth = unitInformation.health; // store max health of a unit

    this.bar = new Phaser.GameObjects.Sprite(scene, xCoord+3, yCoord-30, 'healthBar100');

    scene.add.existing(this.bar);


    this.bar.setSize(16,16);
    //set size for physics
    this.setSize(32, 32);


    scene.physics.world.enable(this);
    scene.physics.world.enable(this.bar);

    this.body.setCollideWorldBounds(true);
    this.bar.body.setCollideWorldBounds(true);


    //add the unit to the game scene (so it will actually show up on the screen)
    this.scene.add.existing(this);

}
  isPlayerObj(){
    return this.isPlayerObject;
  }

  getState(){
    return this.state;
  }
  getAttack(){
    return this.attack;
  }
  getHealth(){
    return this.health;
  }
  getType(){
    return this.type;
  }

  //updates the health of the unit based on whether it's being healed or attacked
  updateHealth(points){
    this.health += points;
    if (this.health < 0) {
      this.health = 0;
    }
    this.updateHealthBar();
  }

  updateHealthBar(){
    let percent = Math.round((this.health/this.maxHealth)*10);
    percent *=10;
    //if there is less than 5% of health but unit is not dead, still use health bar for 10%
    if(percent < 10 && this.health > 0){
      this.bar.setTexture('healthBar10');
    }
    //otherwise use health bar rounded to closest 10
    else{
      this.bar.setTexture('healthBar'+percent);
    }

  }

  //checks to see whether or not the unit is dead
  isDead(){
    return this.health <= 0;
  }
  //checks to see if the unit is idle
  isIdle(){
    return this.state === "Idle";
  }

  //lets the state be set
  setState(state){
    this.stateLength = Date.now();
    this.state = state;
  }


    //moves the unit to the desired location
   move(xLocation, yLocation, game, action){

     if(!this.isDead() && (this.destinationX != xLocation || this.destinationY != yLocation)){

       this.playerStopMovement();

       //sets what the unit's destination is and gives it the Move state
       this.destinationX = xLocation;
       this.destinationY = yLocation;


       this.unitAnimations("Walk");
       this.setState("Move");

        var unitDistanceToMove = distance(xLocation, yLocation, this.x, this.y);
        //uses built in phaser moveTo function to move the unit
        //this function does not stop the unit's movement so had to create a function which checks to see if unit reached destination yet
        game.physics.moveTo(this, xLocation, yLocation, 1, (unitDistanceToMove*10));
        game.physics.moveTo(this.bar, xLocation, yLocation-25, 1, (unitDistanceToMove*10));

        var moveEvent = game.time.addEvent({ delay: (unitDistanceToMove*10), callback: this.stopMovement,
          callbackScope: this, loop: false, args: [xLocation, yLocation, action] });
      }
  }
  unitAnimations(typeOfAnim){

    var direction = "";

    if(this.destinationY != this.y){
      if(this.destinationY > this.y){
         direction = "S";
      }
      else{
        direction = "N";
      }
    }
    if(this.destinationX > this.x){
      direction+="E"
    }
    else if(this.destinationX < this.x){
      direction+="W";
    }

    if(direction === "S" && typeOfAnim === "Walk"){
      this.setTexture(this.type.toLowerCase());
      this.anims.play(this.type.toLowerCase()+typeOfAnim+direction);
    }
    else if(direction === "SW" || direction === "W" || direction === "NW"
    || direction === "S"){
      this.setTexture(this.type.toLowerCase()+"_rev");
      this.anims.play(this.type.toLowerCase()+"_rev"+typeOfAnim+direction);
    }
    else{
      this.setTexture(this.type.toLowerCase());
      this.anims.play(this.type.toLowerCase()+typeOfAnim+direction);
    }
  }


  playerStopMovement(){

    //put it in an if statement in case unit is dead
    if(this){
      if(this.getState() === "Move"){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.bar.body.velocity.x=0;
      this.bar.body.velocity.y=0;

      this.setState("Idle");
      this.anims.stop();
      }
    }
  }
  //stops the unit's movement and sets the state to idle
  stopMovement(destinationX, destinationY, action){

    let radius = 16;
    if((this.x-radius < this.destinationX && this.x+radius > this.destinationX) && (this.y-radius < this.destinationY && this.y+radius > this.destinationY)){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.bar.body.velocity.x=0;
      this.bar.body.velocity.y=0;

      this.setState("Idle");
      this.anims.stop();

      if(action){
        this.takeAction(action);
      }
    }
  }

  takeAction(action){
    if(action.name === "Attack"){
      this.attackEnemy(action.target, this.scene);
    }
    else if(action.name === "Mine"){
      this.mine(action.kingdom, this.scene);
    }
    else if(action.name === "Build"){
      this.startBuildStructure(action.buildingType, action.kingdom, this.scene);
    }
    else if (action.name === "Royal_Bonus"){
      this.startRoyalBonus(action.castle, action.kingdom);
    }
  }

  //starts building the structure
  startBuildStructure(buildingType, kingdom, game){

    var buildingInfo = kingdom.getStructureInfo(buildingType);

    //royalty can make the castle
    //only build if not already building - once you start building the unit is LOCKED INTO BUILDING THAT ITEM. THE unit cannot change
    if((this.type === "Villager" || this.buildingProduced === buildingType) && this.getState() !== "Build"){

    //can only build if the money is there for it
      if(buildingInfo.cost < kingdom.getGold()){

        //set the state to build
        this.setState("Build");
        this.unitAnimations("Action");

        //takes the gold right away from the kingdom
        kingdom.removeGold(buildingInfo.cost);

        //builds the structure in 30 seconds
      var buildingEvent = game.time.addEvent({ delay: 30000, callback: this.finishBuildStructure,
        callbackScope: this, loop: false, args: [buildingInfo, kingdom, game] });
      }
    }
  }


  //finished building the structure. occurs 30 seconds after start
  finishBuildStructure(buildingInfo, kingdom, game){

    //if unit is still alive and still has their state set to build and the building they are building hasn't changed, build the building
    if(this.getState() === "Build" && !this.isDead()){

      let coordinates;

      if(this.isPlayerObj()){
       coordinates = kingdom.findOpenArea(this.x, this.y);
     }
     else{
       coordinates = kingdom.findOpenArea(kingdom.startingX, kingdom.startingY);
     }


      var structure = new Structure(buildingInfo, coordinates.x, coordinates.y, game, kingdom.isPlayer());

      //add the structure to the Group
      kingdom.add(structure);

      //make it so structures can't be moved by collisions
       structure.body.setImmovable(true);


      kingdom.buildings.push(structure);
      kingdom.buildingsAmount++;

      this.setState("Idle");
      this.anims.stop();
    }

    //if the unit has been killed or isn't making the building anymore, give the kingdom back the gold from the buildings
    //not sure if this is the best way to do it. I don't think units/buildings should have
    //invincibility while building but should they get back the money at all from a failed build? Should it come right away?
    else{
      kingdom.addGold(buildingInfo.cost);
    }
  }

  isInMine(kingdom){

    let inMine = false;
    let availableMiningLocs = [];

    //find all the available mining locations
    for(let structure of kingdom.buildings){
      if(structure.type === "Mine"){
        availableMiningLocs.push({"x": structure.x, "y": structure.y});
      }
    }

    for(let miningLocation of kingdom.goldDeposits){
      availableMiningLocs.push({"x": miningLocation.x, "y": miningLocation.y});
    }

    //find out if the unit is in one of the available mining locations
    for(let miningLoc of availableMiningLocs){
      if(this.x+(_maxStructW/2) > miningLoc.x && this.x-(_maxStructW/2) < miningLoc.x
      &&this.y+(_maxStructH/2) > miningLoc.y && this.y-(_maxStructH/2) < miningLoc.y){
        inMine = true;
      }
    }

    return inMine;
  }


  //mines for gold (every 30 seconds miner gets 6 gold, villager gets 3)
  mine(kingdom, game){

    if(this.type === "Villager" || this.type === "Miner"){
      if(this.isInMine(kingdom) && this.getState()!=="Mine"){

        this.setState("Mine");
        this.unitAnimations("Action");

      //TIMER INFO
      //https://phaser.io/phaser3/devlog/87
      var miningEvent = game.time.addEvent({ delay: 30000, callback: this.mineGold,
        callbackScope: this, loop: false, args: [kingdom]});
    }
  }
}

  //callback function after 30 seconds elapses to give the kingdom the mined gold
  mineGold(kingdom){

    //check to make sure the unit is still alive
    if(!this.isDead()){

      //check to make sure the unit is still meant to be mining and still in the mine
      if(this.getState() === "Mine" && this.isInMine(kingdom)){

        //if the unit is a villager, they mine 3 gold every 30 seconds
        if(this.type === "Villager"){
          kingdom.addGold(3);
        }

        //if the unit is a miner they mine 6 gold every 30 seconds
        else if (this.type === "Miner"){
          kingdom.addGold(6);
        }
      }
    }
  }


  basicAttack(enemyKingdom){
    var enemy = findClosestUnit(enemyKingdom.units);
    this.move(enemy.x-32, enemy.y-32, this.scene, {"name": "Attack", "target": enemy});
  }


  //checks whether or not the unit passed in is within range
  checkWithinRange(unitToCheck){
    let withinRange = false;
    let range = _attackRangeOne;
    if(this.range === 2){
      range = _attackRangeTwo;
    }
    else if (this.range === 3){
      range = _attackRangeThree;
    }

    if(distance(this.x, this.y, unitToCheck.x, unitToCheck.y) < range){
      withinRange = true;
    }

    return withinRange;
  }


  //attacks an enemy
  //also used for the priest to heal allies
  attackEnemy(attackedUnit){

    if(attackedUnit){

      //only attack if the unit is within range
      if(this.checkWithinRange(attackedUnit)){
        let game = this.scene;
        this.destinationX = attackedUnit.x;
        this.destinationY= attackedUnit.y;

        //attack if unit isn't dead attack(dead units get removed at end of each update but
        // there's a chance it might have been killed in between)
        if(!this.isDead() && !attackedUnit.isDead()){
          this.setState("Attack");

          //waits 2.5 seconds to actually attack/land the hit
          //starts the attack animations
          if(this.getType() === "Archer"){
            this.unitAnimations("Shoot");
          }
          else if (this.getType() === "Swordsman"){
            this.unitAnimations("Attack");
          }
          //catapult needs special frames
          else if (this.getType() === "Catapult"){}
          else{
            this.unitAnimations("Action");
          }

          //the actual attack takes 3 seconds to account for the animation playing
          var attackEvent = game.time.addEvent({ delay: 3000, callback: this.attackEnemyEnd,
            callbackScope: this, loop: false, args: [attackedUnit] });
        }
      }
    }
  }

  //attack the enemy
  //heal the ally
  attackEnemyEnd(attackedUnit){

    //set state to idle and stop the attack animation
    this.setState("Idle");
    this.anims.stop();

    if(attackedUnit){
    if(!this.isDead() && !attackedUnit.isDead()){

      //unit has 50% chance of attack landing a hit
      var chance = Math.floor(Math.random() * 2) + 1;

      if(chance % 2 == 0 ){
        attackedUnit.updateHealth(this.getAttack());
      }
    }
}

  }


  //returns the closest unit in the given unitArray near the currentUnit
  //expensive to run a lot so...need to figure out a way to "cache" the results
  findClosestUnit(unitArray){
    //set the base unit and distance to the first unit in the array
    var closestUnit = unitArray[0];
    var closestDistance = distance(this.x, this.y, unitArray[0].x, unitArray[0].y);

  //goes through each of the units and checks to see if they are closest to our unit to check against
    for(let unit of unitArray){
      var currentDistance = distance(this.x, this.y, unit.x, unit.y);

      //if the current distance is closer than the closest distance then set the closest distance to the current distance
      if(currentDistance < closestDistance){
        closestUnit = unit;
        closestDistance = currentDistance;
      }
    }

    return closestUnit;
  }

  //finds the closest injured unit
  closestInjured(unitsList){
    var closestInjuredUnit;

    //goes through the list of units to find the  closest injured
    for(let unit of unitsList){
      //if closestInjuredUnit is undefined, define it with the first injured unit
      if(unit.health < unit.maxHealth && !closestInjuredUnit){
        closestInjuredUnit = unit;
      }

      else if(unit.health < unit.maxHealth
        && distance(this.x, this.y, closestInjured.x, closestInjured.y)
        > distance(this.x, this.y, unit.x, unit.y)){
        closestInjuredUnit = unit;
      }
    }

    return closestInjuredUnit;
  }



  //checks if the royalty is in a castles
  //if so, returns the castle
  isInCastle(kingdom){
    let castle = undefined;
    for(let building of kingdom.buildings){
      if(building.type === "Castle"){
        if(distance(this.x, this.y, building.x, building.y) < _maxStructH){
          castle = building;
        }
      }
    }
    return castle;
  }

  findCastle(kingdom){
    let castle = undefined;
    for(let building of kingdom.buildings){
      if(building.type === "Castle"){
        castle = building;
      }
    }
    return castle;
  }

  royalBonus(castle, kingdom){
    this.move(castle.x, castle.y, kingdom.game, {"name": "Royal_Bonus", "kingdom": kingdom, "castle": castle});
  }


  startRoyalBonus(castle, kingdom){


    if(this.getState() !== "Train" && this.getType() === "Royalty"){
      this.setState("Train");
      this.unitAnimations("Action");
      //every 30 seconds the royal adds to the health of the castle
      var royalEvent = kingdom.game.time.addEvent({ delay: 30*1000, callback: this.endRoyalBonus,
        callbackScope: this, loop: true, args: [castle, kingdom] });
      }
  }

  endRoyalBonus(castle, kingdom){

    if(this.isInCastle(kingdom) === castle && this.getState() === "Train"){
      castle.updateHealth(5);
    }
  }
}
