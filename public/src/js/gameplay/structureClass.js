class Structure extends Phaser.GameObjects.Sprite{

  constructor(structureInformation, xCoord, yCoord, scene) {
    super(scene, xCoord, yCoord, structureInformation.texture);
    this.type = structureInformation.type;
    this.baseType = structureInformation.baseType;
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
  isDead(){
    return this.health <= 0;
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
      this.health += points;
  }

  //starts building the structure
  startBuildUnit(unitType, kingdom, game, setInteractive){

    var unitInfo = kingdom.getUnitInfo(unitType);

    //if the building can create the unit, and has the gold to create it, then creates the unit
    if(this.getUnitProduced() === unitType){
      if(unitInfo.cost < kingdom.getGold()){

        //set the state to build
        this.setState("Build");

        kingdom.removeGold(unitInfo.cost);

        //creates the unit after 10 seconds
      var buildingEvent = game.time.addEvent({ delay: 10000, callback: this.finishBuildUnit,
        callbackScope: this, loop: false, args: [unitInfo, kingdom, game, setInteractive] });
    }
  }

  }


  //finished building the unit. occurs 10 seconds after start
  finishBuildUnit(unitInfo, kingdom, game, setInteractive){

    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && this.health > 0){
      var unit = new Unit(unitInfo, this.x+75, this.y, game);
        //once the unit has been built, add it to the kingdom and increase the unitamount
        if(setInteractive){
          unit.setInteractive();
        }

        kingdom.units.push(unit);
        kingdom.unitAmount++;
        if(kingdom === player){
          currentPopulation++;
        }
        this.setState("Idle");
    }
    else{

      //if the building was destroyed before the unit was built, give the money back to the kingdom
      kingdom.addGold(unitInfo.cost);

    }
  }

}
