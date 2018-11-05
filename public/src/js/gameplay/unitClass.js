class Unit extends Phaser.GameObjects.Sprite{

  constructor(unitInformation, xCoord, yCoord, scene) {
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
    scene.physics.world.enable(this);

    //add the unit to the game scene (so it will actually show up on the screen)
    this.scene = scene;
    this.scene.add.existing(this);
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
    this.state = state;
  }

  //moves the unit to the desired location
   move(xLocation, yLocation, game){

     //sets what the unit's destination is and gives it the Move state
     this.destinationX = xLocation;
     this.destinationY = yLocation;

    //if unit is already moving, then we need to stop the movement
    if(this.getState() === "Move"){
      this.stopMovement();
    }
    else{
        this.unitAnimations("Walk");
    }

      this.setState("Move");


      //uses built in phaser moveTo function to move the unit
      //this function does not stop the unit's movement so had to create a function which checks to see if unit reached destination yet
      game.physics.moveTo(this, xLocation, yLocation, 5);

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
    if(direction === "SW" || direction ==="W" || direction == "NW"){
      this.setTexture(this.type.toLowerCase()+"_rev");
      this.anims.play(this.type.toLowerCase()+"_rev"+typeOfAnim+direction);
    }
    else{
      this.setTexture(this.type.toLowerCase());
      this.anims.play(this.type.toLowerCase()+typeOfAnim+direction);
    }
  }


  //checks if the moving unit is at it's destination (right now have it set up to be in a radius of the actual destination)
  //and if so stops the unit from moving
  //returns true if the unit has finished moving
  checkMovement(){
    var finishedMoving = false;
    var radius = 2.5;

    //checks to see if the unit is alive and still moving, then stop their movement if they're close enough
    if(!this.isDead() && this.getState() === "Move"){

      if((this.destinationX < this.x + radius
        && this.destinationX > this.x - radius)
        && (this.destinationY < this.y + radius
        && this.destinationY > this.y - radius)){
          this.stopMovement();
          finishedMoving = true;
      }
    }

    return finishedMoving;
  }

  //stops the unit's movement and sets the state to idle
  stopMovement(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.setState("Idle");
  }

  //starts building the structure
  startBuildStructure(buildingType, kingdom, game){

    console.log("HERE");
    var buildingInfo = kingdom.getStructureInfo(buildingType);

    //a villager can make all buildings except Castle
    //other units can only make their building type
    if(this.type === "Villager" || this.buildingProduced === buildingType){
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

    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && !this.isDead()){
      var structure = new Structure(buildingInfo, this.x+5, this.y+5, game);

      if(kingdom.isPlayer()){
        structure.setInteractive();
      }
      kingdom.buildings.push(structure);
      kingdom.buildingsAmount++;
      this.setState("Idle");
    }

    //if the unit has been killed or isn't making the building anymore, give the kingdom back the gold from the buildings
    //not sure if this is the best way to do it. I don't think units/buildings should have
    //invincibility while building but should they get back the money at all from a failed build? Should it come right away?
    else{
      kingdom.addGold(buildingInfo.cost);
    }
  }

  //mines for gold (every 30 seconds miner gets 6 gold, villager gets 3)
  mine(kingdom, game){

    this.setState("Mine");
    this.unitAnimations("Action");

    //TIMER INFO
    //https://phaser.io/phaser3/devlog/87
    var miningEvent = game.time.addEvent({ delay: 30000, callback: this.mineGold,
      callbackScope: this, loop: false, args: [kingdom] });
  }

  //callback function after 30 seconds elapses to give the kingdom the mined gold
  mineGold(kingdom){

    //check to make sure the unit is still alive
    if(!this.isDead()){

      //check to make sure the unit is still meant to be mining
      if(this.getState() === "Mine"){

        //if the unit is a villager, they mine 3 gold every 30 seconds
        if(this.type === "Villager"){
          kingdom.addGold(3);
        }

        //if the unit is a miner they mine 6 gold every 30 seconds
        else if (this.type === "Miner"){
          kingdom.addGold(6);
        }

        this.setState("Idle");
      }
    }
  }

  attackEnemyEnd(attackedUnit){

    if(!this.isDead() && !attackedUnit.isDead()){

      //unit has 50% chance of attack landing a hit
      var chance = Math.floor(Math.random() * 2) + 1;

      if(chance % 2 == 0 ){
        attackedUnit.updateHealth(this.getAttack());
      }
    }

    //set state to idle and stop the attack animation
    this.setState("Idle");
    this.anims.stop();
  }

  attackEnemy(attackedUnit, game){

    this.setState("Attack");

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
      var attackEvent = game.time.addEvent({ delay: 2500, callback: this.attackEnemyEnd,
        callbackScope: this, loop: false, args: [attackedUnit] });
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

}
