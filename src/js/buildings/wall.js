/*
  Name: Wall
  Unit produced: NA
  Special effect: blocks the enemy units, allows the player's units to pass through
  Health: 50
  Cost: 100
  Takes 30 seconds to build.
*/
class Wall extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'wall',
        damage = 3,
        cost = 100,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
