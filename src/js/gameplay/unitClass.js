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

    //add the unit to the game scene (so it will actually show up on the screen)
    this.scene = scene;
    this.scene.add.existing(this);
  }

setState(state){
  this.state = state;
}
getState(){
  return this.state;
}
updateHealth(points, type){
  if(type === "attack"){
    this.health -= points;
  }
  else if (type === "heal"){
    this.health += points;
  }
}
getType(){
  return this.type;
}
}
