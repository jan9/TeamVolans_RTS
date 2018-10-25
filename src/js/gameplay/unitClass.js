class Unit extends Phaser.GameObjects.Sprite{

  constructor(unitInformation, xCoord, yCoord, scene, texture) {
    super(scene, xCoord, yCoord, texture);
    this.type = unitInformation.type;
    this.health = unitInformation.health;
    this.cost = unitInformation.cost;
    this.buildingProduced = unitInformation.buildingProduced;
    this.attack = unitInformation.attack;
    this.range = unitInformation.range;
    this.state = unitInformation.state;
    this.destinationX=0;
    this.destinationY=0;
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
  updateHealth(points, type){
    if(type === "attack"){
      this.health -= points;
    }
    else if (type === "heal"){
      this.health += points;
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
    this.state = state;
  }

  //moves the unit to the desired location
   move(xLocation, yLocation, game){

    //if unit is already moving, then we need to stop the movement
    if(this.getState() === "Move"){
      this.stopMovement();
    }

      //sets what the unit's destination is and gives it the Move state
      this.destinationX = xLocation;
      this.destinationY = yLocation;
      this.setState("Move");

      //uses built in phaser moveTo function to move the unit
      //this function does not stop the unit's movement so had to create a function which checks to see if unit reached destination yet
      game.physics.moveTo(this, xLocation, yLocation, 2);

  }

  //checks if the moving unit is at it's destination (right now have it set up to be in a radius of the actual destination)
  //and if so stops the unit from moving
  //returns true if the unit has finished moving
  checkMovement(){

    var finishedMoving = false;
    var radius = 2.5;

    //checks to see if the unit is alive and still moving, then stop their movement if they're close enough
    if(!this.isDead() && this.getState() === "Move"){

      if((this.destinationX < this.x + radius &&
        this.destinationX > this.x - radius)
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
  startBuildStructure(buildingType, kingdom, game, texture){

    var buildingInfo;

    //depending on which type of structure is being built we need different details
    switch(buildingType) {
      case "Temple":
        buildingInfo= templeInfo;
        break;
      case "Castle":
        buildingInfo= castleInfo;
        break;
      case "Archery Range":
        buildingInfo=archeryRangeInfo;
        break;
      case "Machinery":
        buildingInfo= machineryInfo;
        break;
      case "Barracks":
        buildingInfo=barracksInfo;
        break;
      case "Town Center":
        buildingInfo= townCenterInfo;
        break;
      case "Mine":
        buildingInfo= mineInfo;
        break;
      default:
        buildingInfo=townCenterInfo;
    }

    //a villager can make all buildings except Castle
    //other units can only make their building type
    if(buildingUnit.type === "Villager" || this.buildingProduced === buildingType){
    //can only build if the money is there for it
      if(buildingInfo.cost < kingdom.gold){

        //set the state to build
        this.setState("Build");

        //takes the gold right away from the kingdom
        kingdom.gold -= buildingInfo.cost;

        //builds the structure in 30 seconds
      var buildingEvent = game.time.addEvent({ delay: 30000, callback: this.finishBuildStructure,
        callbackScope: this, loop: false, args: [buildingInfo, kingdom, game, texture] });
      }
    }

  }

  //finished building the structure. occurs 30 seconds after start
  finishBuildStructure(buildingInfo, kingdom, game, texture){


    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && !this.isDead()){
        kingdom.buildings.push(new Structure(buildingInfo, this.x+5, this.y+5, game, texture));
        kingdom.buildingsAmount++;
        this.setState("Idle");
    }

    //if the unit has been killed or isn't making the building anymore, give the kingdom back the gold from the buildings
    //not sure if this is the best way to do it. I don't think units/buildings should have
    //invincibility while building but should they get back the money at all from a failed build? Should it come right away?
    else{
      kingdom.gold += buildingInfo.cost;
    }
  }

  //mines for gold (every 30 seconds miner gets 6 gold, villager gets 3)
  mine(kingdom, game){

    this.setState("Mine");

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
          kingdom.gold += 3;
        }

        //if the unit is a miner they mine 6 gold every 30 seconds
        else if (this.type === "Miner"){
          kingdom.gold += 6;
        }

        this.setState("Idle");
      }
    }
  }

}
