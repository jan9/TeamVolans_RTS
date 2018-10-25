class Structure extends Phaser.GameObjects.Sprite{

  constructor(structureInformation, xCoord, yCoord, scene, texture) {
    super(scene, xCoord, yCoord, texture);
    this.type = structureInformation.type;
    this.health = structureInformation.health;
    this.cost = structureInformation.cost;
    this.unitProduced = structureInformation.unitProduced;
    this.state = "Idle";

    //add the structure to the game scene (so it will actually show up on the screen)
    this.scene = scene;
    this.scene.add.existing(this);
  }

  getState(){
    return this.state;
  }
  getHealth(){
    return this.health;
  }

  getCost(){
    return this.cost;
  }

  getType(){
    return this.type;
  }

  getUnitProduced(){
    return this.unitProduced;
  }

  isIdle(){
    return this.state === "Idle";
  }

  setState(state){
    this.state = state;
  }

  //updates the health of the structure based on how many points it's been hurt by
  updateHealth(points){
      this.health -= points;
  }

  //starts building the structure
  startBuildUnit(unitType, kingdom, game, texture){

    var unitInfo;

    //gets the unit information depending on what type of unit is being built
    switch(unitType) {
      case "Priest":
        unitInfo = priestInfo;
        break;
      case "Royalty":
        unitInfo= royalInfo;
        break;
      case "Archer":
        unitInfo=archerInfo;
        break;
      case "Catapult":
        unitInfo= catapultInfo;
        break;
      case "Swordsman":
        unitInfo=swordsmanInfo;
        break;
      case "Villager":
        unitInfo= villagerInfo;
        break;
      case "Miner":
        unitInfo= minerInfo;
        break;
      default:
        unitInfo=villagerInfo;
    }


    //if the building can create the unit, and has the gold to create it, then creates the unit
    if(this.getUnitProduced() === unitType){
      if(unitInfo.cost < kingdom.gold){

        //set the state to build
        this.setState("Build");

        kingdom.gold -= unitInfo.cost;

        //creates the unit after 10 seconds
      var buildingEvent = game.time.addEvent({ delay: 10000, callback: this.finishBuildUnit,
        callbackScope: this, loop: false, args: [unitInfo, kingdom, game, texture] });
    }
  }

  }


  //finished building the unit. occurs 10 seconds after start
  finishBuildUnit(unitInfo, kingdom, game, texture){

    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && this.health > 0){

        //once the unit has been built, add it to the kingdom and increase the unitamount
        kingdom.units.push(new Unit(unitInfo, this.x+5, this.y+5, game, texture));
        kingdom.unitAmount++;
        this.setState("Idle");
    }
    else{

      //if the building was destroyed before the unit was built, give the money back to the kingdom
      kingdom.gold += unitInfo.cost;

    }
  }

}
