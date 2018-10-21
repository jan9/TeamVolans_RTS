/*
  Name: Town Center
  Unit produced: Villagers
  Special effect: increases amount of gold earned by 1 every 10 second, required to increase the kingdom's pop by 10.
  Health: 50
  Cost: 100
  Takes 30 seconds to build.
*/
class TownCenter extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'town center',
        damage = 0,
        cost = 100,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
