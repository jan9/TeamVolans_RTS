// all buildings take 30 seconds to construct, and all buildings should show a health library
// data = name, producable units, description, health, cost
/*
Reference: http://labs.phaser.io/index.html?dir=components/data/&q=
1. Get and Set data
http://labs.phaser.io/edit.html?src=src\components\data\get%20and%20set%20data%20values.js
*/


class Building extends Phaser.GameObjects.Sprite {
   constructor (scene, x, y, texture, frame, type, hp, damage, cost, range) {
     super (scene, x, y, texture, frame, type, hp, damage, cost, range);
     this.name = type;
     this.maxHp = this.hp = hp;
     this.damage = damage;
     this.cost = cost;
     this.range = range;
   }

   // attack nearby units or buildings
   attack(target) {
     target.takeDamage(this.damage);
   }

   // take damage from nearby units or buildings
   takeDamage(damage) {
     this.hp -= damage;
   }

   // build unitss from a building
   buildUnits(unit) {
     this.call = Unit.constructor(unit);
   }
}
