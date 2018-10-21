/*
  Name: Archery Range
  Unit produced: Archer
  Special effect: Shoots an arrow in defense to all enemy AI
    within 1 unit radius of the building
  Health: 50
  Cost: 150
  Takes 30 seconds to build.
*/
class ArcheryRange extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'archery range',
        damage = 3,
        cost = 150,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
