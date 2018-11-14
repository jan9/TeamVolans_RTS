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

    this.bar = new Phaser.GameObjects.Sprite(scene, xCoord, yCoord-80, 'healthBar100');

    scene.add.existing(this.bar);
    this.bar.setSize(16,16);

    this.scene = scene;

    //scene.physics.world.enable(this);
    //scene.physics.world.enable(this.bar);
    scene.physics.world.enable(this);
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
