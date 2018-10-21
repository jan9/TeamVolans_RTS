/*
  Name: Machinery
  Unit produced: catapult
  Special effect: damages enemy's castles by 10
  Health: 50
  Cost: 300
  Takes 30 seconds to build.
*/
class Machinery extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'machinery',
        damage = 0,
        cost = 300,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
