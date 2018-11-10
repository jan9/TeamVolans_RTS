class Structure extends Phaser.GameObjects.Sprite{

  constructor(structureInformation, xCoord, yCoord, scene) {
    super(scene, xCoord, yCoord, structureInformation.texture);
    this.type = structureInformation.type;
    this.baseType = structureInformation.baseType;
    this.health = structureInformation.health;
    this.cost = structureInformation.cost;
    this.unitProduced = structureInformation.unitProduced;
    this.state = "Idle";

      // set up a health bar
    this.maxHealth = structureInformation.health; // store max health of a unit
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.barX = xCoord-50;
    this.barY = yCoord-90;
    this.percent = this.health/this.maxHealth;
    this.drawHealthBar();

    this.scene = scene;
    //a game container containing a unit and its health bar
    this.unitContainer = new Phaser.GameObjects.Container(scene, xCoord, yCoord, [this,this.bar]);
    this.unitContainer.x = 0;
    this.unitContainer.y = 0;
    //scene.physics.world.enable(this);
    //scene.physics.world.enable(this.bar);
    scene.physics.world.enable(this.unitContainer);
    this.scene.add.existing(this.unitContainer);
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
    this.drawHealthBar();
  }

  //starts building the structure
  startBuildUnit(unitType, kingdom, game){

    var unitInfo = kingdom.getUnitInfo(unitType);

    //if the building can create the unit, and has the gold to create it, then creates the unit
    if(this.getUnitProduced() === unitType){
      if(unitInfo.cost < kingdom.getGold()){

        //set the state to build
        this.setState("Build");

        kingdom.removeGold(unitInfo.cost);

        //creates the unit after 10 seconds
      var buildingEvent = game.time.addEvent({ delay: 10000, callback: this.finishBuildUnit,
        callbackScope: this, loop: false, args: [unitInfo, kingdom, game] });
    }
  }

  }


  //finished building the unit. occurs 10 seconds after start
  finishBuildUnit(unitInfo, kingdom, game){

    //if unit is still alive and still has their state set to build, build the building
    if(this.getState() === "Build" && this.health > 0){
      var unit = new Unit(unitInfo, this.x+75, this.y, game);
        //once the unit has been built, add it to the kingdom and increase the unitamount
        if(kingdom.isPlayer()){
          unit.setInteractive();
        }

        //add the unit to the group
        kingdom.add(unit);

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
  drawHealthBar() {
    this.bar.clear();
    this.percent = this.health/this.maxHealth;
    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.barX, this.barY, 50, 10);

    //  Health
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.barX + 2, this.barY + 2, 46, 6);

    if (this.percent < 0.3)
    {
        this.bar.fillStyle(0xff0000);
    }
    else
    {
        this.bar.fillStyle(0x00ff00);
    }

  var d = Math.floor( this.percent * 46);

    this.bar.fillRect(this.barX + 2, this.barY + 2, d, 6);
  }
}
