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

  isIdle(){
    var idle = false;

    if(this.state === "Idle"){
      idle = true;
    }
    return idle;
  }
  setState(state){
    this.state = state;
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
updateHealth(points, type){
  if(type === "attack"){
    this.health -= points;
  }
  else if (type === "heal"){
    this.health += points;
  }
}


isDead(){
  var unitDied = false;

  if(this.health <= 0){
    unitDied = true;
  }

  return unitDied;
}
getType(){
  return this.type;
}
}
