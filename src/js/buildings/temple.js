/*
  Name: Temple
  Unit produced: priest
  Special effect: increases amount of gold earned by 1 every 10 seconds
  Health: 50
  Cost: 225
  Takes 30 seconds to build.
*/
class Temple extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'temple',
        damage = 0,
        cost = 225,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
