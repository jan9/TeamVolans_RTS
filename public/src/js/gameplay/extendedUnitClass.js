class ExtendedUnit extends Phaser.GameObjects.Container{

  constructor(unit) {
    super(unit.scene, 0, 0, [unit,unit.bar]);

    //scene.physics.world.enable(this);
    //scene.physics.world.enable(this.bar);
    unit.scene.physics.world.enable(this);
    unit.scene.add.existing(this);
}


  //moves the unit to the desired location
   move(xLocation, yLocation, game){



     if(xLocation != this.first.destinationX || yLocation != this.first.destinationY){

       //sets what the unit's destination is and gives it the Move state
       this.first.destinationX = xLocation;
       this.first.destinationY = yLocation;

       this.first.unitAnimations("Walk");
       this.first.setState("Move");

       var distanceToMove = distance(xLocation, yLocation, this.first.x, this.first.y);

       //uses built in phaser moveTo function to move the unit
       //this function does not stop the unit's movement so had to create a function which checks to see if unit reached destination yet
       //game.physics.moveTo(this.unitContainer, xLocation, yLocation, 5);
       game.physics.moveTo(this, xLocation, yLocation, 0, (distanceToMove*100)/2);
       var moveEvent = game.time.addEvent({ delay: ((distanceToMove*100)/2), callback: this.stopMovement,
         callbackScope: this, loop: false, args: [xLocation, yLocation] });
     }
  }

  //stops the unit's movement and sets the state to idle
  stopMovement(originalDestinationX, originalDestinationY){

    if(this.first.destinationX == originalDestinationX && this.first.destinationY == originalDestinationY){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      this.first.setState("Idle");
      //this.anims.stop();
    }
  }

  playerStopMovement(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
}
