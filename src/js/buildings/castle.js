/*
  Name: Castle
  Unit produced: royalty
  Special effect: Shoots two arrows to all enemy AI in defense (1 unit radius of the structure), game ends when all the castels of either the user's kingdom or the AI's kingdom are destroyed
  Health: 50
  Cost: 400
  Takes 30 seconds to build.
*/
class Castle extends Building {
  constructor (scene, x, y, texture, frame) {
    let hp = 50,
        type = 'castle',
        damage = 0,
        cost = 400,
        range = 1;
    super(scene, x, y, texture, frame, type, hp, damage, cost, range);
  }

}
