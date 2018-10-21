class Archer extends Unit {
  constructor (scene, x, y, texture, frame) {
    let hp = 40,
        type = 'archer',
        damage = 3;
    super(scene, x, y, texture, frame, type, hp, damage);
  }
}
