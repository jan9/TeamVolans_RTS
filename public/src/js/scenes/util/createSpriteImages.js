//walk is the same frames across units
var walkNFrames = [0, 5, 10, 15, 20];
var walkNEFrames = walkSWFrames =	[1, 6, 11, 16, 21];
var walkEFrames = walkWFrames = [2, 7, 12, 17, 22];
var walkSEFrames = walkNWFrames = [3, 8, 13, 18, 23];
var walkSFrames = [4, 9, 14, 19, 24];


//action frames for everyone but archer and swordsman
var actionNFrames = [25, 30, 35, 40, 45];
var actionNEFrames = actionSWFrames = [26, 31, 36, 41, 46];
var actionEFrames = actionWFrames =	[27, 32, 37, 42, 47];
var actionSEFrames = actionNWFrames = [28, 33, 38, 43, 48];
var actionSFrames = [29, 34, 39, 44, 49];

//dying frames for everyone but archer and swordsman
var dieNEFrames = dieNFrames = dieSFrames = dieSWFrames = [50, 55, 60];
var dieEFrames = dieSEFrames = dieWFrames = dieNWFrames = [53, 58, 63];

//archer has different frames for actions/dying/melee
//archer shoot frames
var archerShootNFrames = [25, 30, 35, 40, 45, 50];
var archerShootNEFrames = archer_revShootSWFrames = [26, 31, 36, 41, 46, 51];
var archerShootEFrames = archer_revShootWFrames = [27, 32, 37, 42, 47, 52];
var archerShootSEFrames = archer_revShootNWFrames = [28, 33, 38, 43, 49, 54];
var archer_revShootSFrames = [29, 34, 39, 44, 49, 54];

//archer melee frames
var archerMeleeNFrames = [70, 75, 80, 85, 90, 95];
var archerMeleeNEFrames = archer_revMeleeSWFrames = [71, 76, 81, 86, 91, 96];
var archerMeleeEFrames = archer_revMeleeWFrames = [72, 77, 82, 87, 92, 97];
var archerMeleeSEFrames = archer_revMeleeNWFrames = [73, 78, 83, 88, 93, 98];
var archer_revMeleeSFrames = [74, 79, 84, 89, 94, 99];

//archer die frames
var archerDieNFrames = archerDieNEFrames = archer_revDieSWFrames = archer_revDieSFrames = [55, 60, 65];
var archerDieEFrames = archerDieSEFrames = archerDie_revNWFrames = archer_revDieWFrames = [57, 62, 67];


//swordsman has different frames for actions/dying melee
var swordsmanAttackNFrames = [25, 30, 35, 40];
var swordsmanAttackNEFrames = swordsman_revAttackSWFrames = [26, 31, 36, 41];
var swordsmanAttackEFrames = swordsman_revAttackWFrames = [27, 32, 37, 42];
var swordsmanAttackSEFrames = swordsman_revAttackNWFrames = [28, 33, 38, 43];
var swordsmanAttackSFrames = [29, 34, 39, 44];

var swordsmanDieNEFrames = swordsmanDieNFrames = swordsman_revDieSFrames = swordsman_revDieSWFrames = [45, 50, 55];
var swordsmanDieEFrames = swordsmanDieSEFrames = swordsman_revDieWFrames = swordsman_revDieNWFrames = [48, 53, 58];


//catapult movement frames
var catapultMoveNFrames = [0, 5];
var catapultMoveNEFrames = catapult_revMoveSWFrames = [1, 6];
var catapultMoveEFrames = catapult_revMoveWFrames = [2, 7];
var catapultMoveSEFrames = catapult_revMoveNWFrames = [3, 8];
var catapultMoveSFrames = [4, 9];

//catapult action frames
var catapultShootNFrames = [5, 10, 15];
var catapultShootNEFrames = catapult_revShootSWFrames = [6, 11, 16];
var catapultShootEFrames = catapult_revShootWFrames = [7, 12, 17];
var catapultShootSEFrames = catapult_revShootNWFrames = [8, 13, 18];
var catapultShootSFrames = [9, 14, 19];

var unitSprites = ['archer', 'archer_rev', 'catapult', 'catapult_rev', 'priest', 'priest_rev',
'villager', 'villager_rev', 'royalty', 'royalty_rev',
'swordsman', 'swordsman_rev', 'miner', 'miner_rev', 'archer_enemy', 'archer_rev_enemy', 'catapult_enemy', 'catapult_rev_enemy', 'priest_enemy', 'priest_rev_enemy',
'villager_enemy', 'villager_rev_enemy', 'royalty_enemy', 'royalty_rev_enemy',
'swordsman_enemy', 'swordsman_rev_enemy', 'miner_enemy', 'miner_rev_enemy'];
const directionsList = ["N", "NE", "E", "SE"];
const revDirections = ["SW", "W", "NW", "S"];

const walkDirectionList = ["N", "NE", "E", "SE", "S"];
const revWalkDirectionList = ["W", "NW", "SW"];

const actionsList = [ "Action", "Die"];
const archerActions = ["Shoot", "Melee", "Die"];
const swordsmanActions = ["Attack", "Die"];
const catapultActions = ["Shoot", "Die"]


function createHealthBarSprites(scene){
  for(var i = 0; i <= 100; i+=10){
    scene.load.image('healthBar'+i, 'Graphics/misc/health_bar_'+i+'.png');
 }
}

function createOptionsSprites(scene){
  for(let option of _options){
    scene.load.image(option.name+'_option', 'Graphics/UI/optionButtons/'+option.name +'_option.png');
 }
}

//load in the unit sprites
function createUnitSprite(scene, type){
  scene.load.spritesheet(type,
       'Graphics/units/'+type+'.png',
       { frameWidth: 72, frameHeight: 72}
   );
}

function createUnitSprites(scene){
  for(var i = 0; i < unitSprites.length; i++){
    createUnitSprite(scene, unitSprites[i]);
  }
}

//load in the structure sprites - NEED THE IMAGES STILL
function createStructureSprites(scene){
  scene.load.spritesheet('archeryRange',
       'Graphics/buildings/archery.png',
       { frameWidth: 128, frameHeight: 128}
   );
   scene.load.spritesheet('barracks',
        'Graphics/buildings/barracks.png',
        { frameWidth: 128, frameHeight: 128}
    );

  scene.load.spritesheet('castle',
       'Graphics/buildings/castle.png',
       { frameWidth: 160, frameHeight: 160}
   );
  scene.load.spritesheet('machinery',
      'Graphics/buildings/machinery.png',
      { frameWidth: 128, frameHeight: 128}
  );

  scene.load.spritesheet('mine',
   'Graphics/buildings/gold_mine.png',
    { frameWidth: 96, frameHeight: 96}
  );

  scene.load.spritesheet('deposit',
   'Graphics/misc/gold_deposit.png',
    { frameWidth: 96, frameHeight: 96}
  );

  scene.load.spritesheet('temple',
    'Graphics/buildings/temple.png',
    { frameWidth: 128, frameHeight: 128}
  );
  scene.load.spritesheet('townCenter',
    'Graphics/buildings/TownCenter.png',
    { frameWidth: 128, frameHeight: 128}
  );
}

//factory method to easily create the unit animations
function createAnim(newKeyName, originalKey, framesArr, scene){

  //remove enemy from the framesarr (enemy has same frames as player)
  //CITATION: Used following resource to learn about replace:
  //https://www.w3schools.com/jsref/jsref_replace.asp
  framesArr = framesArr.replace("_enemy", "");

  //speed the frames up to 3 frames/second
  let frameRate = 3;

  //if the animation is a "Die" animation, have it only be 1 frame per second
  if(framesArr.includes("Die") || framesArr.includes("die")){
    frameRate = 1;
  }


  scene.anims.create(
    {
             key: newKeyName,
             frames: scene.anims.generateFrameNumbers(originalKey, {
                 frames: window[framesArr]
             }),
             repeat: -1,
             frameRate: frameRate
  });
}

function createGeneralUnitAnims(scene, type){

    //create all the other unit animations
    for(var j = 0; j < actionsList.length; j++){

      if(type.includes("rev")){
        for(var i = 0; i < revDirections.length; i++){
            createAnim(type+actionsList[j]+revDirections[i],
               type, actionsList[j].toLowerCase()+revDirections[i]+"Frames", scene);
          }
    }
    else{
      for(var i = 0; i < directionsList.length; i++){
        createAnim(type+actionsList[j]+directionsList[i],
          type, actionsList[j].toLowerCase()+directionsList[i]+"Frames", scene);
      }
    }
  }
}

function createSpecialUnitAnims(scene, type, specialActionArray){

    for(var j = 0; j < specialActionArray.length; j++){

      if(type.includes("rev")){
        for(var i = 0; i < revDirections.length; i++){
          createAnim(type+specialActionArray[j]+revDirections[i],
           type, type+specialActionArray[j]+revDirections[i]+"Frames", scene);
        }

    }
    else{

      for(var i = 0; i < directionsList.length; i++){
        createAnim(type+specialActionArray[j]+directionsList[i],
          type, type+specialActionArray[j]+directionsList[i]+"Frames", scene);
      }
    }
  }
}

function createWalkAnims(scene, type){

  if(type.includes("rev") && type.includes("catapult")) {
  	for(var i =0; i < revWalkDirectionList.length; i++){
  		createAnim(type+"Walk"+revWalkDirectionList[i],
  			type, type+"Move"+revWalkDirectionList[i]+"Frames", scene);
  	}
  }

  else if(type.includes("catapult")) {
  	for(var i = 0; i < walkDirectionList.length; i++){
      createAnim(type+"Walk"+walkDirectionList[i],
         type, type+"Move"+walkDirectionList[i]+"Frames", scene);
  	}
   }

  else if(type.includes("rev")){
    for(var i = 0; i < revWalkDirectionList.length; i++){
      createAnim(type+"Walk"+revWalkDirectionList[i],
         type, "walk"+revWalkDirectionList[i]+"Frames", scene);
      }
    }
    else{
    for(var i = 0; i < walkDirectionList.length; i++){
      createAnim(type+"Walk"+walkDirectionList[i],
         type, "walk"+walkDirectionList[i]+"Frames", scene);
    }
  }
}

function createAnims(scene, type){

  //all units have same walk animation frames so make those first
    createWalkAnims(scene, type);

    //create the archer animations
    if(type.includes("archer")){
      createSpecialUnitAnims(scene, type, archerActions);
    }
    //create the swordsman animations
    else if (type.includes("swordsman")){
      createSpecialUnitAnims(scene, type, swordsmanActions);
    }

    else if (type.includes("catapult")) {
    	createSpecialUnitAnims(scene, type, catapultActions);
    }
    else{
      createGeneralUnitAnims(scene, type);
    }
}

//goes through the list of unitSprites and creates the different animations
function createUnitAnims(scene){

  for(var i = 0; i < unitSprites.length; i++){
    createAnims(scene, unitSprites[i]);
  }
}
