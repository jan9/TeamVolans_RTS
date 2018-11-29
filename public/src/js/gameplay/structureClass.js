class Structure extends Phaser.GameObjects.Sprite{

  constructor(structureInformation, xCoord, yCoord, scene, playerCheck, kingdom) {
    super(scene, xCoord, yCoord, structureInformation.texture);
    this.type = structureInformation.type;
    this.baseType = structureInformation.baseType;
    this.health = structureInformation.health;
    this.cost = structureInformation.cost;
    this.unitProduced = structureInformation.unitProduced;
    this.state = "Idle";
    this.isPlayerObject = playerCheck;
    this.kingdom = kingdom;
    this.setInteractive();

      // set up a health bar
    this.maxHealth = structureInformation.health; // store max health of a unit

    this.bar = new Phaser.GameObjects.Sprite(scene, xCoord, yCoord-80, 'healthBar100');

    scene.add.existing(this.bar);
    this.bar.setSize(16,16);

    this.scene = scene;

    //scene.physics.world.enable(this);
    //scene.physics.world.enable(this.bar);
    scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  isPlayerObj(){
    return this.isPlayerObject;
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

    //castle health can go > 100
    else if(percent >= 100){
      this.bar.setTexture('healthBar100');
    }
    //otherwise use health bar rounded to closest 10
    else{
      this.bar.setTexture('healthBar'+percent);
    }
  }


  //starts building the structure
  startBuildUnit(unitType, kingdom, game){

    var unitInfo = kingdom.getUnitInfo(unitType);

    //if the building can create the unit, and has the gold to create it, then creates the unit
    if(this.getUnitProduced() === unitType && this.getState() === "Idle"){
      if(unitInfo.cost <= kingdom.getGold()){

        //if this is the player object tint it to green
        if(this.isPlayerObj()){
          this.tint = 0x00FF00;
        }

        //set the state to build
        this.setState("Build");

        kingdom.removeGold(unitInfo.cost);

        //creates the unit after 10 seconds
      var buildingEvent = game.time.addEvent({ delay: 10000, callback: this.finishBuildUnit,
        callbackScope: this, loop: false, args: [unitInfo, kingdom, game] });
    } else if (unitInfo.cost > kingdom.getGold()){ notEnoughGold = 1; }
  }

  }


  //finished building the unit. occurs 10 seconds after start
  finishBuildUnit(unitInfo, kingdom, game){

    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && this.health > 0){
      var unit = new Unit(unitInfo, this.x+75, this.y, game, kingdom.isPlayer(), kingdom, 0);
        //once the unit has been built, add it to the kingdom and increase the unitamount

        kingdom.units.push(unit);
        kingdom.unitAmount++;

        this.setState("Idle");

        //if this is the player object make it normal colored again as build is finished
        if(this.isPlayerObj()){
          this.tint = 0xFFFFFF;
        }

        if(kingdom === player){
          currentPopulation++;
          gameMessage = 1;
        }
    }
    else{

      //if the building was destroyed before the unit was built, give the money back to the kingdom
      kingdom.addGold(unitInfo.cost);


    }
  }
}
