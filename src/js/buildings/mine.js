/*
  Name: Mine
  Unit produced: miner
  Special effect: any mines built near a mountain reduces time to produce a miner by 30%
  Health: 50
  Cost: 75
  Takes 30 seconds to build.
*/
class Mine extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'mine',
        damage = 0,
        cost = 75,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
