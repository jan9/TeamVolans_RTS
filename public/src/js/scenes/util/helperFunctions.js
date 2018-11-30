

function getObjectInformation(game){
  duelingDominionInfo = JSON.parse(game.cache.text.get('duelingDominion'));
  equalEmpireInfo = JSON.parse(game.cache.text.get('equalEmpire'));
  fortuneFederationInfo = JSON.parse(game.cache.text.get('fortuneFederation'));
  remoteRealmInfo = JSON.parse(game.cache.text.get('remoteRealm'));
  securitySyndicateInfo = JSON.parse(game.cache.text.get('securitySyndicate'));


  archeryRangeInfo = JSON.parse(game.cache.text.get('archeryRange'));
  barracksInfo = JSON.parse(game.cache.text.get('barracks'));
  castleInfo = JSON.parse(game.cache.text.get('castle'));
  machineryInfo = JSON.parse(game.cache.text.get('machinery'));
  templeInfo = JSON.parse(game.cache.text.get('temple'));
  mineInfo = JSON.parse(game.cache.text.get('mine'));
  townCenterInfo = JSON.parse(game.cache.text.get('townCenter'));

  archerInfo = JSON.parse(game.cache.text.get('archer'));
  catapultInfo = JSON.parse(game.cache.text.get('catapult'));
  minerInfo = JSON.parse(game.cache.text.get('miner'));
  priestInfo = JSON.parse(game.cache.text.get('priest'));
  royaltyInfo = JSON.parse(game.cache.text.get('royalty'));
  swordsmanInfo = JSON.parse(game.cache.text.get('swordsman'));
  villagerInfo = JSON.parse(game.cache.text.get('villager'));
}

function getObjectFilePaths(objectName){
  let filePath = "docs/";
  objectName = objectName.replace("_", " ");

  if(_kingdomList.includes(objectName)){
    filePath+="kingdom_information/"+objectName+".txt";
  }
  else{

    //capitalize first letter of the string
    //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    let capitalizedObject = objectName[0].toUpperCase() + objectName.slice(1);

    if(_unitList.includes(capitalizedObject)){
      filePath+="unit_information\\"+objectName+".txt";
    }
    else{
      filePath+="structure_information\\"+objectName+".txt";
    }
  }

  return filePath;
}

function createTextFiles(game){


  for(let object of _objectList){
    let path = getObjectFilePaths(object);

    game.load.text({
      key: object,
      url: path
    });
  }
}

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
  scene.minimap.setPosition(-160, 260);
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
