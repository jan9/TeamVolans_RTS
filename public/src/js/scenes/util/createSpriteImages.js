var walkNFrames = [0, 5, 10, 15, 20];
var walkNEFrames, walkSWFrames =	[1, 6, 11, 16, 21];
var walkEFrames, walkWFrames = [2, 7, 12, 17, 22];
var walkSEFrames, walkNWFrames = [3, 8, 13, 18, 23];
var walkSFrames = [4, 9, 14, 19, 24];
var actionNFrames = [25, 30, 35, 40];
var actionNEFrames, actionSWFrames = [26, 31, 36, 41];
var actionEFrames, actionWFrames =	[27, 32, 37, 42];
var actionSEFrames, actionNWFrames = [28, 33, 38, 43];
var actionSFrames = [29, 34, 39, 44];
var dieNNEFrames, dieSSWFrames = [45, 50, 55];
var dieESEFrames, dieWNWFrames = [48, 53, 58];


var unitSprites = ['archer', 'archer_rev', 'priest', 'priest_rev',
'catapult', 'catapult_rev', 'villager', 'villager_rev', 'royalty', 'royalty_rev',
'swordsman', 'swordsman_rev', 'miner', 'miner_rev'];


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
      'Graphics/buildings/gold_mine.png',
      { frameWidth: 128, frameHeight: 128}
  );

  scene.load.spritesheet('mine',
   'Graphics/buildings/gold_mine.png',
    { frameWidth: 96, frameHeight: 96}
  );

  scene.load.spritesheet('temple',
    'Graphics/buildings/temple.png',
    { frameWidth: 128, frameHeight: 128}
  );
  scene.load.spritesheet('townCenter',
    'Graphics/buildings/gold_mine.png',
    { frameWidth: 128, frameHeight: 128}
  );
}

//factory method to easily create the unit animations
function createAnim(newKeyName, originalKey, framesArr, scene){
  scene.anims.create(
    {
             key: newKeyName,
             frames: scene.anims.generateFrameNumbers(originalKey, {
                 frames: framesArr
             }),
             repeat: -1,
             frameRate: 2
  });
}

function createAnims(scene, type){
  if(type.includes("rev")){
    createAnim(type+'WalkSW', type, walkSWFrames, scene);
    createAnim(type+'WalkW', type, walkWFrames, scene);
    createAnim(type+'WalkNW', type, walkNWFrames, scene);
    createAnim(type+'ActionSW', type, actionSWFrames, scene);
    createAnim(type+'ActionW', type, actionWFrames, scene);
    createAnim(type+'ActionNW', type, actionNWFrames, scene);
    createAnim(type+'DieSW', type, dieSSWFrames, scene);
    createAnim(type+'DieS', type, dieSSWFrames, scene);
    createAnim(type+'DieW', type, dieWNWFrames, scene);
    createAnim(type+'DieNW', type, dieWNWFrames, scene);
  }
  else{
  createAnim(type+'WalkN', type, walkNFrames, scene);
  createAnim(type+'WalkNE', type, walkNEFrames, scene);
  createAnim(type+'WalkE', type, walkEFrames, scene);
  createAnim(type+'WalkSE', type, walkSEFrames, scene);
  createAnim(type+'WalkS', type, walkSFrames, scene);
  createAnim(type+'ActionN', type, actionNFrames, scene);
  createAnim(type+'ActionNE', type, actionNEFrames, scene);
  createAnim(type+'ActionE', type, actionEFrames, scene);
  createAnim(type+'ActionSE', type, actionSEFrames, scene);
  createAnim(type+'ActionS', type, actionSFrames, scene);
  createAnim(type+'DieNE', type, dieNNEFrames, scene);
  createAnim(type+'DieN', type, dieNNEFrames, scene);
  createAnim(type+'DieSE', type, dieESEFrames, scene);
  createAnim(type+'DieE', type, dieESEFrames, scene);
  }
}

//goes through the list of unitSprites and creates the different animations
function createUnitAnims(scene){

  for(var i = 0; i < unitSprites.length; i++){
    createAnims(scene, unitSprites[i]);
  }
}
