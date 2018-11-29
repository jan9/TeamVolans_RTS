function onTenMinutesUp() {
    // stop the timer and set time to 0
    console.log("Time is up!");
    readableTime = 0;
    timeElapsed = 0;
}

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
  if(secondsUpdated === 60) {minutes++; secondsUpdated = "00";};

  //creates the string to display the time
  var timeString = minutes+"M:"+secondsUpdated+"S";
  if (gamePaused === true) {
    timeString = "PAUSED";
  }
  return timeString;
}


function getGold(currentGold, playerKingdom) {
  var newGold;
  newGold = currentGold;
  player.gold = currentGold;
  return newGold;
}

function getPopulation(currentPopulation, playerKingdom){
  currentPopulation = player.units.length;
  return currentPopulation;
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
function updateColliders(game, aiKingdom, playerKingdom, layers){
  game.physics.add.collider(aiKingdom.units, layers[0]);
  game.physics.add.collider(aiKingdom.units, layers[1]);
  game.physics.add.collider(aiKingdom.units, layers[2]);

  game.physics.add.collider(playerKingdom.units, layers[0]);
  game.physics.add.collider(playerKingdom.units, layers[1]);
  game.physics.add.collider(playerKingdom.units, layers[2]);
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

function getMiniMap(scene, camX, camY, width, height, zoom) {
  scene.minimap = scene.cameras.add(camX, camY, width, height).setZoom(zoom).setName('minimap');
}

function timeStamp() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  if(dd<10) { dd = '0'+dd; }
  if(mm<10) { mm = '0'+mm; }
  if (hours < 10) { hours = '0' + hours;}
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  today = mm + '/' + dd + '/' + yyyy + '  ' + hours + ':' + minutes + ':' + seconds;
  return today;
}

function announcement(scene, gameMessage) {
  displayMessage.setText("");
  displayMessage = scene.add.text(4,80,gameMessage);
     scene.tweens.add({
       targets: displayMessage,
       x: _width+50,
       y: displayMessage.y,
       ease: 'linear',
       duration: 9000,
       repeat: 0,
       yoyo: false
     });
   }
