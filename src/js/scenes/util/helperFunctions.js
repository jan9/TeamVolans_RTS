
//calculates the time
function calculateTime(seconds){
  var minutes = 0;

  //if seconds isn't 0 calculate the minutes, rounding down
  if(seconds != 0){
    minutes = Math.floor(seconds / 60);

  }

  //takes the seconds leftover from getting minutes and this is how many seconds elapsed
  var secondsUpdated = Math.round(seconds % 60);

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
    if(buildings[i].type === "Castle"){
      playerCastles++;
    }
  }

//goes through the ai's buildings and adds up the castles
  for(var i = 0; i < aiKingdom.buildings.length; i++){
    if(buildings[i].type === "Castle"){
      aiCastles++;
    }
  }

//if the ai has more castles than the ai wins
  if(aiCastles > playerCastles){
    playerWinner = false;
  }

  //if the two have the same amount of castles, but the aiKingdom has more gold, then the ai wins
  else if(aiCastles == playerCastles){
    if(aiKingdom.gold > playerKingdom.gold){
      playerWinner = false;
    }
  }

  return playerWinner;
}
