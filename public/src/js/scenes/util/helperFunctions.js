
//calculates the time
function calculateTime(seconds){

  var timeLeft = 600-seconds;
  var minutes = 0;

  //if seconds isn't 0 calculate the minutes, rounding down
  if(seconds != 0){
    minutes = Math.floor(timeLeft / 60);

  }

  //takes the seconds leftover from getting minutes and this is how many seconds elapsed
  var secondsUpdated = Math.round(timeLeft % 60);

  //creates the string to display the time
  var timeString = minutes+"M:"+secondsUpdated+"S";

  return timeString;
}


//checks to see if the game is over
function gameOver(seconds){
  return seconds >= 600;
}


//once the game is over checks to see if the player won or not
function calculateWinner(playerKingdom, aiKingdom){

  var playerWinner = true;
  var playerCastles = 0;
  var aiCastles = 0;


  //goes through the player's buildings and adds up the castles
  for(var i = 0; i < playerKingdom.buildings.length; i++){
    if(playerKingdom.buildings[i].type === "Castle"){
      playerCastles++;
    }
  }

//goes through the ai's buildings and adds up the castles
  for(var i = 0; i < aiKingdom.buildings.length; i++){
    if(aiKingdom.buildings[i].type === "Castle"){
      aiCastles++;
    }
  }

//if the ai has more castles than the ai wins
  if(aiCastles > playerCastles){
    playerWinner = false;
  }

  //if the two have the same amount of castles, but the aiKingdom has more gold, then the ai wins
  else if(aiCastles == playerCastles){
    if(aiKingdom.gold >= playerKingdom.gold){
      playerWinner = false;
    }
  }

  return playerWinner;
}

//updates the colliders
function updateColliders(game, aiKingdom, playerKingdom){
  //game.physics.add.overlap(aiKingdom, playerKingdom, overlapOccurred, null, this);
}


function overlapOccurred(unit1, unit2){


  if(unit1.baseType !== "Structure"){
    unit1.body.velocity.x = 0;
    unit1.body.velocity.y = 0;

    let moveX = unit1.x;
    let moveY = unit1.y;


    unit1.move(unit1.x-100, unit2.y-100, unit1.scene);
  }
  if (unit2.baseType !== "Structure"){
    unit2.body.velocity.x = 0;
    unit2.body.velocity.y = 0;

    unit2.move(unit2.x+100, unit2.y+100, unit2.scene);
  }
  else{

  }
}
