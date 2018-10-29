var walkNFrames = [0, 5, 10, 15, 20];
var walkNEFrames =	[1, 6, 11, 16, 21];
var walkEFrames = [2, 7, 12, 17, 22];
var walkSEFrames = [3, 8, 13, 18, 23];
var walkSFrames = [4, 9, 14, 19, 24];
var attackNFrames = [25, 30, 35, 40];
var attackNEFrames = [26, 31, 36, 41];
var attackEFrames =	[27, 32, 37, 42];
var attackSEFrames = [28, 33, 38, 43];
var attackSFrames = [29, 34, 39, 44];
var dieNNEFrames = [45, 50, 55];
var dieESEFrames = [48, 53, 58];

var unitSprites = ['archer', 'priest', 'catapult', 'villager', 'royalty', 'swordsman', 'miner'];


//load in the unit sprites
function createUnitSprites(scene){
  scene.load.spritesheet('archer',
       'Graphics/units/archer.png',
       { frameWidth: 72, frameHeight: 72}
   );
   scene.load.spritesheet('catapult',
        'Graphics/units/catapult.png',
        { frameWidth: 72, frameHeight: 72}
    );

  //NEEDS MINER IMAGE
  scene.load.spritesheet('miner',
       'Graphics/units/catapult.png',
       { frameWidth: 72, frameHeight: 72}
   );
  scene.load.spritesheet('priest',
      'Graphics/units/priest.png',
      { frameWidth: 72, frameHeight: 72}
  );

  //NEEDS ROYALTY IMAGE
  scene.load.spritesheet('royalty',
   'Graphics/units/royalty.png',
    { frameWidth: 72, frameHeight: 72}
  );

  scene.load.spritesheet('swordsman',
    'Graphics/units/swordsman.png',
    { frameWidth: 72, frameHeight: 72}
  );
  scene.load.spritesheet('villager',
    'Graphics/units/villager.png',
    { frameWidth: 72, frameHeight: 72}
  );
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
             frameRate: 1
  });
}

function createAnims(scene, type){
  createAnim(type+'WalkN', type, walkNFrames, scene);
  createAnim(type+'WalkNE', type, walkNEFrames, scene);
  createAnim(type+'WalkE', type, walkEFrames, scene);
  createAnim(type+'WalkSE', type, walkSEFrames, scene);
  createAnim(type+'WalkS', type, walkSFrames, scene);
  createAnim(type+'AttackN', type, attackNFrames, scene);
  createAnim(type+'AttackNE', type, attackNEFrames, scene);
  createAnim(type+'AttackE', type, attackEFrames, scene);
  createAnim(type+'AttackSE', type, attackSEFrames, scene);
  createAnim(type+'AttackS', type, attackSFrames, scene);
  createAnim(type+'DieNNE', type, dieNNEFrames, scene);
  createAnim(type+'DieESE', type, dieESEFrames, scene);
}

//goes through the list of unitSprites and creates the different animations
function createUnitAnims(scene){

  for(var i = 0; i < unitSprites.length; i++){
    createAnims(scene, unitSprites[i]);
  }
}
