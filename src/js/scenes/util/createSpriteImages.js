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
   'Graphics/units/priest.png',
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
       'Graphics/buildings/gold_mine.png',
       { frameWidth: 96, frameHeight: 96}
   );
   scene.load.spritesheet('barracks',
        'Graphics/buildings/gold_mine.png',
        { frameWidth: 96, frameHeight: 96}
    );

  scene.load.spritesheet('castle',
       'Graphics/buildings/gold_mine.png',
       { frameWidth: 96, frameHeight: 96}
   );
  scene.load.spritesheet('machinery',
      'Graphics/buildings/gold_mine.png',
      { frameWidth: 96, frameHeight: 96}
  );

  scene.load.spritesheet('mine',
   'Graphics/buildings/gold_mine.png',
    { frameWidth: 96, frameHeight: 96}
  );

  scene.load.spritesheet('temple',
    'Graphics/buildings/gold_mine.png',
    { frameWidth: 96, frameHeight: 96}
  );
  scene.load.spritesheet('townCenter',
    'Graphics/buildings/gold_mine.png',
    { frameWidth: 96, frameHeight: 96}
  );
}

function createArcherAnims(scene){
  scene.anims.create(
    {
             key: 'archerWalkN',
             frames: scene.anims.generateFrameNumbers('archer', {
                 frames: [ 0, 5, 10, 15, 20]
             }),
             repeat: -1,
             frameRate: 1
  });
}
