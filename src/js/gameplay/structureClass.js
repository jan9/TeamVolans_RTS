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
}
