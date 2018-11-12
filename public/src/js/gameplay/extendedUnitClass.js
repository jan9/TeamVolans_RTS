class ExtendedUnit extends Phaser.GameObjects.Container{

  constructor(unit) {
    super(unit.scene, 0, 0, [unit,unit.bar]);

    this.setSize(32, 32);

    //scene.physics.world.enable(this);
    //scene.physics.world.enable(this.bar);
    unit.scene.physics.world.enable(this);
    unit.scene.add.existing(this);
}


  synchMovements(){
    this.first.currentX = this.x;
    this.first.currentY = this.y;
  }

  //moves the unit to the desired location
   move(xLocation, yLocation, game){

     //console.log("x Location: " +xLocation+" y Location: " +yLocation + " current destination X: " +this.first.destinationX + " current destination Y: " + this.first.destinationY);

     if(xLocation != this.first.destinationX || yLocation != this.first.destinationY){

      this.playerStopMovement();

       //sets what the unit's destination is and gives it the Move state
       this.first.destinationX = xLocation;
       this.first.destinationY = yLocation;

       this.first.unitAnimations("Walk");
       this.first.setState("Move");

       var distanceToMove = distance(xLocation, yLocation, this.x, this.y);

       //uses built in phaser moveTo function to move the unit
       //this function does not stop the unit's movement so had to create a function which checks to see if unit reached destination yet
       game.physics.moveTo(this, xLocation, yLocation, 1, (distanceToMove*10));

       var moveEvent = game.time.addEvent({ delay: (distanceToMove*10), callback: this.stopMovement,
         callbackScope: this, loop: false, args: [xLocation, yLocation] });
     }
  }

  //stops the unit's movement and sets the state to idle
  stopMovement(originalDestinationX, originalDestinationY){

    this.synchMovements();
    if(this.first.destinationX == originalDestinationX && this.first.destinationY == originalDestinationY){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      this.first.setState("Idle");
      this.first.anims.stop();
    }
  }

  playerStopMovement(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.first.setState("Idle");
    this.first.anims.stop();
  }
}
