/*
  Name: Barrack
  Unit produced: swordman
  Special effect: NA
  Health: 50
  Cost: 200
  Takes 30 seconds to build.
*/
class Barracks extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'barrack',
        damage = 0,
        cost = 200,
        range = 0;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
