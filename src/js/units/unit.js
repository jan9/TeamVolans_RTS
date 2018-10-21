/* Constructor parameters
Name: unit Name
Level:
Health:
Attack:
Range:
*/

class Unit extends Phaser.GameObjects.Sprite {
   constructor (scene, x, y, texture, frame, type, hp, damage) {
     super (scene, x, y, texture, frame, type, hp, damage);
     this.type = type;
     this.maxHp = this.hp = hp;
     this.damage = damage;
   }

   attack(target) {
     target.takeDamage(this.damage);
   }

   takeDamage(damage) {
     this.hp -= damage;
   }
}
